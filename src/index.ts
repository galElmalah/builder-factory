import cloneDeep from 'lodash.clonedeep';

const capitalize = (word: string) => {
  const [firstChar, ...restOfTheWord] = word;
  return firstChar.toUpperCase() + restOfTheWord.join('');
};

export interface BuildersFactory<T, U> {
  aBuilder(): API<T, U>;
  getSchema: () => T;
}

export type API<T, U> = {
  [K in keyof T as `with${Capitalize<string & K>}`]: (
    value: T[K]
  ) => API<T, U> & BaseMethods<T> & WrappedSetters<T, U>;
} &
  BaseMethods<T> &
  WrappedSetters<T, U>;

export type WrappedSetters<T, U> = {
  [K in keyof U]: (
    ...values:any
  ) => API<T, U> & BaseMethods<T> & WrappedSetters<T, U>;
};

// export interface U {
//   [key: string]: (state: T, value: any) => void
// }
export type BaseMethods<T> = { build: () => T; getSchema: () => T };

/**
 *
 * @param schema An object containing the default object. The builder type will be inferred from the structure of the scheme object.
 */
export const builderFactory = <T,U>(
  schema: T,
  customSetters?: U
): BuildersFactory<T,  U> => {
  const getSchema = () => {
    return cloneDeep(schema);
  };

  const aBuilder = () => {
    const targetObject: T = cloneDeep(schema);

    const api: unknown = {
      build: () => {
        return targetObject;
      },
      getSchema,
    };

    const setterWrapper = (setter) => (value: any) => {
      setter(targetObject, value);
      return api as API<T,  U>;
    };

    if (customSetters) {
      for (const key in customSetters) {
        api[key] = setterWrapper(customSetters[key]);
      }
    }

    for (const key in schema) {
      api[`with${capitalize(key)}`] = (value: any) => {
        targetObject[key] = value;
        return api;
      };
    }

    return api as API<T,  U>;
  };
  return { aBuilder, getSchema };
};
