"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _pullToRefresh = require("@sdcx/pull-to-refresh");
var _view = _interopRequireDefault(require("../../view"));
var _text = _interopRequireDefault(require("../../text"));
var _reactNativeHapticFeedback = _interopRequireDefault(require("react-native-haptic-feedback"));
var _reactNativeUnistyles = require("react-native-unistyles");
var _src = _interopRequireDefault(require("../../activityIndicator/src"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function DefaultPullToRefreshDarkHeader(props) {
  const {
    onRefresh,
    refreshing
  } = props;
  const {
    styles,
    theme
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  const [text, setText] = (0, _react.useState)('下拉刷新');
  const [type, setType] = (0, _react.useState)(0);
  const onStateChanged = (0, _react.useCallback)(event => {
    const state = event.nativeEvent.state;
    if (state === _pullToRefresh.PullToRefreshStateIdle) {
      console.log('PullToRefreshStateIdle', '下拉刷新');
      setType(0);
      setText('下拉刷新');
    } else if (state === _pullToRefresh.PullToRefreshStateRefreshing) {
      setText('正在刷新');
      setType(1);
    } else {
      setText('松开刷新');
      setType(0);
      _reactNativeHapticFeedback.default.trigger('impactLight');
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_pullToRefresh.PullToRefreshHeader, {
    style: styles.container,
    onStateChanged: onStateChanged,
    onRefresh: onRefresh,
    refreshing: refreshing
  }, type == 0 ? /*#__PURE__*/_react.default.createElement(_text.default, {
    style: styles.text
  }, text) : /*#__PURE__*/_react.default.createElement(_view.default, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_src.default, {
    size: 20,
    color: theme.colors.refreshColor
  })));
}
var _default = exports.default = DefaultPullToRefreshDarkHeader;
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
//# sourceMappingURL=DefaultPullToRefreshHeader.js.map