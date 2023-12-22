import React from 'react';
import { Animated } from 'react-native';
import type { StyleProp, ViewStyle, EasingFunction } from 'react-native';
interface IndicatorProps {
    animationEasing?: EasingFunction;
    animationDuration?: number;
    hideAnimationDuration?: number;
    animating?: boolean;
    interaction?: boolean;
    hidesWhenStopped?: boolean;
    renderComponent?: (params: {
        index: number;
        count: number;
        progress: Animated.Value;
    }) => React.ReactNode;
    count?: number;
    style?: StyleProp<ViewStyle>;
    props?: any;
}
declare const Indicator: React.FC<IndicatorProps>;
export default Indicator;
//# sourceMappingURL=Indicator.d.ts.map