import React from 'react';
import type { FlashListProps } from '@shopify/flash-list';
import type { RefreshControlProps } from 'react-native';
type FlashListViewProps<T> = FlashListProps<T> & {
    isLastPage: boolean;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
};
declare function FlashListView<T>(props: FlashListViewProps<T>): JSX.Element;
export default FlashListView;
//# sourceMappingURL=index.d.ts.map