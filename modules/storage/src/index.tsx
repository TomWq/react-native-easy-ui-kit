/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 13:15:05
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 15:10:55
 * @FilePath     : /react-native-easy-ui-kit/modules/storage/src/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
// import {MMKV} from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Storage = new MMKV();

/**
 * @description: zustand的state存储中间件
 */
export const MiddlewareStorage: StateStorage = {
    setItem: async(name: string, value: string) => {
       return await AsyncStorage.setItem(name, value)
    },
    getItem: async(name: string) => {
        const value =  await AsyncStorage.getItem(name)
        return value ?? null
    },
    removeItem: async(name: string) => {
        return await AsyncStorage.removeItem(name)
    }
  }


  export default AsyncStorage

//   export default Storage;