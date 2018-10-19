/**
 * Created by elydelacruz on 4/28/16.
 * Refactored 09/28/2018
 */

const
    fs = require('fs'),
    {Readable} = require('stream'),
    _List = require('../dist/cjs/list'),
    _ListUtils = require('../dist/cjs/list/utils'),
    _Object = require('../dist/cjs/object'),
    _Function = require('../dist/cjs/function'),
    _Boolean = require('../dist/cjs/boolean'),
    _ErrorThrowing = require('../dist/cjs/errorThrowing'),
    _String = require('../dist/cjs/string'),
    _Utils = require('../dist/cjs/utils'),
    {log} = _Object,

    newModuleMeta = _module => ({module: _module, methodNames: [], methodNamesByArity: {}}),

    newTopLevelMeta = () => ({
        moduleMetas: {
            'list': newModuleMeta(_List),
            'listUtils': newModuleMeta(_ListUtils),
            'object': newModuleMeta(_Object),
            'function': newModuleMeta(_Function),
            'boolean': newModuleMeta(_Boolean),
            'errorThrowing': newModuleMeta(_ErrorThrowing),
            'string': newModuleMeta(_String),
            'utils': newModuleMeta(_Utils)
        },
        methodNamesByArity: {}
    }),

    updateWithMethodNames = (moduleMeta, topLevelNamesByArity) => {
        const {module: m} = moduleMeta;
        Object.keys(m).forEach(methodName => {
            // Avoid private methods
            if (methodName[0] === '_') {
                return;
            }
            updateMethodByArity(moduleMeta, methodName, topLevelNamesByArity);
            moduleMeta.methodNames.push(methodName);
        });
    },

    updateMethodByArity = (moduleMeta, methodName, topLevelNamesByArity) => {
        const arity = moduleMeta.module[methodName].length,
            {methodNamesByArity} = moduleMeta;
        if (!methodNamesByArity[arity]) {
            methodNamesByArity[arity] = [];
        }
        topLevelNamesByArity[arity].push(methodName);
        methodNamesByArity[arity].push(methodName);
    },

    populateMeta = meta => {
        const {moduleMetas, methodNamesByArity} = meta;
        // Set empty array for 'method names by arity'
        [0,1,2,3,4,5].forEach(x => { methodNamesByArity[x] = []; });

        // Loop through module metas and populate 'methodNames' and
        //  'methodsByArity' properties
        Object.keys(moduleMetas).forEach(key => {
            updateWithMethodNames(moduleMetas[key], methodNamesByArity);
        });
        return meta;
    },

    methodNamesMdTmpl = (moduleName, moduleMeta) => {
        const {methodNames} = moduleMeta,
            _methodNames = methodNames.slice(0),
            colLen = 72,
            firstMethod = _methodNames.shift(),
            methodNamesMd = _methodNames.reduce((agg, name) => {
                    const lineMetaEntry = agg[agg.length - 1],
                        [lineLen, line] = lineMetaEntry,
                        newLineLen = lineLen + (', ' + name).length,
                        greaterThanColLen = newLineLen >= colLen
                    ;
                    if (greaterThanColLen) {
                        const newLine = [];
                        newLine.push(name);
                        agg.push([name.length, newLine]);
                    } else {
                        line.push(name);
                        lineMetaEntry[0] = newLineLen;
                    }

                    return agg;
                },
                [[firstMethod.length, [firstMethod]]]
            )
                .map(([_, line]) => line.join(', '))
                .join(',\n')
        ;
        return `### ${moduleName}\n \`\`\`\n${methodNamesMd}\n\`\`\`\n`;
    },

    writeModuleAndMemberLists = outputFilePath => new Promise((resolve, reject) => {
        const topMeta = populateMeta(newTopLevelMeta()),
            markdown = Object
                .keys(topMeta.moduleMetas)
                .reduce((agg, key) =>
                    agg + methodNamesMdTmpl(key, topMeta.moduleMetas[key])
                , '')
        ;
        fs.writeFile(outputFilePath, markdown, null, err => {
            if (err) {
                reject(err);
            }
            log(`\nModule member list markdown written to "${outputFilePath}".\n`);
            resolve(markdown);
        });
    })
;

class ModuleMemberListsReadStream extends Readable {
    constructor(options) {
        super(Object.assign({
            encoding: 'utf8',
            objectMode: false,
            highWaterMark: 100000
        }, options));
        this.topMeta = populateMeta(newTopLevelMeta());
        this.moduleMetaNames = Object.keys(this.topMeta.moduleMetas);
        this.currIndex = 0;
    }
    _next () {
        return this.moduleMetaNames[this.currIndex++];
    }
    _read () {
        const next = this._next();
        this.push(
            next ?
            methodNamesMdTmpl(next, this.topMeta.moduleMetas[next]) :
            null
        );
    }
}

// util.inherits(ModuleMemberListsReadStream, Readable);

module.exports = () => new ModuleMemberListsReadStream();
