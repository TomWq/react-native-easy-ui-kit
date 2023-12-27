
import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
} from 'react-native';

import type {  StyleProp,
  ViewStyle,
  EasingFunction,} from 'react-native'

interface IndicatorProps {
  animationEasing?: EasingFunction;
  animationDuration?: number;
  hideAnimationDuration?: number;

  animating?: boolean;
  interaction?: boolean;
  hidesWhenStopped?: boolean;

  renderComponent?: (params: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => React.ReactNode;
  count?: number;

  style?: StyleProp<ViewStyle>;
  props?: any;
}

const Indicator: React.FC<IndicatorProps> = ({
  animationEasing = Easing.linear,
  animationDuration = 1200,
  hideAnimationDuration = 200,
  animating = true,
  interaction = true,
  hidesWhenStopped = true,
  count = 1,
  renderComponent,
  style,
  props,
}) => {
  const [progress] = useState(new Animated.Value(0));
  const [hideAnimation] = useState(new Animated.Value(animating ? 1 : 0));
  const [animationState, setAnimationState] = useState(0);
  const [savedValue, setSavedValue] = useState(0);

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const startAnimation = () => {
    if (animationState !== 0) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    animationRef.current = Animated.loop(animation);
    animationRef.current.start();

    setAnimationState(1);
  };

  const stopAnimation = () => {
    if (animationState !== 1) {
      return;
    }

    const listener = progress.addListener(({value}) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => saveAnimation(value));
    });

    setAnimationState(-1);
  };

  const saveAnimation = (value: number) => {
    const {animating} = props;

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
      duration: (1 - savedValue) * animationDuration!,
      toValue: 1,
    }).start(({finished}) => {
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

    if (animating !== props?.animating) {
      Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration: hideAnimationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [animating]);

  const renderComponentWrapper = (index: number) => {
    if (typeof renderComponent === 'function') {
      if (count) {
        return renderComponent({index, count, progress});
      }
    }

    return null;
  };

  if (hidesWhenStopped) {
    style = []
      //@ts-ignore
      .concat(style || [], {opacity: hideAnimation});
  }

  return (
    <Animated.View style={style}>
      {Array.from(new Array(count), renderComponentWrapper)}
    </Animated.View>
  );
};

export default Indicator;
