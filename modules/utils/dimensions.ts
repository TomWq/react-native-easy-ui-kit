import {Dimensions,StyleSheet} from 'react-native'

const {width, height} = Dimensions.get('window')

//最小间距
export const PixelWidth: number = StyleSheet.hairlineWidth
//屏幕宽
export const ScreenWidth: number = width
//屏幕高
export const ScreenHeight: number = height