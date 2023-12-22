"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _text = _interopRequireDefault(require("../../text"));
var _FontAwesome = _interopRequireDefault(require("@expo/vector-icons/FontAwesome"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeRootSiblings = _interopRequireDefault(require("react-native-root-siblings"));
var _reactNativeScreens = require("react-native-screens");
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ToastView({
  text = '',
  type,
  duration = 3000,
  position = 'center',
  hideToast = () => {}
}) {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(40);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0.5);
  const scale = (0, _reactNativeReanimated.useSharedValue)(0.5);
  let timer = _react.default.useRef(null);
  const ToastIcon = () => {
    if (type === 'success') {
      return /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
        name: "check-circle",
        size: 20,
        color: "green"
      });
    } else if (type === 'info') {
      return /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
        name: "info-circle",
        size: 20,
        color: "white"
      });
    } else if (type === 'warning') {
      return /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
        name: "exclamation-circle",
        size: 20,
        color: "orange"
      });
    } else if (type === 'error') {
      return /*#__PURE__*/_react.default.createElement(_FontAwesome.default, {
        name: "times-circle",
        size: 20,
        color: "red"
      });
    } else if (type === 'loading') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "small",
        color: "white"
      });
    } else {
      return null;
    }
  };
  (0, _react.useEffect)(() => {
    startAnimation();
    if (duration) {
      timer.current = setTimeout(() => {
        stopAnimation();
      }, duration);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  /**
   * Starts the animation.
   * @return {type} description of return value
   */
  const startAnimation = () => {
    opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 300
    });
    scale.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 300
    });
  };

  /**
  * Stops the animation by setting the opacity and scale values.
  *
  * @return {void}
  */
  const stopAnimation = () => {
    opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 300
    });
    scale.value = (0, _reactNativeReanimated.withTiming)(0.5, {
      duration: 300
    }, finished => {
      if (finished) {
        (0, _reactNativeReanimated.runOnJS)(hideToast)();
      }
    });
  };
  const bgStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: translateY.value
      }, {
        scale: scale.value
      }],
      opacity: opacity.value
    };
  });

  //根据position设置ToastView的位置
  const toastViewStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    if (position === 'top') {
      return {
        justifyContent: 'flex-start',
        paddingTop: 100
      };
    } else if (position === 'bottom') {
      return {
        justifyContent: 'flex-end',
        paddingBottom: 150
      };
    } else {
      return {
        justifyContent: 'center'
      };
    }
  });

  /**
   * Generates the JSX code for rendering the children component.
   *
   * @return {JSX.Element} The JSX code for rendering the children component.
   */
  const children = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [styles.container, toastViewStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [styles.toastView, bgStyle]
    }, /*#__PURE__*/_react.default.createElement(ToastIcon, null), /*#__PURE__*/_react.default.createElement(_text.default, {
      style: styles.toastText
    }, text)));
  };

  //ios需要全屏覆盖,包裹在FullWindowOverlay里面
  if (_reactNative.Platform.OS === 'ios') {
    return /*#__PURE__*/_react.default.createElement(_reactNativeScreens.FullWindowOverlay, null, children());
  }
  return children();
}

/**
* The props for the ToastView component.
*
*/
const Toast = {
  sibling: null,
  /**
   * Show a toast with the given props.
   *
   * @param {ToastViewProps} props - The props for the toast.
   * @return {void}
   */
  show(props) {
    this.sibling = new _reactNativeRootSiblings.default( /*#__PURE__*/_react.default.createElement(ToastView, _extends({}, props, {
      hideToast: () => {
        this.hide();
      }
    })));
  },
  /**
   * Hides the sibling component and sets it to null.
   *
   * No parameters.
   *
   * No return value.
   */
  hide() {
    this.sibling?.destroy();
    this.sibling = null;
  }
};
var _default = exports.default = Toast;
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.transparent,
    ..._reactNative.Platform.select({
      android: {
        zIndex: 99
      },
      web: {
        zIndex: 99
      },
      ios: {
        zIndex: 0
      }
    })
  },
  toastView: {
    backgroundColor: theme.colors.toastBg,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '90%'
  },
  toastText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    lineHeight: 20
  }
}));
//# sourceMappingURL=index.js.map