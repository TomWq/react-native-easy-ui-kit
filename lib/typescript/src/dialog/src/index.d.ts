import RootSiblings from 'react-native-root-siblings';
interface DialogButton {
    text?: string | undefined;
    onPress?: ((value?: string) => void) | undefined;
    style?: 'default' | 'cancel' | 'destructive' | undefined;
}
type DialogViewProps = {
    position?: 'left' | 'center' | 'bottom' | 'right';
    swipeClose?: boolean;
    title: string;
    message?: string;
    buttons?: DialogButton[];
    hideDialog?: () => void;
};
export declare const pixelWidth: number;
declare const Dialog: {
    sibling: RootSiblings | null;
    /**
     * Show the dialog view with the given props.
     *
     * @param {DialogViewProps} props - The props to pass to the dialog view.
     */
    show(props: DialogViewProps): void;
    /**
     * Hides the sibling element by destroying it and setting the sibling reference to null.
     *
     */
    hide(): void;
};
export default Dialog;
//# sourceMappingURL=index.d.ts.map