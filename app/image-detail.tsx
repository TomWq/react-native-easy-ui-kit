/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-20 15:41:54
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-25 10:34:12
 * @FilePath     : /react-native-easy-ui-kit/app/image-detail.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React, { useCallback } from 'react'
import { Image, View ,Text,Gallery ,createStyleSheet, useStyles} from '@/modules'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Animated ,{FadeIn,useSharedValue,useAnimatedStyle,withTiming,interpolate, Extrapolation,interpolateColor, runOnJS, FadeInUp, FadeOutUp}from 'react-native-reanimated'
import {GestureDetector,Gesture,ScrollView} from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import PagerView from 'react-native-pager-view'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import { useIsFocused, useRoute } from '@react-navigation/native'
const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)
import {StyleSheet} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Params = {
    index:number,
    tag:number,
    images:string[]
}

function ImageDetail() {

    // const {index,tag,images} = useLocalSearchParams()
    const {styles} = useStyles(stylesheet)
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused();
    const { top, bottom } = useSafeAreaInsets();
    // const [initPage,setInitPage] = React.useState<number>(Number(index))
   const {index,tag,images} = route.params


    const onIndexChange = useCallback(
        (index: number) => {
          isFocused && navigation.setParams({ index });
        },
        [isFocused, navigation.setParams]
      );


    return(
    <Animated.View  style={[styles.container]}>
        <Animated.View
          entering={FadeInUp.duration(250) }
          exiting={FadeOutUp.duration(250)}
          style={[
            styles.toolbar,
            {
              height: top + 60,
              paddingTop: top,
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              {index + 1} / {images.length}
            </Text>
          </View>
        </Animated.View>
            <Gallery
                    data={images}
                    initialIndex={index}
                    doubleTapInterval={150}
                    onIndexChange={onIndexChange}
                    onSwipeToClose={()=>{
                        navigation.goBack()
                    }}
                   
                    numToRender={3}
                    
                />
            <StatusBar style='light'/>
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
    },
    toolbar: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#000000',
        zIndex: 1,
      },
      textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#000000'
      },
      headerText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
      },
}))

export default ImageDetail

