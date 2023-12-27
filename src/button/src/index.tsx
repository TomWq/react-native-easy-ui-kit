
import React from 'react'
import {RectButton} from 'react-native-gesture-handler'
import type {BaseButtonProps} from 'react-native-gesture-handler'
import type { StyleProp ,TextStyle,ViewStyle,TextProps} from 'react-native'
import { createStyleSheet,useStyles } from 'react-native-unistyles';
import { debounce } from '../../utils/debounce';
import Animated from 'react-native-reanimated';
import type {AnimatedProps} from 'react-native-reanimated'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Text from '../../text';

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
  ...otherProps
}:ButtonProps){

  const { styles } = useStyles(stylesheet)

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
