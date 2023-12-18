/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 12:58:14
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 16:02:11
 * @FilePath     : /react-native-easy-ui-kit/modules/text/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import {Text as DefaultText,TextProps} from 'react-native'
import { createStyleSheet ,useStyles} from 'react-native-unistyles'

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

