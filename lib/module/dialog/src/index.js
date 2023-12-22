function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { StyleSheet, Pressable, Platform } from 'react-native';
import View from '../../view';
import Text from '../../text';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, interpolateColor } from 'react-native-reanimated';
import RootSiblings from 'react-native-root-siblings';
import { FullWindowOverlay } from 'react-native-screens';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
//最小间距
export const pixelWidth = StyleSheet.hairlineWidth;
function DialogView({
  title = '标题',
  message = '',
  position = 'center',
  swipeClose = false,
  buttons = [{
    text: '取消',
    style: 'cancel',
    onPress: () => {}
  }, {
    text: '确定',
    style: 'destructive',
    onPress: () => {}
  }],
  hideDialog = () => {}
}) {
  const {
    styles
  } = useStyles(stylesheet);
  const opacity = useSharedValue(0.5);
  const scale = useSharedValue(position === 'center' ? 0.5 : 1);
  const translateY = useSharedValue(position === 'bottom' ? 300 : 0);
  const translateX = useSharedValue(position === 'left' ? -300 : position === 'right' ? 300 : 0);
  useEffect(() => {
    startAnimation();
  }, []);
  const dialogAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        scale: scale.value
      }, {
        translateY: translateY.value
      }, {
        translateX: translateX.value
      }],
      opacity: opacity.value
    };
  });
  const bgColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(opacity.value, [0.5, 1], ['transparent', 'rgba(0,0,0,0.1)'], 'RGB')
    };
  });

  /**
   * Starts the animation by setting the opacity and scale values using the withTiming function.
   * @return {none} This function does not return any value.
   */
  const startAnimation = () => {
    opacity.value = withTiming(1, {
      duration: 300
    });
    scale.value = withTiming(1, {
      duration: 300
    });
    if (position === 'bottom') {
      translateY.value = withTiming(0, {
        duration: 300
      });
    } else if (position === 'left') {
      translateX.value = withTiming(0, {
        duration: 300
      });
    } else if (position === 'right') {
      translateX.value = withTiming(0, {
        duration: 300
      });
    } else {
      opacity.value = withTiming(1, {
        duration: 300
      });
      scale.value = withTiming(1, {
        duration: 300
      });
    }
  };

  /**
   * Stops the animation by setting the opacity and scale values using the withTiming function.
   * If the scale animation finishes, it runs the hideDialog function using the runOnJS function.
   *
   * @return {void} No return value.
   */
  const stopAnimation = () => {
    opacity.value = withTiming(0, {
      duration: 300
    });
    scale.value = withTiming(0.8, {
      duration: 300
    }, finished => {
      if (finished) {
        runOnJS(hideDialog)();
      }
    });
    if (position === 'bottom') {
      translateY.value = withTiming(300, {
        duration: 300
      });
    } else if (position === 'left') {
      translateX.value = withTiming(-300, {
        duration: 300
      });
    } else if (position === 'right') {
      translateX.value = withTiming(300, {
        duration: 300
      });
    }
  };
  const gesture = Gesture.Pan().onBegin(() => {
    console.log('开始');
  }).onUpdate(e => {
    //弹框随着滑动移动消失
    if (position === 'bottom') {
      translateY.value = e.translationY;
    } else if (position === 'left') {
      translateX.value = e.translationX;
    } else if (position === 'right') {
      translateX.value = e.translationX;
    }
  }).onEnd(e => {
    console.log('结束');
    if (position === 'bottom') {
      if (e.translationY > 200) {
        // stopAnimation()
        runOnJS(stopAnimation)();
      } else {
        translateY.value = withTiming(0, {
          duration: 300
        });
      }
    } else if (position === 'left') {
      if (e.translationX < -200) {
        // stopAnimation()
        runOnJS(stopAnimation)();
      } else {
        translateX.value = withTiming(0, {
          duration: 300
        });
      }
    } else if (position === 'right') {
      if (e.translationX > 200) {
        // stopAnimation()
        runOnJS(stopAnimation)();
      } else {
        translateX.value = withTiming(0, {
          duration: 300
        });
      }
    }
  });
  const defaultGesture = Gesture.Tap();

  /**
   * Renders the children of the component.
   *
   * @return {JSX.Element} The rendered children.
   */
  const children = () => {
    return /*#__PURE__*/React.createElement(GestureDetector, {
      gesture: swipeClose ? gesture : defaultGesture
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.container, bgColor]
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.dialogView, dialogAnimatedStyle]
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.title,
      numberOfLines: 2
    }, title), message && /*#__PURE__*/React.createElement(Text, {
      style: styles.message,
      numberOfLines: 2
    }, message), /*#__PURE__*/React.createElement(View, {
      style: styles.buttons
    }, buttons && buttons.map((item, index) => {
      return /*#__PURE__*/React.createElement(Pressable, {
        key: index + '',
        style: styles.buttonItem(index),
        onPress: () => {
          if (item.onPress) {
            if (index === 0) {
              stopAnimation();
            } else {
              stopAnimation();
              item.onPress();
            }
          }
        }
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.itemTitle(index)
      }, item.text));
    })))));
  };
  if (Platform.OS === 'ios') {
    return /*#__PURE__*/React.createElement(FullWindowOverlay, null, children());
  }
  return children();
}
const Dialog = {
  sibling: null,
  /**
   * Show the dialog view with the given props.
   *
   * @param {DialogViewProps} props - The props to pass to the dialog view.
   */
  show(props) {
    this.sibling = new RootSiblings( /*#__PURE__*/React.createElement(DialogView, _extends({}, props, {
      hideDialog: () => {
        this.hide();
      }
    })));
  },
  /**
   * Hides the sibling element by destroying it and setting the sibling reference to null.
   *
   */
  hide() {
    this.sibling?.destroy();
    this.sibling = null;
  }
};
export default Dialog;
const stylesheet = createStyleSheet(theme => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        zIndex: 99
      },
      web: {
        zIndex: 99
      },
      ios: {
        zIndex: 0
      }
    })
  },
  dialogView: {
    backgroundColor: theme.colors.card,
    borderWidth: pixelWidth,
    borderColor: theme.colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    overflow: 'visible',
    height: 50,
    borderTopWidth: pixelWidth,
    borderTopColor: theme.colors.border,
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: 200,
    height: 40,
    lineHeight: 50
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    maxWidth: 200,
    height: 40,
    marginBottom: 10
  },
  buttonItem: index => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: index % 2 === 0 ? pixelWidth : 0,
    borderRightColor: theme.colors.border,
    height: 45
  }),
  input: {
    width: '90%',
    marginBottom: 20
  },
  itemTitle: index => ({
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: index % 2 !== 0 ? 'bold' : 'normal'
  })
}));
//# sourceMappingURL=index.js.map