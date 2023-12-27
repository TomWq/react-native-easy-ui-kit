import React ,{forwardRef,useImperativeHandle} from 'react'
import type {BottomSheetBackgroundProps, BottomSheetProps,BottomSheetScrollableProps} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import View from '../../view'
import {StyleSheet} from 'react-native'
import { useStyles,createStyleSheet } from 'react-native-unistyles';
import {isIos} from '../../utils/platform'
type NormalBottomSheetProps = BottomSheetProps & BottomSheetScrollableProps & {
  children:React.ReactNode
  snapPoints:BottomSheetProps['snapPoints']
  opacity?:number
  enableBlurBackdrop?:boolean  // 是否显示模糊背景
  backgroundComponent?: React.FC<BottomSheetBackgroundProps> | null;
}

export type BottomSheetRef = {
  presentModal:() => void
  dismissModal:() => void
}

const ModalView = forwardRef<BottomSheetRef,NormalBottomSheetProps>((props:NormalBottomSheetProps,ref)=>{

  const {children,snapPoints,opacity,enableBlurBackdrop,backgroundComponent,...otherProps} = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref,()=>({
    presentModal:()=> handlePresentModalPress(),
    dismissModal:()=> handleClosePress()
  }))

  // variables
  const snapPoint = useMemo(() => snapPoints, [snapPoints]);

    // callbacks
    const handleSheetChanges = useCallback((index:number) => {
      if (index === 0) {
        handleClosePress()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleClosePress = useCallback(() => {
      bottomSheetModalRef.current?.close();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (

      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoint}
          onChange={handleSheetChanges}
          handleComponent={()=>null}
          backgroundComponent ={enableBlurBackdrop ? BlurredBackground : backgroundComponent}
          backdropComponent={(props)=>(
            <BottomSheetBackdrop
                {...props}
                opacity={opacity ?? 0.1}
            />
         )}
          {...otherProps}
        >
          {children}
      </BottomSheetModal>

  )
})

function BlurredBackground(){

  const {styles} = useStyles(stylesheet)


  return(
    <View style={styles.container}>
         {
          isIos ?  <BlurView
          tint="light"
          style={styles.blurView}
          intensity={50}
          />:
          <View style={[styles.blurView,{
              backgroundColor:'#fff'
          }]}/>
        }
    </View>
  )
}

const stylesheet = createStyleSheet({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default ModalView
