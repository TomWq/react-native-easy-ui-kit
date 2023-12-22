/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 16:56:45
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 18:17:38
 * @FilePath     : /react-native-easy-ui-kit/app/Toast.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {View,Text,Toast,Button} from '@/modules'
import { FadeIn, LayoutAnimationConfig } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles'

function ToastView(){

    const  {styles} = useStyles(stylesheet)

    return(
        <View style={styles.container}>
             <Button 
                label={'居中弹出的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                        text: '居中弹出的Toast',
                        position:'center'
                })
                }}/>
             <Button 
                label={'底部弹出的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '底部弹出的Toast',
                    position:'bottom'
                })
            }}/>
            <Button 
                label={'顶部弹出的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '顶部弹出的Toast',
                    position:'top'
                })
            }}/>
             <Button 
                label={'短时间的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '顶部弹出的Toast',
                    position:'center',
                    duration:1000
                })
            }}/>
             <Button 
                label={'成功的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '成功的Toast',
                    position:'center',
                    duration:1000,
                    type:'success',
                })
            }}/>
             <Button 
                label={'失败的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '失败的Toast',
                    position:'center',
                    duration:1000,
                    type:'error',
                })
            }}/>
            <Button 
                label={'带警告的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '带警告的Toast',
                    position:'center',
                    duration:1000,
                    type:'warning',
                })
            }}/>
             <Button 
                label={'带标记的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '带标记的Toast',
                    position:'center',
                    duration:1000,
                    type:'info',
                })
            }}/>
             <Button 
                label={'内容特别多的Toast'}
                entering={FadeIn.duration(1500)}
                style={styles.button}
                onPress={()=>{
                Toast.show({
                    text: '我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容,我是一顿内容',
                    position:'center',
                    duration:1000,
                })
            }}/>
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
    }
}))

export default ToastView