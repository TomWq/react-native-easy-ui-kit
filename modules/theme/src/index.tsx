/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:11:26
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 16:54:36
 * @FilePath     : /react-native-easy-ui-kit/modules/theme/src/index.tsx
 * @Description  : 切换主题
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */

import Storage from '../../storage'
import { UnistylesRuntime } from "react-native-unistyles"

function toggleTheme(){
  if(UnistylesRuntime.themeName === 'dark'){
    UnistylesRuntime.setTheme('light')
    Storage.setItem('theme','light')
  }else{
    UnistylesRuntime.setTheme('dark')
    Storage.setItem('theme','dark')
  }
}

export default toggleTheme
