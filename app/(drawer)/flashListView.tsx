/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-19 16:00:22
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-20 14:04:14
 * @FilePath     : /react-native-easy-ui-kit/app/flashListView.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React, { useMemo } from 'react'
import { RefreshControl,RefreshControlProps as DefalutRefreshControlProps} from 'react-native'
import { FlashListView, View,Text ,LottiePullToRefreshHeader,DefaultPullToRefreshDarkHeader,Button} from '@/modules'

type RefreshControlType = 'default' | 'lottie' | 'native'

type RefreshControlProps = DefalutRefreshControlProps & {
    type:RefreshControlType
}

function FlashList () {

    const [data, setData] = React.useState(new Array(10).fill(0))
    const [refreshing, setRefreshing] = React.useState(false)
    const [type, setType] = React.useState<RefreshControlType>('default')    

    return(
        <View style={{flex:1}}>
            <Button label={'Lottie刷新'} onPress={() => setType('lottie')}/>
            <Button label={'原生刷新'} onPress={() => setType('default')}/>
            <Button label={'正常刷新'} onPress={() => setType('native')}/>
        <FlashListView
            data = {data}
            renderItem={({item,index}) => (
                <View>
                <Text>{index}</Text>
                </View>
            )}
            estimatedItemSize = {100}
            isLastPage = {true}
            refreshControl={
            <RefreshControlComponent  
                refreshing={refreshing} 
                type={type}
                onRefresh={() => {
                    setRefreshing(true)
                    setData(new Array(50).fill(0))
                    setTimeout(() => {
                        setRefreshing(false)
                    }, 2000)
                }}/>}
        />
        </View>
    )
}

const  RefreshControlComponent = (props:RefreshControlProps) => {

    console.log('type',props.type)

    const refreshControlComponent = useMemo(()=>{
        if(props.type === 'default'){
            return(
                <DefaultPullToRefreshDarkHeader {...props}/>
            )
        }else if(props.type === 'lottie'){
            return(
                <LottiePullToRefreshHeader {...props}/>
            )
        }else if(props.type === 'native'){
           return(
            <RefreshControl {...props}/>
           )
        }else {
            return undefined
        }
    },[props])

    return refreshControlComponent
    
}

export default FlashList

