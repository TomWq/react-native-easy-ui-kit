import React from 'react'
import {View as DefaultView } from 'react-native'
import type {ViewProps} from 'react-native'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'

function View(props:ViewProps){

  const stylesheet = createStyleSheet(theme=>({
    container:{
      backgroundColor:theme.colors.background
    }
  }))

  const {styles} = useStyles(stylesheet)

  const {style, ...otherProps} = props

  return <DefaultView style={[styles.container,style]} {...otherProps}>

  </DefaultView>
}

export default View

