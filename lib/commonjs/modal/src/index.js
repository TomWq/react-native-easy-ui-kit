"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bottomSheet = require("@gorhom/bottom-sheet");
var _expoBlur = require("expo-blur");
var _view = _interopRequireDefault(require("../../view"));
var _reactNative = require("react-native");
var _reactNativeUnistyles = require("react-native-unistyles");
var _platform = require("../../utils/platform");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ModalView = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    children,
    snapPoints,
    opacity,
    enableBlurBackdrop,
    backgroundComponent,
    ...otherProps
  } = props;
  const bottomSheetModalRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    presentModal: () => handlePresentModalPress(),
    dismissModal: () => handleClosePress()
  }));

  // variables
  const snapPoint = (0, _react.useMemo)(() => snapPoints, [snapPoints]);

  // callbacks
  const handleSheetChanges = (0, _react.useCallback)(index => {
    if (index === 0) {
      handleClosePress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePresentModalPress = (0, _react.useCallback)(() => {
    var _bottomSheetModalRef$;
    (_bottomSheetModalRef$ = bottomSheetModalRef.current) === null || _bottomSheetModalRef$ === void 0 || _bottomSheetModalRef$.present();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClosePress = (0, _react.useCallback)(() => {
    var _bottomSheetModalRef$2;
    (_bottomSheetModalRef$2 = bottomSheetModalRef.current) === null || _bottomSheetModalRef$2 === void 0 || _bottomSheetModalRef$2.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_react.default.createElement(_bottomSheet.BottomSheetModal, _extends({
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: snapPoint,
    onChange: handleSheetChanges,
    handleComponent: () => null,
    backgroundComponent: enableBlurBackdrop ? BlurredBackground : backgroundComponent,
    backdropComponent: props => /*#__PURE__*/_react.default.createElement(_bottomSheet.BottomSheetBackdrop, _extends({}, props, {
      opacity: opacity ?? 0.1
    }))
  }, otherProps), children);
});
function BlurredBackground() {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  return /*#__PURE__*/_react.default.createElement(_view.default, {
    style: styles.container
  }, _platform.isIos ? /*#__PURE__*/_react.default.createElement(_expoBlur.BlurView, {
    tint: "light",
    style: styles.blurView,
    intensity: 50
  }) : /*#__PURE__*/_react.default.createElement(_view.default, {
    style: [styles.blurView, {
      backgroundColor: '#fff'
    }]
  }));
}
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  blurView: {
    ..._reactNative.StyleSheet.absoluteFillObject
  }
});
var _default = exports.default = ModalView;
//# sourceMappingURL=index.js.map