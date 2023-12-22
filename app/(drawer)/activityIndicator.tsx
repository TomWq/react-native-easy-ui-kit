/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 16:56:45
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 19:59:38
 * @FilePath     : /react-native-easy-ui-kit/app/activityIndicator.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {View,ActivityIndicator} from '@/modules'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

function ActivityIndicatorView(){

    const  {styles} = useStyles(stylesheet)

    return(
        <View style={styles.container}>
            <View style={styles.activityIndicator}>
                <ActivityIndicator/> 
            </View>
        </View>
    )
}

const stylesheet = createStyleSheet(theme=>({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        marginVertical:{
            'xs':10,
            'lg':20
        },
        width:200
    },
    activityIndicator:{
        width:100,
        height:100,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center'
    }
}))

export default ActivityIndicatorView