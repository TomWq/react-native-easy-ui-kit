// import {MMKV} from 'react-native-mmkv';

import AsyncStorage from '@react-native-async-storage/async-storage';

// const Storage = new MMKV();

/**
 * @description: zustand的state存储中间件
 */
export const MiddlewareStorage = {
  setItem: async (name, value) => {
    return await AsyncStorage.setItem(name, value);
  },
  getItem: async name => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async name => {
    return await AsyncStorage.removeItem(name);
  }
};
export default AsyncStorage;

//   export default Storage;
//# sourceMappingURL=index.js.map