"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Indicator = ({
  animationEasing = _reactNative.Easing.linear,
  animationDuration = 1200,
  hideAnimationDuration = 200,
  animating = true,
  interaction = true,
  hidesWhenStopped = true,
  count = 1,
  renderComponent,
  style,
  props
}) => {
  const [progress] = (0, _react.useState)(new _reactNative.Animated.Value(0));
  const [hideAnimation] = (0, _react.useState)(new _reactNative.Animated.Value(animating ? 1 : 0));
  const [animationState, setAnimationState] = (0, _react.useState)(0);
  const [savedValue, setSavedValue] = (0, _react.useState)(0);
  const animationRef = (0, _react.useRef)(null);
  const startAnimation = () => {
    if (animationState !== 0) {
      return;
    }
    const animation = _reactNative.Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });
    animationRef.current = _reactNative.Animated.loop(animation);
    animationRef.current.start();
    setAnimationState(1);
  };
  const stopAnimation = () => {
    if (animationState !== 1) {
      return;
    }
    const listener = progress.addListener(({
      value
    }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => saveAnimation(value));
    });
    setAnimationState(-1);
  };
  const saveAnimation = value => {
    const {
      animating
    } = props;
    setSavedValue(value);
    setAnimationState(0);
    if (animating) {
      resumeAnimation();
    }
  };
  const resumeAnimation = () => {
    if (animationState !== 0) {
      return;
    }
    _reactNative.Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - savedValue) * animationDuration,
      toValue: 1
    }).start(({
      finished
    }) => {
      if (finished) {
        progress.setValue(0);
        setAnimationState(0);
        startAnimation();
      }
    });
    setSavedValue(0);
    setAnimationState(1);
  };
  (0, _react.useEffect)(() => {
    if (animating) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    if (animating && animationState === -1) {
      resumeAnimation();
    }
    if (!animating && animationState === 1) {
      stopAnimation();
    }
    if (animating !== (props === null || props === void 0 ? void 0 : props.animating)) {
      _reactNative.Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration: hideAnimationDuration,
        useNativeDriver: true
      }).start();
    }
  }, [animating]);
  const renderComponentWrapper = index => {
    if (typeof renderComponent === 'function') {
      if (count) {
        return renderComponent({
          index,
          count,
          progress
        });
      }
    }
    return null;
  };
  if (hidesWhenStopped) {
    style = []
    //@ts-ignore
    .concat(style || [], {
      opacity: hideAnimation
    });
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: style
  }, Array.from(new Array(count), renderComponentWrapper));
};
var _default = exports.default = Indicator;
//# sourceMappingURL=Indicator.js.map