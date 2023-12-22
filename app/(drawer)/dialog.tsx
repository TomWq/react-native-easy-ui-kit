/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 16:56:45
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-19 14:40:55
 * @FilePath     : /react-native-easy-ui-kit/app/dialog.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import {View,Dialog,Button} from '@/modules'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

function DialogView(){

    const  {styles} = useStyles(stylesheet)

    return(
        <View style={styles.container}>
            <Button label={'弹窗'} onPress={()=>{
                Dialog.show({
                    title:'标题',
                    message:'这是一个消息,这是一个消息,这是一个消息,这是一个消息,这是一个消息,这是一个消息',
                    position:'bottom',
                    // swipeClose:true,
                    buttons:[
                        {
                            text:'取消',
                            onPress:()=>{}
                        },
                        {
                            text:'确认',
                            onPress:()=>{}
                        }
                    ]
                })
            }}
           
            />
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

export default DialogView