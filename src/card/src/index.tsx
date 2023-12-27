import React from 'react'
import {RectButton,GestureHandlerRootView} from 'react-native-gesture-handler'
import type {BaseButtonProps} from 'react-native-gesture-handler'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'

const stylesheet = createStyleSheet(theme=>({
  container: {
    backgroundColor:theme.colors.card,
    borderRadius:5
  },
}))

type ButtonProps = BaseButtonProps & {
  children: React.ReactNode
}

function Button(props: ButtonProps) {

  const {styles} = useStyles(stylesheet)

  const {style, ...otherProps} = props

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <RectButton style={[styles.container,style]} {...otherProps}/>
    </GestureHandlerRootView>
  )
}
export default Button
