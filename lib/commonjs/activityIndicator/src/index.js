"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _MaterialIndicator = _interopRequireDefault(require("./MaterialIndicator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ActivityIndicator(props) {
  if (_reactNative.Platform.OS === 'web') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, props);
  }
  return /*#__PURE__*/_react.default.createElement(_MaterialIndicator.default, props);
}
var _default = exports.default = ActivityIndicator;
//# sourceMappingURL=index.js.map