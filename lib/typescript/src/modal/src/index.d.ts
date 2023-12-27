import React from 'react';
import type { BottomSheetBackgroundProps, BottomSheetProps, BottomSheetScrollableProps } from '@gorhom/bottom-sheet';
export type BottomSheetRef = {
    presentModal: () => void;
    dismissModal: () => void;
};
declare const ModalView: React.ForwardRefExoticComponent<BottomSheetProps & BottomSheetScrollableProps & {
    children: React.ReactNode;
    snapPoints: BottomSheetProps['snapPoints'];
    opacity?: number | undefined;
    enableBlurBackdrop?: boolean | undefined;
    backgroundComponent?: React.FC<BottomSheetBackgroundProps> | null | undefined;
} & React.RefAttributes<BottomSheetRef>>;
export default ModalView;
//# sourceMappingURL=index.d.ts.map