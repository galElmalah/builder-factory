import cloneDeep from 'lodash.clonedeep';

const capitalize = (word: string) => {
  const [firstChar, ...restOfTheWord] = word;
  return firstChar.toUpperCase() + restOfTheWord.join('');
};

type BaseMethods<T> = { build: () => T; getSchema: () => T };

type API<T> = {
  [K in keyof T as `with${Capitalize<string & K>}`]: (value: T[K]) => API<T> & BaseMethods<T>;
} & BaseMethods<T>;

/**
 *
 * @param schema An object containing the default object. The builder type will be inferred from the structure of the scheme object.
 */
export const createBuilder = <T>(schema: T) => {
  const targetObject: T = { ...schema };

  const api: unknown = {
    build: () => {
      return targetObject;
    },
    getSchema: () => {
      return cloneDeep(schema);
    },
  };

  for (const key in schema) {
    api[`with${capitalize(key)}`] = (value: any) => {
      targetObject[key] = value;
      return api;
    };
  }

  return api as API<T>;
};
