function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text as DefaultText } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
function Text(props) {
  const stylesheet = createStyleSheet(theme => ({
    container: {
      color: theme.colors.text
    }
  }));
  const {
    styles
  } = useStyles(stylesheet);
  const {
    style,
    ...otherProps
  } = props;
  return /*#__PURE__*/React.createElement(DefaultText, _extends({
    style: [styles.container, style]
  }, otherProps));
}
export default Text;
//# sourceMappingURL=index.js.map