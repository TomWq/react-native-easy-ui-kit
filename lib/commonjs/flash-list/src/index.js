"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _src = _interopRequireDefault(require("../../activityIndicator/src"));
var _view = _interopRequireDefault(require("../../view"));
var _text = _interopRequireDefault(require("../../text"));
var _flashList = require("@shopify/flash-list");
var _reactNativeUnistyles = require("react-native-unistyles");
var _reactNative = require("react-native");
var _pullToRefresh = require("@sdcx/pull-to-refresh");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function FlashListView(props) {
  const {
    styles,
    theme
  } = (0, _reactNativeUnistyles.useStyles)(stylesheet);
  return /*#__PURE__*/_react.default.createElement(_view.default, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_flashList.FlashList, _extends({}, props, {
    data: props.data,
    showsVerticalScrollIndicator: false,
    keyExtractor: index => index + '',
    renderItem: props.renderItem,
    onEndReachedThreshold: 0.1,
    nestedScrollEnabled: true,
    ListFooterComponent: _ListFooterComponent,
    refreshControl: MyRefreshControl()
  })));
  function MyRefreshControl() {
    if (_reactNative.Platform.OS !== 'android') {
      return props.refreshControl;
    } else {
      return /*#__PURE__*/_react.default.createElement(_pullToRefresh.PullToRefresh, {
        style: {
          flex: 1
        },
        header: props.refreshControl
      });
    }
  }
  function _ListFooterComponent() {
    if (!props.isLastPage && props.data && props.data.length > 0) {
      return /*#__PURE__*/_react.default.createElement(_view.default, {
        style: styles.footer
      }, /*#__PURE__*/_react.default.createElement(_src.default, {
        color: theme.colors.primary
      }), /*#__PURE__*/_react.default.createElement(_text.default, null, "\u52A0\u8F7D\u4E2D..."));
    } else {
      return /*#__PURE__*/_react.default.createElement(_view.default, {
        style: styles.footer
      }, /*#__PURE__*/_react.default.createElement(_text.default, {
        style: styles.footerTitle
      }, "\u5DF2\u52A0\u8F7D\u5168\u90E8\u6570\u636E"));
    }
  }
}
var _default = exports.default = FlashListView;
const stylesheet = (0, _reactNativeUnistyles.createStyleSheet)({
  container: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  footerTitle: {
    fontSize: 10
  }
});
//# sourceMappingURL=index.js.map