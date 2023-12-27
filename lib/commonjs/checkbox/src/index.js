"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeUnistyles = require("react-native-unistyles");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _AntDesign = _interopRequireDefault(require("@expo/vector-icons/AntDesign"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AnimatedIcon = _reactNativeReanimated.default.createAnimatedComponent(_AntDesign.default);
function CheckboxView(props) {
  const {
    size,
    style,
    checked,
    checkColor,
    onValueChange
  } = props;
  const scaledValue = (0, _reactNativeReanimated.useSharedValue)(checked ? 1 : 0);
  const styles = (0, _reactNativeUnistyles.createStyleSheet)({
    bgStyle: {
      width: size || 30,
      height: size || 30,
      borderRadius: (style === null || style === void 0 ? void 0 : style.borderRadius) || 5,
      borderColor: (style === null || style === void 0 ? void 0 : style.borderColor) || 'black',
      borderWidth: (style === null || style === void 0 ? void 0 : style.borderWidth) || 1,
      backgroundColor: (style === null || style === void 0 ? void 0 : style.backgroundColor) || '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  const onChange = () => {
    if (checked) {
      scaledValue.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 200
      });
    } else {
      scaledValue.value = (0, _reactNativeReanimated.withTiming)(1, {
        duration: 200
      });
    }
    onValueChange && onValueChange(!checked);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TouchableOpacity, {
    style: [styles.bgStyle],
    onPress: () => onChange(),
    activeOpacity: 1
  }, checked && /*#__PURE__*/_react.default.createElement(AnimatedIcon, {
    name: "check",
    size: size ? size / 1.5 : 20,
    color: checkColor || 'black'
  }));
}
var _default = exports.default = CheckboxView;
//# sourceMappingURL=index.js.map