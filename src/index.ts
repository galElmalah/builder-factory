import cloneDeep from 'lodash.clonedeep';

const capitalize = (word: string) => {
  const [firstChar, ...restOfTheWord] = word;
  return firstChar.toUpperCase() + restOfTheWord.join('');
};

export interface BuildersFactory<T> {
  aBuilder(): API<T>;
}

type API<T> = {
  [K in keyof T as `with${Capitalize<string & K>}`]: (
    value: T[K]
  ) => API<T> & BaseMethods<T>;
} & BaseMethods<T>;

type BaseMethods<T> = { build: () => T; getSchema: () => T };

/**
 *
 * @param schema An object containing the default object. The builder type will be inferred from the structure of the scheme object.
 */
export const builderFactory = <T>(schema: T): BuildersFactory<T> => {
  const aBuilder = () => {
    const targetObject: T = cloneDeep(schema);

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
  return { aBuilder };
};
