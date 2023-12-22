/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:06:49
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 19:58:43
 * @FilePath     : /react-native-easy-ui-kit/modules/activityIndicator/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */

import {ActivityIndicator as RNActivityIndicator,Platform,ActivityIndicatorProps} from 'react-native'
import MaterialIndicator, { MaterialIndicatorProps } from './MaterialIndicator'

type Props = ActivityIndicatorProps & MaterialIndicatorProps

function ActivityIndicator(props:Props){
    if(Platform.OS ==='web'){
        return <RNActivityIndicator {...props}/>
    }
    return <MaterialIndicator {...props}/>
}

export default ActivityIndicator

