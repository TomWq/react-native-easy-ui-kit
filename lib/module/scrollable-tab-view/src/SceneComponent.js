import React from 'react';
import { View } from 'react-native';
import StaticContainer from './StaticContainer';
const SceneComponent = ({
  shouldUpdated,
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(View, props, /*#__PURE__*/React.createElement(StaticContainer, {
    shouldUpdate: shouldUpdated
  }, children));
};
export default SceneComponent;
//# sourceMappingURL=SceneComponent.js.map