"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeUnistyles = require("react-native-unistyles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SWICH_DEFAULT_WIDTH = 60;
const SWICH_DEFAULT_HEIGHT = 30;
const SWICH_DEFAULT_PADDING = 6;
function SwitchView(props) {
  const {
    styles,
    theme
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const {
    thumbColor,
    disabled,
    value,
    onValueChange
  } = props;
  const translateX = (0, _reactNativeReanimated.useSharedValue)(value ? 0 : 30);
  const switchStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateX: translateX.value
      }],
      backgroundColor: thumbColor || theme.colors.swichThumb
    };
  });
  const switchBaseStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      backgroundColor: (0, _reactNativeReanimated.interpolateColor)(translateX.value, [0, 30], ['#DDDDDD', theme.colors.swichBg])
    };
  });
  const changeSwichState = () => {
    if (translateX.value === 0) {
      translateX.value = (0, _reactNativeReanimated.withTiming)(30, {
        duration: 200
      });
    } else {
      translateX.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 200
      });
    }
    onValueChange && onValueChange(!value);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TouchableOpacity, {
    onPress: () => changeSwichState(),
    activeOpacity: 1,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container, switchBaseStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.swichView, switchStyle]
  })));
}
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    minWidth: SWICH_DEFAULT_WIDTH,
    minHeight: SWICH_DEFAULT_HEIGHT,
    borderRadius: SWICH_DEFAULT_HEIGHT,
    backgroundColor: theme.colors.swichBg
  },
  swichView: {
    minWidth: SWICH_DEFAULT_HEIGHT - SWICH_DEFAULT_PADDING,
    minHeight: SWICH_DEFAULT_HEIGHT - SWICH_DEFAULT_PADDING,
    borderRadius: SWICH_DEFAULT_HEIGHT,
    position: 'absolute',
    left: SWICH_DEFAULT_PADDING / 2,
    top: SWICH_DEFAULT_PADDING / 2
  }
}));
var _default = exports.default = SwitchView;
//# sourceMappingURL=index.js.map