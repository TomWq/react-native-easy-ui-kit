/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:58:13
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 18:18:33
 * @FilePath     : /react-native-easy-ui-kit/modules/style/src/index.ts
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import { UnistylesRegistry } from 'react-native-unistyles'
import { breakpoints } from './breakpoints'
import { lightTheme, darkTheme } from './theme'

type AppBreakpoints = typeof breakpoints
type AppThemes = {
  light: typeof lightTheme,
  dark: typeof darkTheme
}

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}


UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true
  })

  export {
    lightTheme,
    darkTheme
  }
