import React, { useCallback, useState } from 'react';
import { PullToRefreshHeader, PullToRefreshStateIdle, PullToRefreshStateRefreshing } from '@sdcx/pull-to-refresh';
import View from '../../view';
import Text from '../../text';
import HapticFeedback from 'react-native-haptic-feedback';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import MaterialIndicatorLoad from '../../activityIndicator/src';
function DefaultPullToRefreshDarkHeader(props) {
  const {
    onRefresh,
    refreshing
  } = props;
  const {
    styles,
    theme
  } = useStyles(stylesheet);
  const [text, setText] = useState('下拉刷新');
  const [type, setType] = useState(0);
  const onStateChanged = useCallback(event => {
    const state = event.nativeEvent.state;
    if (state === PullToRefreshStateIdle) {
      console.log('PullToRefreshStateIdle', '下拉刷新');
      setType(0);
      setText('下拉刷新');
    } else if (state === PullToRefreshStateRefreshing) {
      setText('正在刷新');
      setType(1);
    } else {
      setText('松开刷新');
      setType(0);
      HapticFeedback.trigger('impactLight');
    }
  }, []);
  return /*#__PURE__*/React.createElement(PullToRefreshHeader, {
    style: styles.container,
    onStateChanged: onStateChanged,
    onRefresh: onRefresh,
    refreshing: refreshing
  }, type == 0 ? /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, text) : /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(MaterialIndicatorLoad, {
    size: 20,
    color: theme.colors.refreshColor
  })));
}
export default DefaultPullToRefreshDarkHeader;
const stylesheet = createStyleSheet(theme => ({
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