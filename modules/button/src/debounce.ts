/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-18 17:17:21
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 17:17:28
 * @FilePath     : /react-native-easy-ui-kit/modules/button/src/debounce.ts
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
export function debounce(func: (text?: string) => void, wait: number, immediate: boolean): () => void {
    let timeout: NodeJS.Timeout | null;
  
    return function (this: any, ...args: []) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  
      if (callNow) func.apply(context, args);
    };
  }
  