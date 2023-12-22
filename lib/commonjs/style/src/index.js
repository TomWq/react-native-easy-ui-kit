"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "darkTheme", {
  enumerable: true,
  get: function () {
    return _theme.darkTheme;
  }
});
Object.defineProperty(exports, "lightTheme", {
  enumerable: true,
  get: function () {
    return _theme.lightTheme;
  }
});
var _reactNativeUnistyles = require("react-native-unistyles");
var _breakpoints = require("./breakpoints");
var _theme = require("./theme");
_reactNativeUnistyles.UnistylesRegistry.addBreakpoints(_breakpoints.breakpoints).addThemes({
  light: _theme.lightTheme,
  dark: _theme.darkTheme
}).addConfig({
  adaptiveThemes: true
});
//# sourceMappingURL=index.js.map