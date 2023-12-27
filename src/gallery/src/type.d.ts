import React from 'react';
import { ViewStyle } from 'react-native';
type Dimensions = {
    height: number;
    width: number;
};


export type RenderItemInfo<T> = {
    index: number;
    item: T;
    setImageDimensions: (imageDimensions: Dimensions) => void;
};
export type EventsCallbacks = {
    onSwipeToClose?: () => void;
    onTap?: () => void;
    onDoubleTap?: () => void;
    onLongPress?: () => void;
    onScaleStart?: () => void;
    onScaleEnd?: (scale: number) => void;
    onPanStart?: () => void;
};
export type RenderItem<T> = (imageInfo: RenderItemInfo<T>) => React.ReactElement | null
export type GalleryRef = {
    setIndex: (newIndex: number, animated?: boolean) => void;
    reset: (animated?: boolean) => void;
};
export type GalleryReactRef = React.Ref<GalleryRef>;
export type GalleryProps<T> = EventsCallbacks & {
    ref?: GalleryReactRef;
    data: T[]; //要呈现的项数组
    renderItem?: RenderItem<T>; //可用于渲染自定义图像组件
    keyExtractor?: (item: T, index: number) => string | number; //回调函数，为项目提供唯一键
    initialIndex?: number; //初始图像索引
    onIndexChange?: (index: number) => void; //	在活动项的索引发生更改时调用
    numToRender?: number; //同时在库中呈现的项目数量
    emptySpaceWidth?: number; //项目之间的空白宽度
    doubleTapScale?: number; //双击时的图像缩放
    doubleTapInterval?: number; //单击和双击事件之间的时间（以毫秒为单位）
    maxScale?: number; //用户可以通过手势设置的最大比例
    style?: ViewStyle;
    containerDimensions?: {
        width: number;
        height: number;
    }; // 	包装库的 View 的 Dimensions 对象。
    pinchEnabled?: boolean; //是否启用了捏合手势
    doubleTapEnabled?: boolean; //	是否启用了双击
    disableTransitionOnScaledImage?: boolean; //当缩放比例> 1 时，禁用过渡到下一个/上一个图像
    hideAdjacentImagesOnScaledImage?: boolean; //当比例> 1 时隐藏下一个和上一个图像
    disableVerticalSwipe?: boolean; //当缩放 == 1 时禁用垂直滑动
    disableSwipeUp?: boolean; //当缩放比例 == 1 时禁用向上滑动
    loop?: boolean; //允许用户无限滑动。在以下情况下起作用data.length > 1
    onScaleChange?: (scale: number) => void; //在更改比例时调用
    onScaleChangeRange?: {
        start: number;
        end: number;
    };
};


