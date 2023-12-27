"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _pullToRefresh = require("@sdcx/pull-to-refresh");
var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));
var _reactNativeHapticFeedback = _interopRequireDefault(require("react-native-haptic-feedback"));
var _reactNativeUnistyles = require("react-native-unistyles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function LottiePullToRefreshHeader(props) {
  const [progress, setProgress] = (0, _react.useState)(0);
  const lottieRef = (0, _react.useRef)(null);
  const stateRef = (0, _react.useRef)(_pullToRefresh.PullToRefreshStateIdle);
  const {
    onRefresh,
    refreshing
  } = props;
  const {
    styles
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const onStateChanged = (0, _react.useCallback)(event => {
    const state = event.nativeEvent.state;
    stateRef.current = state;
    if (state === _pullToRefresh.PullToRefreshStateIdle) {
      var _lottieRef$current;
      (_lottieRef$current = lottieRef.current) === null || _lottieRef$current === void 0 || _lottieRef$current.pause();
      setTimeout(() => setProgress(0), 500);
    } else if (state === _pullToRefresh.PullToRefreshStateRefreshing) {
      var _lottieRef$current2;
      (_lottieRef$current2 = lottieRef.current) === null || _lottieRef$current2 === void 0 || _lottieRef$current2.play(progress);
    } else {
      _reactNativeHapticFeedback.default.trigger('impactLight');
    }
  }, [progress]);
  const onOffsetChanged = (0, _react.useCallback)(event => {
    const offset = event.nativeEvent.offset;
    if (stateRef.current !== _pullToRefresh.PullToRefreshStateRefreshing) {
      setProgress(Math.min(1, offset / 50));
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_pullToRefresh.PullToRefreshHeader, {
    style: styles.container,
    onOffsetChanged: onOffsetChanged,
    onStateChanged: onStateChanged,
    onRefresh: onRefresh,
    refreshing: refreshing
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
    ref: lottieRef,
    style: {
      height: 50,
      width: 50
    },
    source: require('./square-loading.json'),
    autoPlay: false,
    speed: 1,
    loop: true,
    progress: progress
  }));
}
var _default = exports.default = LottiePullToRefreshHeader;
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    paddingVertical: 16,
    fontSize: 12,
    color: theme.colors.refreshColor,
    marginLeft: 20
  },
  load: {
    width: 100,
    height: 40,
    marginBottom: 10
  }
}));
//# sourceMappingURL=LottiePullToRefreshHeader.js.map