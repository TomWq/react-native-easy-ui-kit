
import React from 'react'
import {ActivityIndicator as RNActivityIndicator,Platform} from 'react-native'
import type {ActivityIndicatorProps} from 'react-native'
import MaterialIndicator from './MaterialIndicator'
import type {MaterialIndicatorProps} from './MaterialIndicator'

type Props = ActivityIndicatorProps & MaterialIndicatorProps

function ActivityIndicator(props:Props){
    if(Platform.OS ==='web'){
        return <RNActivityIndicator {...props}/>
    }
    return <MaterialIndicator {...props}/>
}

export default ActivityIndicator

