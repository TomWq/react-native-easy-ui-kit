/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:47:40
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 18:18:43
 * @FilePath     : /react-native-easy-ui-kit/modules/toast/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */

import React, { useEffect } from 'react'
import { StyleSheet,ActivityIndicator, Platform } from 'react-native'
import Text from '../../text';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RootSiblings from 'react-native-root-siblings';
import { FullWindowOverlay } from 'react-native-screens';
import { createStyleSheet, useStyles,mq } from 'react-native-unistyles';

type ToastViewProps = {
    text?:string,
    type ? : 'success' | 'error' | 'warning' | 'info' | 'loading';
    duration?:number,
    position?: 'top' | 'bottom'|'center';
    hideToast? :()=>void,
}

function ToastView({
  text = '',
  type,
  duration = 3000,
  position = 'center',
  hideToast = () =>{}
}:ToastViewProps) : JSX.Element {
  
  const {styles} = useStyles(stylesheet)
  const translateY = useSharedValue(40)
  const opacity = useSharedValue(0.5)
  const scale = useSharedValue(0.5)
  let timer = React.useRef<NodeJS.Timeout | null>(null);

  const ToastIcon = () => {
      if(type === 'success'){
          return <FontAwesome name="check-circle" size={20} color="green" />
      }else if(type === 'info'){
          return <FontAwesome name="info-circle" size={20} color="white" />
      }else if(type === 'warning'){
          return <FontAwesome name="exclamation-circle" size={20} color="orange" />
      }else if(type === 'error'){
          return < FontAwesome name="times-circle" size={20} color="red" />
      }else if(type === 'loading'){
          return <ActivityIndicator size="small" color="white" />
      }else{
          return null
      }
  }

  useEffect(()=>{

      startAnimation()
      if(duration){
          timer.current = setTimeout(()=>{
              stopAnimation()
          },duration)
      }
      return ()=>{
          if(timer.current){
              clearTimeout(timer.current)
          }
      }

  },[])

  /**
   * Starts the animation.
   * @return {type} description of return value
   */
  const startAnimation = (): void => {
      opacity.value = withTiming(1, {duration: 300});
      scale.value = withTiming(1, {duration: 300});
    };

   /**
   * Stops the animation by setting the opacity and scale values.
   *
   * @return {void}
   */  
  const stopAnimation = ():void => {
      opacity.value = withTiming(0, {duration: 300});
      scale.value = withTiming(0.5, {duration: 300},(finished)=>{
          if(finished){
              runOnJS(hideToast)();
          }
      });
  }  

  const bgStyle = useAnimatedStyle(()=>{
      return{
          transform: [{translateY: translateY.value},{scale: scale.value}],
          opacity: opacity.value,
      }
  })

  //根据position设置ToastView的位置
  const toastViewStyle = useAnimatedStyle(()=>{

      if(position === 'top'){
          return{
              justifyContent:'flex-start',
              paddingTop:100
          }
      }else if(position === 'bottom'){
          return{
              justifyContent:'flex-end',
              paddingBottom:150
          }
      }else{
          return{
              justifyContent:'center'
          }
      }
  })

  /**
   * Generates the JSX code for rendering the children component.
   *
   * @return {JSX.Element} The JSX code for rendering the children component.
   */
  const children = ():JSX.Element =>{
      return(
          <Animated.View style={[styles.container,toastViewStyle]}>
              <Animated.View style={[styles.toastView,bgStyle]}>
                  <ToastIcon/>
                  <Text style={styles.toastText}>{text}</Text>
              </Animated.View>
          </Animated.View>
      )
  }

  //ios需要全屏覆盖,包裹在FullWindowOverlay里面
  if(Platform.OS === 'ios'){
      return(
          <FullWindowOverlay>
              {children()}
          </FullWindowOverlay>
      )
  }

  return children()

}

/**
* The props for the ToastView component.
* 
*/
const Toast = {

  sibling: null as RootSiblings | null,

  /**
   * Show a toast with the given props.
   *
   * @param {ToastViewProps} props - The props for the toast.
   * @return {void} 
   */
  show(props:ToastViewProps): void {
      this.sibling = new RootSiblings(
          <ToastView
              {...props}
              hideToast={() => {
                  this.hide();
              }}
          />
      )
  },
  
  /**
   * Hides the sibling component and sets it to null.
   *
   * No parameters.
   *
   * No return value.
   */
  hide() {
      this.sibling?.destroy();
      this.sibling = null;
    },
}

export default Toast;

const stylesheet = createStyleSheet(theme=>({
  container:{
      ...StyleSheet.absoluteFillObject,
      flex:1,
      alignItems:'center',
      backgroundColor:theme.colors.transparent,
      ...Platform.select({
          android:{
            zIndex:99
          },
          web:{
            zIndex:99
          },
          ios:{
            zIndex:0
          }
        })
  },
  toastView:{
      backgroundColor:theme.colors.toastBg,
      borderRadius:5,
      flexDirection:'row',
      alignItems:'center',
      padding:15,
      justifyContent:'space-evenly',
      shadowColor:'#000',
      shadowOffset : {
          width:0,
          height:2,
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5,
      maxWidth:'90%'
  },
  toastText:{
      fontSize:14,
      color:'white',
      fontWeight:'bold',
      marginLeft:10,
      lineHeight:20
  }
}))
