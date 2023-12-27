import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
const Indicator = ({
  animationEasing = Easing.linear,
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
  const [progress] = useState(new Animated.Value(0));
  const [hideAnimation] = useState(new Animated.Value(animating ? 1 : 0));
  const [animationState, setAnimationState] = useState(0);
  const [savedValue, setSavedValue] = useState(0);
  const animationRef = useRef(null);
  const startAnimation = () => {
    if (animationState !== 0) {
      return;
    }
    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });
    animationRef.current = Animated.loop(animation);
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
    Animated.timing(progress, {
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
  useEffect(() => {
    if (animating) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (animating && animationState === -1) {
      resumeAnimation();
    }
    if (!animating && animationState === 1) {
      stopAnimation();
    }
    if (animating !== (props === null || props === void 0 ? void 0 : props.animating)) {
      Animated.timing(hideAnimation, {
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
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: style
  }, Array.from(new Array(count), renderComponentWrapper));
};
export default Indicator;
//# sourceMappingURL=Indicator.js.map