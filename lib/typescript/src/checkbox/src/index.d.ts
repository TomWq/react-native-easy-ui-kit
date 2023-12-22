/// <reference types="react" />
import type { ColorValue, ViewStyle } from 'react-native';
type CheckboxProps = {
    size?: number;
    style?: ViewStyle;
    checked?: boolean | undefined;
    checkColor?: ColorValue | undefined;
    onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
};
declare function CheckboxView(props: CheckboxProps): JSX.Element;
export default CheckboxView;
//# sourceMappingURL=index.d.ts.map