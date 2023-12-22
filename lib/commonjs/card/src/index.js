"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 5
  }
}));
function Button(props) {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const {
    style,
    ...otherProps
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.RectButton, _extends({
    style: [styles.container, style]
  }, otherProps)));
}
var _default = exports.default = Button;
//# sourceMappingURL=index.js.map