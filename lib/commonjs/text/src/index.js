"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Text(props) {
  const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
    container: {
      color: theme.colors.text
    }
  }));
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const {
    style,
    ...otherProps
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({
    style: [styles.container, style]
  }, otherProps));
}
var _default = exports.default = Text;
//# sourceMappingURL=index.js.map