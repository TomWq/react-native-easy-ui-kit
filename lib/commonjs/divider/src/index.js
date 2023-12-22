"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pixelWidth = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _view = _interopRequireDefault(require("../../view"));
var _reactNative = require("react-native");
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const pixelWidth = exports.pixelWidth = _reactNative.StyleSheet.hairlineWidth;
function Divider(props) {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  return /*#__PURE__*/_react.default.createElement(_view.default, {
    style: [styles.container, props.style]
  });
}
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    height: pixelWidth,
    backgroundColor: theme.colors.border,
    width: '95%'
  }
}));
var _default = exports.default = Divider;
//# sourceMappingURL=index.js.map