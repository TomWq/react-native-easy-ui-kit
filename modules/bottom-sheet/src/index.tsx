import React ,{Ref, forwardRef,useImperativeHandle} from 'react'
import BottomSheet,{BottomSheetScrollView,BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import type {BottomSheetProps,BottomSheetScrollableProps,BottomSheetBackdropProps} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react';


type NormalBottomSheetProps = BottomSheetProps & BottomSheetScrollableProps & {
  children:React.ReactNode
  snapPoints:BottomSheetProps['snapPoints']
  type?:'Normal' | 'ScrollView',
  enableBackdrop?:boolean  // 是否显示背景
  backdropOpacity?:number // 背景透明度
  pressBehavior?:'none' | 'close' | 'collapse' | number; //当用户按下背景时会发生什么？
}

export type BottomSheetRef = {
  presentModal:() => void
  dismissModal:() => void
}

const ModalView = forwardRef<BottomSheetRef,NormalBottomSheetProps>((props:NormalBottomSheetProps,ref)=>{

  const {children,snapPoints,type,enableBackdrop,backdropOpacity,pressBehavior,...otherProps} = props

  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref,()=>({
    presentModal:()=> handleSnapPress(1),
    dismissModal:()=> handleClosePress()
  }))

  // variables
  const snapPoint = useMemo(() => snapPoints, []);

    // callbacks
    const handleSheetChanges = useCallback((index:number) => {
      if (index === 0) {
        handleClosePress()
      }
    }, []);
    const handleSnapPress = useCallback((index:number) => {
      bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

  const childrenView = useMemo(()=>{
    if(type === 'ScrollView'){
      return(
        <BottomSheetScrollView {...otherProps}>
          {children}
        </BottomSheetScrollView>
      )
    }else{
      return children
    }
  },[type])

  const renderBackdrop = useCallback(
    (props:BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        // appearsOnIndex={2}
        opacity={backdropOpacity ?? 0.5}
        pressBehavior={pressBehavior ?? 'close'}
      />
    ),
    []
  );

  return (
    <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoint}
        onChange={handleSheetChanges}
        backdropComponent={enableBackdrop?renderBackdrop:null}
        {...otherProps}
      >
        {childrenView}
    </BottomSheet>
  )
})

export default ModalView