"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _storage = _interopRequireDefault(require("../../storage"));
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function toggleTheme() {
  if (_reactNativeUnistyles.UnistylesRuntime.themeName === 'dark') {
    _reactNativeUnistyles.UnistylesRuntime.setTheme('light');
    _storage.default.setItem('theme', 'light');
  } else {
    _reactNativeUnistyles.UnistylesRuntime.setTheme('dark');
    _storage.default.setItem('theme', 'dark');
  }
}
var _default = exports.default = toggleTheme;
//# sourceMappingURL=index.js.map