"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenWidth = exports.ScreenHeight = exports.PixelWidth = void 0;
var _reactNative = require("react-native");
const {
  width,
  height
} = _reactNative.Dimensions.get('window');

//最小间距
const PixelWidth = exports.PixelWidth = _reactNative.StyleSheet.hairlineWidth;
//屏幕宽
const ScreenWidth = exports.ScreenWidth = width;
//屏幕高
const ScreenHeight = exports.ScreenHeight = height;
//# sourceMappingURL=dimensions.js.map