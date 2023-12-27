import React from 'react'
import {Text as DefaultText} from 'react-native'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'
import type {TextProps} from 'react-native'
function Text(props:TextProps){

  const stylesheet = createStyleSheet(theme=>({
    container:{
      color:theme.colors.text
    }
  }))

  const {styles} = useStyles(stylesheet)

  const {style, ...otherProps} = props

  return <DefaultText style={[styles.container,style]} {...otherProps}/>

}


export default Text

