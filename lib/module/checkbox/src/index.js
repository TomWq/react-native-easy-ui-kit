import React from 'react';
import { createStyleSheet } from 'react-native-unistyles';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/AntDesign';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
function CheckboxView(props) {
  const {
    size,
    style,
    checked,
    checkColor,
    onValueChange
  } = props;
  const scaledValue = useSharedValue(checked ? 1 : 0);
  const styles = createStyleSheet({
    bgStyle: {
      width: size || 30,
      height: size || 30,
      borderRadius: (style === null || style === void 0 ? void 0 : style.borderRadius) || 5,
      borderColor: (style === null || style === void 0 ? void 0 : style.borderColor) || 'black',
      borderWidth: (style === null || style === void 0 ? void 0 : style.borderWidth) || 1,
      backgroundColor: (style === null || style === void 0 ? void 0 : style.backgroundColor) || '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  const onChange = () => {
    if (checked) {
      scaledValue.value = withTiming(0, {
        duration: 200
      });
    } else {
      scaledValue.value = withTiming(1, {
        duration: 200
      });
    }
    onValueChange && onValueChange(!checked);
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.bgStyle],
    onPress: () => onChange(),
    activeOpacity: 1
  }, checked && /*#__PURE__*/React.createElement(AnimatedIcon, {
    name: "check",
    size: size ? size / 1.5 : 20,
    color: checkColor || 'black'
  }));
}
export default CheckboxView;
//# sourceMappingURL=index.js.map