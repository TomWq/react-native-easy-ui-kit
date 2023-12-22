import React from 'react';
import type { BaseButtonProps } from 'react-native-gesture-handler';
import type { StyleProp, TextStyle, ViewStyle, TextProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
type ButtonProps = BaseButtonProps & AnimatedProps<object> & {
    onPress?: () => void;
    label?: string | number | undefined;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    textProps?: TextProps;
    debounceDelay?: number;
    borderRadius?: number;
    isShadow?: boolean;
    lightColor?: string;
    darkColor?: string;
    icon?: React.ComponentProps<typeof FontAwesome>['name'];
};
export default function Button({ onPress, label, style, labelStyle, textProps, debounceDelay, borderRadius, isShadow, icon, lightColor, darkColor, ...otherProps }: ButtonProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map