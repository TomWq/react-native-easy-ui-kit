import React from 'react'
import type {SwitchProps} from 'react-native'
import Animated ,{useAnimatedStyle, useSharedValue,withTiming,interpolateColor} from 'react-native-reanimated'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'

const SWICH_DEFAULT_WIDTH = 60
const SWICH_DEFAULT_HEIGHT = 30
const SWICH_DEFAULT_PADDING = 6


function SwitchView(props:Omit<SwitchProps,'trackColor' |'ios_backgroundColor' | 'onChange' | 'testID'>) {

    const {styles,theme} = useStyles(stylesheet)

    const {thumbColor,disabled,value,onValueChange} = props

    const translateX = useSharedValue(value?0:30)

    const switchStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:translateX.value}],
            backgroundColor:thumbColor || theme.colors.swichThumb
        }
    })

    const switchBaseStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:interpolateColor(translateX.value,[0,30],['#DDDDDD',theme.colors.swichBg]),
        }
    })


    const changeSwichState = () =>{
        if(translateX.value === 0){
            translateX.value = withTiming(30,{duration:200})
        }else{
            translateX.value = withTiming(0,{duration:200})
        }
        onValueChange && onValueChange(!value)
    }

    return (
        <TouchableOpacity onPress={()=>changeSwichState()} activeOpacity={1} disabled={disabled}>
            <Animated.View style={[styles.container,switchBaseStyle]}>
                <Animated.View style={[styles.swichView,switchStyle]}/>
            </Animated.View>
        </TouchableOpacity>
    )
}


const stylesheet = createStyleSheet(theme=>({
    container:{
       minWidth:SWICH_DEFAULT_WIDTH,
       minHeight:SWICH_DEFAULT_HEIGHT,
       borderRadius:SWICH_DEFAULT_HEIGHT,
       backgroundColor:theme.colors.swichBg
    },
    swichView:{
        minWidth:SWICH_DEFAULT_HEIGHT - SWICH_DEFAULT_PADDING,
        minHeight:SWICH_DEFAULT_HEIGHT - SWICH_DEFAULT_PADDING,
        borderRadius:SWICH_DEFAULT_HEIGHT,
        position:'absolute',
        left:SWICH_DEFAULT_PADDING/2,
        top:SWICH_DEFAULT_PADDING/2
    }
}))

export default SwitchView
