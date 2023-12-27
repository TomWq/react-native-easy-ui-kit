import React from 'react'
import View from '../../view'
import {StyleSheet} from 'react-native'
import type {ViewStyle} from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const pixelWidth: number = StyleSheet.hairlineWidth

type DividerProps = {
  style?: ViewStyle
}

function Divider(props:DividerProps) {

  const {styles} = useStyles(stylesheet)

  return <View style={[styles.container,props.style]}/>
}

const stylesheet = createStyleSheet(theme=>({
  container:{
    height:pixelWidth,
    backgroundColor:theme.colors.border,
    width:'95%'
  }
}))

export default Divider
