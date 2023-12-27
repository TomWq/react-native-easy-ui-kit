import React from 'react'
import {TouchableOpacity ,TouchableNativeFeedback,Platform} from 'react-native'

const Button = (props)=>{
    if(Platform.OS === 'android'){
        return (
            <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
                {...props}>
                {props.children}
             </TouchableNativeFeedback>
        )
    }else{
        return (
            <TouchableOpacity {...props}>
                {props.children}
            </TouchableOpacity>
        )
    }
}

export default Button