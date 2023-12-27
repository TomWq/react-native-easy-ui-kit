function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { debounce } from '../../utils/debounce';
import Animated from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Text from '../../text';
const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);
export default function Button({
  onPress,
  label,
  style,
  labelStyle,
  textProps,
  debounceDelay = 1000,
  borderRadius = 5,
  isShadow = true,
  icon,
  ...otherProps
}) {
  const {
    styles
  } = useStyles(stylesheet);

  // 防抖
  const onPressDebounce = React.useCallback(() => {
    onPress && onPress();
  }, [onPress]);
  const shadowStyle = {
    //阴影
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  };
  return /*#__PURE__*/React.createElement(AnimatedRectButton, _extends({}, otherProps, {
    onPress: debounce(onPressDebounce, debounceDelay, true),
    style: [styles.buttonView, {
      borderRadius
    }, style, isShadow && shadowStyle]
  }), icon && /*#__PURE__*/React.createElement(FontAwesome, {
    size: 24,
    color: '#fff',
    name: icon,
    style: styles.buttonIcon(label)
  }), /*#__PURE__*/React.createElement(Text, _extends({
    style: [styles.buttonTitle, labelStyle]
  }, textProps), label));
}
const stylesheet = createStyleSheet(theme => ({
  buttonView: {
    backgroundColor: theme.colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50,
    minWidth: 100
  },
  buttonTitle: {
    color: theme.colors.buttonLable,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: {
      'xs': 16
    }
  },
  buttonIcon: label => ({
    marginRight: label ? 5 : 0
  })
}));
//# sourceMappingURL=index.js.map