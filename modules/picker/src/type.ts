/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 2023-12-21 22:22:34
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-21 22:22:46
 * @FilePath     : /react-native-easy-ui-kit/modules/picker/src/type.ts
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
type TimePicker = {
    title?:string
    pattern?:string
  }
  
  type NormaItem = {
    label?:string
    value?:string
  }
  
  type NormalPicker = {
    title?:string
    array?:NormaItem[]
  }
  
  type City = {
    //省市县
    province?:string
    city?:string
    area?:string
  } 
  
  type LinkItem = {
    label: string;
    value: {
        label: string;
        value: string;
    }[];
  }
  
  type Linkage = {
    title?:string
    array?:LinkItem[]
   
  }

  export type {TimePicker,NormaItem,NormalPicker,City,LinkItem,Linkage}