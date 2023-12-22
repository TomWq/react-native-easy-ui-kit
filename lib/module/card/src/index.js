function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 5
  }
}));
function Button(props) {
  const {
    styles
  } = useStyles(stylesheet);
  const {
    style,
    ...otherProps
  } = props;
  return /*#__PURE__*/React.createElement(GestureHandlerRootView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(RectButton, _extends({
    style: [styles.container, style]
  }, otherProps)));
}
export default Button;
//# sourceMappingURL=index.js.map