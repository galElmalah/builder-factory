"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builderFactory = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const capitalize = (word) => {
    const [firstChar, ...restOfTheWord] = word;
    return firstChar.toUpperCase() + restOfTheWord.join('');
};
/**
 *
 * @param schema An object containing the default object. The builder type will be inferred from the structure of the scheme object.
 */
const builderFactory = (schema) => {
    const aBuilder = () => {
        const targetObject = lodash_clonedeep_1.default(schema);
        const api = {
            build: () => {
                return targetObject;
            },
            getSchema: () => {
                return lodash_clonedeep_1.default(schema);
            },
        };
        for (const key in schema) {
            api[`with${capitalize(key)}`] = (value) => {
                targetObject[key] = value;
                return api;
            };
        }
        return api;
    };
    return { aBuilder };
};
exports.builderFactory = builderFactory;
//# sourceMappingURL=index.js.map