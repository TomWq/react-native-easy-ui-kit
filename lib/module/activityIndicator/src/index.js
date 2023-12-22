import React from 'react';
import { ActivityIndicator as RNActivityIndicator, Platform } from 'react-native';
import MaterialIndicator from './MaterialIndicator';
function ActivityIndicator(props) {
  if (Platform.OS === 'web') {
    return /*#__PURE__*/React.createElement(RNActivityIndicator, props);
  }
  return /*#__PURE__*/React.createElement(MaterialIndicator, props);
}
export default ActivityIndicator;
//# sourceMappingURL=index.js.map