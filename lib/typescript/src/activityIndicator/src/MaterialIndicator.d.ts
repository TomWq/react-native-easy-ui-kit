import { PureComponent } from 'react';
import { Animated } from 'react-native';
import type { ViewStyle } from 'react-native';
export interface MaterialIndicatorProps {
    trackWidth?: number;
    color?: string;
    size?: number;
    animationDuration?: number;
    style?: ViewStyle;
    title?: string;
}
export default class MaterialIndicator extends PureComponent<MaterialIndicatorProps> {
    static defaultProps: MaterialIndicatorProps;
    _renderComponent: ({ index, progress, }: {
        index: number;
        count: number;
        progress: Animated.Value;
    }) => JSX.Element;
    render(): JSX.Element;
}
//# sourceMappingURL=MaterialIndicator.d.ts.map