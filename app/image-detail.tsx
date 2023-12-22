/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-20 15:41:54
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-21 11:36:08
 * @FilePath     : /react-native-easy-ui-kit/app/image-detail.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Image, View ,Text } from '@/modules'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Animated ,{FadeIn,useSharedValue,useAnimatedStyle,withTiming,interpolate, Extrapolation,interpolateColor, runOnJS}from 'react-native-reanimated'
import {GestureDetector,Gesture,ScrollView} from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import PagerView from 'react-native-pager-view'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

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

function ImageDetail() {

    const {index,tag} = useLocalSearchParams<{index:string,tag:string}>()
    const {styles} = useStyles(stylesheet)
    const scale = useSharedValue(1)
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const savelateX = useSharedValue(0)
    const translateY = useSharedValue(0);
    const savetranslateY = useSharedValue(0)
    const navigation = useNavigation()
    const [initPage,setInitPage] = React.useState<number>(Number(index)+1)
    // const [zoomScale, setZoomScale] = useState(1);

    //index是string类型的 '0' '1' '2 如何转换成number类型的 0 1 2
    // const index = Number(index)
 

    const gesture = Gesture.Pinch()
        .onUpdate((e)=>{
            scale.value = savedScale.value * e.scale;
        }).onEnd(()=>{
            savedScale.value = scale.value;
        })

    const pan = Gesture.Pan()
        .onBegin(()=>{
            console.log('滑动开始')
        }).onUpdate((e)=>{
            // translateX.value = savelateX.value +  e.translationX
            if( e.translationY>0){
                translateY.value =  e.translationY
            }
          
           console.log(translateY.value)
        }).onEnd(()=>{
            console.log('滑动结束')
            // savelateX.value = translateX.value
            if(translateY.value > 250){
                //返回上个界面
                runOnJS(navigation.goBack)()
            }else{
                translateY.value = withTiming(0)
                // savetranslateY.value = translateY.value
            }
        })

    const composed = Gesture.Race(pan, gesture);    
     
    const imageStyle = useAnimatedStyle(()=>{
            return{
                transform:[
                    {
                    scale:interpolate(translateY.value,[0,500],[1,0],Extrapolation.EXTEND)
                    },
                    // {
                    //   translateX:translateX.value
                    // },
                    {
                     translateY:translateY.value
                    }
                ],
                borderRadius:interpolate(translateY.value,[0,100],[0,10],Extrapolation.CLAMP)
            }
    })

    const bgStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:interpolateColor(translateY.value,[0,500],['black','transparent'])
        }
    })


    return(
    <Animated.View  style={[styles.container,bgStyle]}>
     <GestureDetector gesture={composed}>
        <AnimatedPagerView 
            style={{flex:1}} 
            initialPage={Number(index)} 
            scrollEnabled={false}
            onPageSelected={(e)=>{
                console.log('页面切换',e.nativeEvent.position)
                setInitPage(e.nativeEvent.position+1)
            }}>
                {
                    image_array.map((item,key)=>{
                        return(
                       
                        <AnimatedImage
                            key={key}
                            // entering={FadeIn.duration(500)}
                                style={[{
                                    width:'100%',
                                    height:'100%'
                                },imageStyle]}
                                resizeMode="contain"
                                source={{
                                    uri:item
                                }}
                                onError={() => {
                                    console.log('加载失败')
                                }}
                        />
                           
                        )
                    })
                }
               
            </AnimatedPagerView>
            </GestureDetector>
            <StatusBar style='light'/>
                <View style={styles.pageView}>
                    <Text style={styles.pageTitle}>{initPage}</Text>
                    <Text style={styles.pageTitle}> / </Text>
                    <Text style={styles.pageTitle}>{image_array.length}</Text>
                </View>
            </Animated.View>
    )
}

const stylesheet = createStyleSheet(theme=>({
    container:{
        flex:1,
        backgroundColor:theme.colors.card,
    } ,
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageView:{
        position:'absolute',
        right:0,
        bottom:0,
        width:'100%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colors.transparent,
        flexDirection:'row'
    },
    pageTitle:{
        fontSize:16,
        color:'#ffffff'
    }
}))

export default ImageDetail

