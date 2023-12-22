/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:48:50
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-21 09:12:33
 * @FilePath     : /react-native-easy-ui-kit/modules/button/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {RectButton,BaseButtonProps,GestureHandlerRootView} from 'react-native-gesture-handler'
import { StyleProp ,TextStyle,ViewStyle,TextProps,DimensionValue} from 'react-native'
import { createStyleSheet,useStyles } from 'react-native-unistyles';
import { debounce } from '../../utils/debounce';
import Animated,{AnimatedProps} from 'react-native-reanimated';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Text from '@/modules/text/src';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton)

type ButtonProps = BaseButtonProps & AnimatedProps<object>  & {
    onPress?: () => void;
    label? : string | number | undefined;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    textProps?:TextProps;
    debounceDelay?:number;
    borderRadius?:number;
    isShadow?:boolean;
    lightColor?:string;
    darkColor?:string;
    icon?: React.ComponentProps<typeof FontAwesome>['name'];
    
}

export default function Button({
  onPress,
  label,
  style,
  labelStyle,
  textProps,
  debounceDelay = 1000,
  borderRadius = 5,
  isShadow = true,
  icon,
  lightColor,
  darkColor,
  ...otherProps
}:ButtonProps){

  const { styles,theme } = useStyles(stylesheet)

  // 防抖
  const onPressDebounce = React.useCallback(() => {
      onPress && onPress();
    }, [onPress]);

  const shadowStyle = {
      //阴影
      shadowColor:'#000',
      shadowOffset : {
          width:0,
          height:2,
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5,
  }

  return(
      <AnimatedRectButton 
          {...otherProps}
          onPress={debounce(onPressDebounce, debounceDelay, true)}
          style={[styles.buttonView,{borderRadius},style,isShadow && shadowStyle,]}>
          {
              icon &&  <FontAwesome size={24} color={'#fff'} name={icon} style={styles.buttonIcon(label)}/>   
          }    
          <Text style={[styles.buttonTitle,labelStyle]} {...textProps}>
              {label}
          </Text>
      </AnimatedRectButton>
  )

}

const stylesheet = createStyleSheet(theme=>({
  buttonView:{
      backgroundColor:theme.colors.buttonColor,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      minHeight:50,
      minWidth:100
  },
  buttonTitle:{
      color:theme.colors.buttonLable,
      fontWeight:'bold',
      textAlign:'center',
      fontSize:{
          'xs':16,
      }
  },
  buttonIcon:(label:any)=>({
      marginRight:label? 5 :0
  })
}))
