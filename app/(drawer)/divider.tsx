/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 16:56:45
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-19 14:55:33
 * @FilePath     : /react-native-easy-ui-kit/app/divider.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {View,Divider} from '@/modules'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

function ActivityIndicatorView(){

    const  {styles} = useStyles(stylesheet)

    return(
        <View style={styles.container}>
            <Divider/>
        </View>
    )
}

const stylesheet = createStyleSheet(theme=>({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}))

export default ActivityIndicatorView