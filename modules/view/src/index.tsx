/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:57:50
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 16:00:55
 * @FilePath     : /react-native-easy-ui-kit/modules/view/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */

import {View as DefaultView,ViewProps } from 'react-native'
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

