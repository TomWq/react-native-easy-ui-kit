/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:58:00
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 17:26:42
 * @FilePath     : /react-native-easy-ui-kit/modules/style/src/theme.ts
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const sharedColors = {
  barbie: '#ff9ff3',
  oak: '#1dd1a1',
  sky: '#48dbfb',
  fog: '#c8d6e5',
  aloes: '#00d2d3',
  blood: '#ff6b6b',
  transparent:'transparent',
  toastBg: DarkTheme.colors.card,
}

export const lightTheme = {
  colors: {
      ...sharedColors,
      ...DefaultTheme.colors,
      isDark:false,
      typography: '#000000',
      accent: sharedColors.blood,
      tint:'#2f95dc',
      buttonColor:'#2f95dc',
      buttonLable:'#FFFFFF'
     
  }
  // add any keys/functions/objects/arrays you want!
}

export const darkTheme = {
  colors: {
      ...sharedColors,
      ...DarkTheme.colors,
      isDark:true,
      typography: '#ffffff',
      accent: sharedColors.barbie,
      tint: '#ffffff',
      buttonColor:DarkTheme.colors.card,
      buttonLable:'#FFFFFF'
  }
  // add any keys/functions/objects/arrays you want!
}

export const premiumTheme = {
  colors: {
      ...sharedColors,
      backgroundColor: sharedColors.barbie,
      typography: '#76278f',
      accent: '#000000'
  }
  // add any keys/functions/objects/arrays you want!
}
