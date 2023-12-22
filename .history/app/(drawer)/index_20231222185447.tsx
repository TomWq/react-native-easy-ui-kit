/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-20 16:05:53
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-22 18:06:29
 * @FilePath     : /react-native-easy-ui-kit/app/(drawer)/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {Button} from 'react-native'
import switchTheme from 'react-native-theme-switch-animation';
import { View,Text,ToggleTheme } from '@/modules'
import { UnistylesRuntime } from "react-native-unistyles"
import { createStyleSheet ,useStyles} from 'react-native-unistyles'

export default function Index() {


    const {theme} = useStyles()

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>首页</Text>
            <Button title={'切换主题'} onPress={(e) => {
              //@ts-ignore
              e.currentTarget?.measure((x1, y1, width, height, px, py) => {
                switchTheme({
                  switchThemeFunction: () => {
                    UnistylesRuntime.setTheme(theme.colors.isDark ? 'light' : 'dark')
                  },
                  animationConfig: {
                    type: theme.colors.isDark ? 'inverted-circular' : 'circular',
                    duration: 1500,
                    startingPoint: {
                      cy: py + height / 2,
                      cx: px + width / 2,
                    }
                  },
                });
              });
            }}
            />
        </View>
    )
}