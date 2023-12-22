import React, { useCallback, useRef, useState } from 'react';
import { PullToRefreshHeader, PullToRefreshStateIdle, PullToRefreshStateRefreshing } from '@sdcx/pull-to-refresh';
import Lottie from 'lottie-react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
function LottiePullToRefreshHeader(props) {
  const [progress, setProgress] = useState(0);
  const lottieRef = useRef(null);
  const stateRef = useRef(PullToRefreshStateIdle);
  const {
    onRefresh,
    refreshing
  } = props;
  const {
    styles
  } = useStyles(stylesheet);
  const onStateChanged = useCallback(event => {
    const state = event.nativeEvent.state;
    stateRef.current = state;
    if (state === PullToRefreshStateIdle) {
      lottieRef.current?.pause();
      setTimeout(() => setProgress(0), 500);
    } else if (state === PullToRefreshStateRefreshing) {
      lottieRef.current?.play(progress);
    } else {
      HapticFeedback.trigger('impactLight');
    }
  }, [progress]);
  const onOffsetChanged = useCallback(event => {
    const offset = event.nativeEvent.offset;
    if (stateRef.current !== PullToRefreshStateRefreshing) {
      setProgress(Math.min(1, offset / 50));
    }
  }, []);
  return /*#__PURE__*/React.createElement(PullToRefreshHeader, {
    style: styles.container,
    onOffsetChanged: onOffsetChanged,
    onStateChanged: onStateChanged,
    onRefresh: onRefresh,
    refreshing: refreshing
  }, /*#__PURE__*/React.createElement(Lottie, {
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
export default LottiePullToRefreshHeader;
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
//# sourceMappingURL=LottiePullToRefreshHeader.js.map