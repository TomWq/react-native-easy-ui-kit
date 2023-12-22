import React from 'react';
import { View } from 'react-native';
import StaticContainer from './StaticContainer';

const SceneComponent = ({ shouldUpdated, children, ...props }) => {
  return (
    <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {children}
      </StaticContainer>
    </View>
  );
};

export default SceneComponent;

