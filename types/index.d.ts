export interface Lengthable {
    length: number
}

export interface Nameable {
    readonly name: string
}

export interface ListLike extends Lengthable {
    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}

export namespace native {
    export function defineProperties<T>(properties: PropertyDescriptorMap, target: T): T

    export function defineProperty<T>(propertyDescriptor: PropertyDescriptor, propertyName: string, target: T): T

    export function assign(obj0: any, ...objs: Array<any>): any;

    // @todo add the rest of the methods here
}

export type Predicate = (a: any) => boolean;

export type Predicate2 = (a: any, b: any) => boolean;

export type Predicate3 = (a: any, b: any, c: any) => boolean;

export type Predicate4 = (a: any, b: any, c: any, d: any) => boolean;

export type TypeRef =
    string | Function | ArrayBufferConstructor | ArrayConstructor |
    BooleanConstructor | StringConstructor |
    NumberConstructor | MapConstructor |
    SetConstructor | WeakMapConstructor |
    WeakSetConstructor | PromiseConstructorLike
    ;

export type TypeConstructor =
    Function | ArrayBufferConstructor | ArrayConstructor |
    BooleanConstructor | StringConstructor |
    NumberConstructor | MapConstructor |
    SetConstructor | WeakMapConstructor |
    WeakSetConstructor | PromiseConstructorLike |
    ObjectConstructor
    ;

export interface ErrorTemplateCtx {
    value: any,
    valueName: string,
    expectedTypeName: string,
    foundTypeName: string,
    messageSuffix?: string
}

export type TypeChecker = (typeRef: TypeRef, x: any) => boolean;

export type ErrorIfNotTypeThrower = (
    type: TypeRef, contextName: string,
    valueName: string, value: any, messageSuffix: any) => any;

export type ErrorIfNotTypesThrower = (
    types: TypeRef[], contextName: string,
    valueName: string, value: any) => any;

export type ErrorTemplateCtxToStringFn = (
    tmplCtx: ErrorTemplateCtx) => string;

export type ListPredicate = (x: any, index: number, list: (any[] | string)) => boolean;

export type ListMapOperation = (x: any, index: number, list: (any[] | string)) => any;

export type ListFoldOperation = (agg: any, item: any, index: number, list: (any[] | string)) => any;

export type ListForEachOperation = (agg: any, item: any, index: number, list: (any[] | string)) => void;

export type OrderingFunction = (a: any, b: any) => number;
