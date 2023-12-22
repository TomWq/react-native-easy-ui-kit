function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import ActivityIndicator from '../../activityIndicator/src';
import View from '../../view';
import Text from '../../text';
import { FlashList } from '@shopify/flash-list';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Platform } from 'react-native';
import { PullToRefresh } from '@sdcx/pull-to-refresh';
function FlashListView(props) {
  const {
    styles,
    theme
  } = useStyles(stylesheet);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlashList, _extends({}, props, {
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
    if (Platform.OS !== 'android') {
      return props.refreshControl;
    } else {
      return /*#__PURE__*/React.createElement(PullToRefresh, {
        style: {
          flex: 1
        },
        header: props.refreshControl
      });
    }
  }
  function _ListFooterComponent() {
    if (!props.isLastPage && props.data && props.data.length > 0) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.footer
      }, /*#__PURE__*/React.createElement(ActivityIndicator, {
        color: theme.colors.primary
      }), /*#__PURE__*/React.createElement(Text, null, "\u52A0\u8F7D\u4E2D..."));
    } else {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.footer
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.footerTitle
      }, "\u5DF2\u52A0\u8F7D\u5168\u90E8\u6570\u636E"));
    }
  }
}
export default FlashListView;
const stylesheet = createStyleSheet({
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