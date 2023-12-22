import React, { useCallback, useRef, useState } from 'react'
import {
  PullToRefreshHeader,
  PullToRefreshHeaderProps,
  PullToRefreshOffsetChangedEvent,
  PullToRefreshStateChangedEvent,
  PullToRefreshState,
  PullToRefreshStateIdle,
  PullToRefreshStateRefreshing,
} from '@sdcx/pull-to-refresh'
import Lottie from 'lottie-react-native'
import HapticFeedback from 'react-native-haptic-feedback'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

function LottiePullToRefreshHeader(props: PullToRefreshHeaderProps) {

  const [progress, setProgress] = useState(0)
  const lottieRef = useRef<Lottie>(null)
  const stateRef = useRef<PullToRefreshState>(PullToRefreshStateIdle)

  const { onRefresh, refreshing } = props
  const {styles,theme} = useStyles(stylesheet)
  const [text, setText] = useState('下拉刷新')
  const [type, setType] = useState(0)

  const onStateChanged = useCallback(
    (event: PullToRefreshStateChangedEvent) => {
      const state = event.nativeEvent.state
      stateRef.current = state
      if (state === PullToRefreshStateIdle) {
        lottieRef.current?.pause()
        setTimeout(() => setProgress(0), 500)
      } else if (state === PullToRefreshStateRefreshing) {
        lottieRef.current?.play(progress)
      } else {
        HapticFeedback.trigger('impactLight')
      }
    },
    [progress],
  )

  const onOffsetChanged = useCallback((event: PullToRefreshOffsetChangedEvent) => {
    const offset = event.nativeEvent.offset
    if (stateRef.current !== PullToRefreshStateRefreshing) {
      setProgress(Math.min(1, offset / 50))
    }
  }, [])

  return (
    <PullToRefreshHeader
      style={styles.container}
      onOffsetChanged={onOffsetChanged}
      onStateChanged={onStateChanged}
      onRefresh={onRefresh}
      refreshing={refreshing}>
         <Lottie
          ref={lottieRef}
          style={{ height: 50,width:50 }}
          source={require('./square-loading.json')}
          autoPlay={false}
          speed={1}
          loop
          progress={progress}
        />
    </PullToRefreshHeader>
  )
}

export default LottiePullToRefreshHeader

const stylesheet = createStyleSheet(theme=>({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    paddingVertical: 16,
    fontSize: 12,
    color: theme.colors.refreshColor,
    marginLeft: 20
  },
  load:{
    width: 100,
    height: 40,
    marginBottom:10
  }
}))
