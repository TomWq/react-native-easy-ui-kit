import RootSiblings from 'react-native-root-siblings';
type ToastViewProps = {
    text?: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
    duration?: number;
    position?: 'top' | 'bottom' | 'center';
    hideToast?: () => void;
};
/**
* The props for the ToastView component.
*
*/
declare const Toast: {
    sibling: RootSiblings | null;
    /**
     * Show a toast with the given props.
     *
     * @param {ToastViewProps} props - The props for the toast.
     * @return {void}
     */
    show(props: ToastViewProps): void;
    /**
     * Hides the sibling component and sets it to null.
     *
     * No parameters.
     *
     * No return value.
     */
    hide(): void;
};
export default Toast;
//# sourceMappingURL=index.d.ts.map