"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pixelWidth = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeUnistyles = require("react-native-unistyles");
var _reactNative = require("react-native");
var _view = _interopRequireDefault(require("../../view"));
var _text = _interopRequireDefault(require("../../text"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeRootSiblings = _interopRequireDefault(require("react-native-root-siblings"));
var _reactNativeScreens = require("react-native-screens");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
//最小间距
const pixelWidth = exports.pixelWidth = _reactNative.StyleSheet.hairlineWidth;
function DialogView({
  title = '标题',
  message = '',
  position = 'center',
  swipeClose = false,
  buttons = [{
    text: '取消',
    style: 'cancel',
    onPress: () => {}
  }, {
    text: '确定',
    style: 'destructive',
    onPress: () => {}
  }],
  hideDialog = () => {}
}) {
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0.5);
  const scale = (0, _reactNativeReanimated.useSharedValue)(position === 'center' ? 0.5 : 1);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(position === 'bottom' ? 300 : 0);
  const translateX = (0, _reactNativeReanimated.useSharedValue)(position === 'left' ? -300 : position === 'right' ? 300 : 0);
  (0, _react.useEffect)(() => {
    startAnimation();
  }, []);
  const dialogAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        scale: scale.value
      }, {
        translateY: translateY.value
      }, {
        translateX: translateX.value
      }],
      opacity: opacity.value
    };
  });
  const bgColor = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      backgroundColor: (0, _reactNativeReanimated.interpolateColor)(opacity.value, [0.5, 1], ['transparent', 'rgba(0,0,0,0.1)'], 'RGB')
    };
  });

  /**
   * Starts the animation by setting the opacity and scale values using the withTiming function.
   * @return {none} This function does not return any value.
   */
  const startAnimation = () => {
    opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 300
    });
    scale.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 300
    });
    if (position === 'bottom') {
      translateY.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      });
    } else if (position === 'left') {
      translateX.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      });
    } else if (position === 'right') {
      translateX.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration: 300
      });
    } else {
      opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
        duration: 300
      });
      scale.value = (0, _reactNativeReanimated.withTiming)(1, {
        duration: 300
      });
    }
  };

  /**
   * Stops the animation by setting the opacity and scale values using the withTiming function.
   * If the scale animation finishes, it runs the hideDialog function using the runOnJS function.
   *
   * @return {void} No return value.
   */
  const stopAnimation = () => {
    opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 300
    });
    scale.value = (0, _reactNativeReanimated.withTiming)(0.8, {
      duration: 300
    }, finished => {
      if (finished) {
        (0, _reactNativeReanimated.runOnJS)(hideDialog)();
      }
    });
    if (position === 'bottom') {
      translateY.value = (0, _reactNativeReanimated.withTiming)(300, {
        duration: 300
      });
    } else if (position === 'left') {
      translateX.value = (0, _reactNativeReanimated.withTiming)(-300, {
        duration: 300
      });
    } else if (position === 'right') {
      translateX.value = (0, _reactNativeReanimated.withTiming)(300, {
        duration: 300
      });
    }
  };
  const gesture = _reactNativeGestureHandler.Gesture.Pan().onBegin(() => {
    console.log('开始');
  }).onUpdate(e => {
    //弹框随着滑动移动消失
    if (position === 'bottom') {
      translateY.value = e.translationY;
    } else if (position === 'left') {
      translateX.value = e.translationX;
    } else if (position === 'right') {
      translateX.value = e.translationX;
    }
  }).onEnd(e => {
    console.log('结束');
    if (position === 'bottom') {
      if (e.translationY > 200) {
        // stopAnimation()
        (0, _reactNativeReanimated.runOnJS)(stopAnimation)();
      } else {
        translateY.value = (0, _reactNativeReanimated.withTiming)(0, {
          duration: 300
        });
      }
    } else if (position === 'left') {
      if (e.translationX < -200) {
        // stopAnimation()
        (0, _reactNativeReanimated.runOnJS)(stopAnimation)();
      } else {
        translateX.value = (0, _reactNativeReanimated.withTiming)(0, {
          duration: 300
        });
      }
    } else if (position === 'right') {
      if (e.translationX > 200) {
        // stopAnimation()
        (0, _reactNativeReanimated.runOnJS)(stopAnimation)();
      } else {
        translateX.value = (0, _reactNativeReanimated.withTiming)(0, {
          duration: 300
        });
      }
    }
  });
  const defaultGesture = _reactNativeGestureHandler.Gesture.Tap();

  /**
   * Renders the children of the component.
   *
   * @return {JSX.Element} The rendered children.
   */
  const children = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
      gesture: swipeClose ? gesture : defaultGesture
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [styles.container, bgColor]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [styles.dialogView, dialogAnimatedStyle]
    }, /*#__PURE__*/_react.default.createElement(_text.default, {
      style: styles.title,
      numberOfLines: 2
    }, title), message && /*#__PURE__*/_react.default.createElement(_text.default, {
      style: styles.message,
      numberOfLines: 2
    }, message), /*#__PURE__*/_react.default.createElement(_view.default, {
      style: styles.buttons
    }, buttons && buttons.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
        key: index + '',
        style: styles.buttonItem(index),
        onPress: () => {
          if (item.onPress) {
            if (index === 0) {
              stopAnimation();
            } else {
              stopAnimation();
              item.onPress();
            }
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_text.default, {
        style: styles.itemTitle(index)
      }, item.text));
    })))));
  };
  if (_reactNative.Platform.OS === 'ios') {
    return /*#__PURE__*/_react.default.createElement(_reactNativeScreens.FullWindowOverlay, null, children());
  }
  return children();
}
const Dialog = {
  sibling: null,
  /**
   * Show the dialog view with the given props.
   *
   * @param {DialogViewProps} props - The props to pass to the dialog view.
   */
  show(props) {
    this.sibling = new _reactNativeRootSiblings.default( /*#__PURE__*/_react.default.createElement(DialogView, _extends({}, props, {
      hideDialog: () => {
        this.hide();
      }
    })));
  },
  /**
   * Hides the sibling element by destroying it and setting the sibling reference to null.
   *
   */
  hide() {
    this.sibling?.destroy();
    this.sibling = null;
  }
};
var _default = exports.default = Dialog;
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  dialogView: {
    backgroundColor: theme.colors.card,
    borderWidth: pixelWidth,
    borderColor: theme.colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    overflow: 'visible',
    height: 50,
    borderTopWidth: pixelWidth,
    borderTopColor: theme.colors.border,
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: 200,
    height: 40,
    lineHeight: 50
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    maxWidth: 200,
    height: 40,
    marginBottom: 10
  },
  buttonItem: index => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: index % 2 === 0 ? pixelWidth : 0,
    borderRightColor: theme.colors.border,
    height: 45
  }),
  input: {
    width: '90%',
    marginBottom: 20
  },
  itemTitle: index => ({
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: index % 2 !== 0 ? 'bold' : 'normal'
  })
}));
//# sourceMappingURL=index.js.map