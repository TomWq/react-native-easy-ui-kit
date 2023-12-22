function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
const Button = props => {
  if (Platform.OS === 'android') {
    return /*#__PURE__*/React.createElement(TouchableNativeFeedback, _extends({
      delayPressIn: 0,
      background: TouchableNativeFeedback.SelectableBackground() // eslint-disable-line new-cap
    }, props), props.children);
  } else {
    return /*#__PURE__*/React.createElement(TouchableOpacity, props, props.children);
  }
};
export default Button;
//# sourceMappingURL=Button.js.map