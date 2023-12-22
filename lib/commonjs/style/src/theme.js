"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.premiumTheme = exports.lightTheme = exports.darkTheme = void 0;
var _native = require("@react-navigation/native");
/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:58:00
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-22 16:00:12
 * @FilePath     : /react-native-easy-ui-kit/modules/style/src/theme.ts
 * @Description  :
 *
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved.
 */

const sharedColors = {
  barbie: '#ff9ff3',
  oak: '#1dd1a1',
  sky: '#48dbfb',
  fog: '#c8d6e5',
  aloes: '#00d2d3',
  blood: '#ff6b6b',
  transparent: 'transparent',
  toastBg: _native.DarkTheme.colors.card
};
const lightTheme = exports.lightTheme = {
  colors: {
    ...sharedColors,
    ..._native.DefaultTheme.colors,
    isDark: false,
    typography: '#000000',
    accent: sharedColors.blood,
    tint: '#2f95dc',
    buttonColor: '#2f95dc',
    buttonLable: '#FFFFFF',
    refreshColor: '#2f95dc',
    tabBarActiveTextColor: '#2f95dc',
    tabBarBackgroundColor: '#FFFFFF',
    swichBg: '#2f95dc',
    swichThumb: '#FFFFFF'
  }
  // add any keys/functions/objects/arrays you want!
};
const darkTheme = exports.darkTheme = {
  colors: {
    ...sharedColors,
    ..._native.DarkTheme.colors,
    isDark: true,
    typography: '#ffffff',
    accent: sharedColors.barbie,
    tint: '#ffffff',
    buttonColor: _native.DarkTheme.colors.card,
    buttonLable: '#FFFFFF',
    refreshColor: '#FFFFFF',
    tabBarActiveTextColor: '#2f95dc',
    tabBarBackgroundColor: _native.DarkTheme.colors.card,
    swichBg: '#2f95dc',
    swichThumb: '#FFFFFF'
  }
  // add any keys/functions/objects/arrays you want!
};
const premiumTheme = exports.premiumTheme = {
  colors: {
    ...sharedColors,
    backgroundColor: sharedColors.barbie,
    typography: '#76278f',
    accent: '#000000'
  }
  // add any keys/functions/objects/arrays you want!
};
//# sourceMappingURL=theme.js.map