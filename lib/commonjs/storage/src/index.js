"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MiddlewareStorage = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import {MMKV} from 'react-native-mmkv';

// const Storage = new MMKV();

/**
 * @description: zustand的state存储中间件
 */
const MiddlewareStorage = exports.MiddlewareStorage = {
  setItem: async (name, value) => {
    return await _asyncStorage.default.setItem(name, value);
  },
  getItem: async name => {
    const value = await _asyncStorage.default.getItem(name);
    return value ?? null;
  },
  removeItem: async name => {
    return await _asyncStorage.default.removeItem(name);
  }
};
var _default = exports.default = _asyncStorage.default; //   export default Storage;
//# sourceMappingURL=index.js.map