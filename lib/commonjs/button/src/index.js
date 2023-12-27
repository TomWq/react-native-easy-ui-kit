"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeUnistyles = require("react-native-unistyles");
var _debounce = require("../../utils/debounce");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _FontAwesome = _interopRequireDefault(require("@expo/vector-icons/FontAwesome"));
var _text = _interopRequireDefault(require("../../text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedRectButton = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeGestureHandler.RectButton);
function Button({
  onPress,
  label,
  style,
  labelStyle,
  textProps,
  debounceDelay = 1000,
  borderRadius = 5,
  isShadow = true,
  icon,
  ...otherProps
}) {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);

  // 防抖
  const onPressDebounce = _react.default.useCallback(() => {
    onPress && onPress();
  }, [onPress]);
  const shadowStyle = {
    //阴影
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  };
  return /*#__PURE__*/_react.default.createElement(AnimatedRectButton, _extends({}, otherProps, {
    onPress: (0, _debounce.debounce)(onPressDebounce, debounceDelay, true),
    style: [styles.buttonView, {
      borderRadius
    }, style, isShadow && shadowStyle]
  }), icon && /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
    size: 24,
    color: '#fff',
    name: icon,
    style: styles.buttonIcon(label)
  }), /*#__PURE__*/_react.default.createElement(_text.default, _extends({
    style: [styles.buttonTitle, labelStyle]
  }, textProps), label));
}
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  buttonView: {
    backgroundColor: theme.colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50,
    minWidth: 100
  },
  buttonTitle: {
    color: theme.colors.buttonLable,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: {
      'xs': 16
    }
  },
  buttonIcon: label => ({
    marginRight: label ? 5 : 0
  })
}));
//# sourceMappingURL=index.js.map