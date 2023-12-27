// import {MMKV} from 'react-native-mmkv';
import  type { StateStorage } from 'zustand/middleware';
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
