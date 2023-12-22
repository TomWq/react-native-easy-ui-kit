import React from 'react'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'
import Animated, { useAnimatedStyle,useSharedValue, withTiming } from 'react-native-reanimated'
import type { ColorValue, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from '@expo/vector-icons/AntDesign'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

type CheckboxProps = {
  size?:number
  style?: ViewStyle 
  checked?:boolean | undefined
  checkColor?:ColorValue | undefined
  onValueChange?: ((value: boolean) => Promise<void> | void) | null | undefined;
}

function CheckboxView(props:CheckboxProps) {

  const {styles} = useStyles(stylesheet)
  const {size,style,checked,checkColor,onValueChange} = props
  const scaledValue = useSharedValue(checked? 1: 0 )

  const bgStyle = {
      width:size || 30,
      height:size || 30,
      borderRadius: style?.borderRadius || 5,
      borderColor : style?.borderColor ||'black',
      borderWidth: style?.borderWidth || 1,
      backgroundColor: style?.backgroundColor || '#FFF',
      justifyContent:'center',
      alignItems:'center'
  }

  const onChange = () =>{
     if(checked){
        scaledValue.value = withTiming(0,{duration:200})
     }else{
        scaledValue.value = withTiming(1,{duration:200})
     }
     onValueChange && onValueChange(!checked)
  }

  return (
    
       <TouchableOpacity style={[styles.container,bgStyle]} onPress={()=>onChange()} activeOpacity={1}>
        {
          checked && <AnimatedIcon name='check' size={size ? size / 1.5 : 20 } color={checkColor || 'black'}/>
        }
       </TouchableOpacity>
    
  )
}

const stylesheet = createStyleSheet(theme=>({
  container: {
    
  },
}))

export default CheckboxView