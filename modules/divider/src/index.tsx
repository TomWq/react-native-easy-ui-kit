/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:55:27
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-19 14:50:56
 * @FilePath     : /react-native-easy-ui-kit/modules/divider/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import View from '../../view'
import {StyleSheet, ViewStyle} from 'react-native'
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