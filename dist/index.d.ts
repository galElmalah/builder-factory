interface BuildersFactory<T> {
    aBuilder(): API<T>;
}
declare type API<T> = {
    [K in keyof T as `with${Capitalize<string & K>}`]: (value: T[K]) => API<T> & BaseMethods<T>;
} & BaseMethods<T>;
declare type BaseMethods<T> = {
    build: () => T;
    getSchema: () => T;
};
/**
 *
 * @param schema An object containing the default object. The builder type will be inferred from the structure of the scheme object.
 */
export declare const builderFactory: <T>(schema: T) => BuildersFactory<T>;
export {};
