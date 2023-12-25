/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-20 15:26:21
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-25 10:10:51
 * @FilePath     : /react-native-easy-ui-kit/app/(drawer)/image.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import { Button, Image, View,ScreenWidth } from "@/modules";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import {TouchableOpacity,} from 'react-native'
import Animated from "react-native-reanimated";
import { createStyleSheet, useStyles } from 'react-native-unistyles'

const image_array = [
    'https://img0.baidu.com/it/u=2938224650,3479501006&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://ww2.sinaimg.cn/mw690/84086b80gy1hku8v16ocrj24tm37ru0x.jpg',
    'https://img0.baidu.com/it/u=957291073,3063274293&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=942',
    'https://img0.baidu.com/it/u=2938224650,3479501006&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://ww2.sinaimg.cn/mw690/84086b80gy1hku8v16ocrj24tm37ru0x.jpg',
    'https://img0.baidu.com/it/u=957291073,3063274293&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=942',
    'https://img0.baidu.com/it/u=2938224650,3479501006&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
    'https://ww2.sinaimg.cn/mw690/84086b80gy1hku8v16ocrj24tm37ru0x.jpg',
    'https://img0.baidu.com/it/u=957291073,3063274293&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=942',
]


const AnimatedImage = Animated.createAnimatedComponent(Image)

const getRandomSize = function () {
    const min = 400;
    const max = 800;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
 
const images = new Array(10)
  .fill(0)
  .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

function ImageView(){

    const { styles,theme } = useStyles(stylesheet)

    const navigation = useNavigation()


    return (
        <View style={{flex:1}}>

            <View style={styles.imageView}>
            {
        image_array.map((item,index)=>{
            return(
                <TouchableOpacity  key={index+''} onPress={()=>{
                    //@ts-ignore
                    navigation.navigate('image-detail',{index:index,tag:index+'',images:image_array})
                    // router.push({
                    //     pathname:'/image-detail',
                    //     params:{
                    //         index:index,
                    //         tag:index+'',
                    //         images:image_array
                    //     }
                    // })
                }}>
            <AnimatedImage
                style={styles.image}
                sharedTransitionTag={index+''}
                source={{
                    uri:item
                }}
                // resizeMode="contain"
                onLoadStart={() => {
                    console.log('load start')
                }}
                onLoadEnd={() => {
                    console.log('load end')
                }}
                onError={() => {
                    console.log('error')
                }}
                onLoad={() => {
                    console.log('load')
                }}
                onProgress={(event) => {
                    console.log('progress',event)
                }}
            />
            </TouchableOpacity>
            )
        })
    }
            </View>
        </View>
    )
    
    
}

const stylesheet = createStyleSheet(theme=>({
    imageView:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        gap:10,
        justifyContent:'center',
        paddingTop:10,
        // paddingLeft:5,
        // paddingRight:5
    },
    image:{
        width:ScreenWidth/3-15,
        height:ScreenWidth/3-15,
        borderRadius:5
    }
}))

export default ImageView