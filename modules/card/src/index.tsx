/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 14:18:30
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 16:10:29
 * @FilePath     : /react-native-easy-ui-kit/modules/card/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import {RectButton,BaseButtonProps,GestureHandlerRootView} from 'react-native-gesture-handler'
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