/**
 * Created by elydelacruz on 4/28/16.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    stream = require('stream'),
    Readable = stream.Readable;

function repeatStr(str, times) {
    var out = '';
    while (out.length < times) {
        out += str;
    }
    return out;
}

function getEvenNumber(num) {
    while (num % 2) {
        num += 1;
    }
    return num;
}

function renderNode(moduleName, memberName, padLeft, docsPath) {
    var name = renderLabelNodeName(moduleName, memberName),
        type = '(m) ',
        label = renderLabel(type + name),
        typeForHref = type.replace(/[\(\)]+/g, ''),
        href = renderHref(typeForHref.replace(/\s/g, '-') + name),

    // ~~ REMOVE FROM HERE ~~
    // Added this here temporarily but this should be pushed to it's own stream
    // and should be contained in an appropriate function and/or class.
        fileName = (type + name).replace(/\s/g, '-'),
        docFilePath = path.join(docsPath, fileName + '.md');
    // If doc file doesn't exist, generate an empty file for it
    if (!fs.existsSync(docFilePath)) {
        fs.writeFileSync(docFilePath,
            '### ' + label.replace(/[\[\]]/g, '') + '\n' +
            '@todo - Added documentation here.\n' +
            '[Back to ' + moduleName + ' direct members and methods list.]' +
            '(#members-and-methods)\n');
    }
    // ~~ /REMOVE FROM HERE ~~

    return renderMdLi(label + href, padLeft);
}

function renderLabelNodeName(moduleName, funcName) {
    return moduleName + '.' + funcName;
}

function renderLabel(innerText) {
    return '[' + innerText + ']';
}

function renderHref(innerText) {
    return '(#' + innerText.toLowerCase().replace(/\./gim, '') + ')';
}

function renderMdLi(innerText, padLeft) {
    padLeft = repeatStr(' ', getEvenNumber(padLeft)) + '';
    return padLeft + '- ' + innerText + '\n';
}

function ModuleMemberListReadStream (moduleToUse, moduleToUseName, docsPath, options) {
    this._moduleToUse = moduleToUse;
    this._moduleToUseName = moduleToUseName;
    this._docsPath = docsPath;
    Readable.call(this, Object.assign({
        encoding: 'utf8',
        objectMode: false,
        highWaterMark: 100000
    }, options));
}

util.inherits(ModuleMemberListReadStream, Readable);

ModuleMemberListReadStream.prototype._read = function () {
    if (!this._startedReading) {
        this._startedReading = true;
        Object.keys(this._moduleToUse).forEach(function (key) {
            this.push(renderNode(this._moduleToUseName, key, 0, this._docsPath));
        }, this);
    }
    else {
        this.push('\n');
        this.push(null);
    }
};

module.exports = ModuleMemberListReadStream;
