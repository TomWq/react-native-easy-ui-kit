import React from 'react';
import View from '../../view';
import { StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
export const pixelWidth = StyleSheet.hairlineWidth;
function Divider(props) {
  const {
    styles
  } = useStyles(stylesheet);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, props.style]
  });
}
const stylesheet = createStyleSheet(theme => ({
  container: {
    height: pixelWidth,
    backgroundColor: theme.colors.border,
    width: '95%'
  }
}));
export default Divider;
//# sourceMappingURL=index.js.map