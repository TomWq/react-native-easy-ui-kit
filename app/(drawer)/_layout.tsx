/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 1985-10-26 16:15:00
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-22 15:29:17
 * @FilePath     : /react-native-easy-ui-kit/app/(drawer)/_layout.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import { Drawer } from 'expo-router/drawer';

export default function RootLayoutNav() {

  return (
        <Drawer>
          <Drawer.Screen name="index" options={{
            title:'首页'
          }}/>
          <Drawer.Screen name="toast" options={{
            title:'Toast'
          }}/>
           <Drawer.Screen name="activityIndicator" options={{
            title:'ActivityIndicator'
          }}/>
            <Drawer.Screen name="dialog" options={{
            title:'Dialog'
          }}/>
           <Drawer.Screen name="divider" options={{
            title:'Divider'
          }}/>
           <Drawer.Screen name="flashListView" options={{
            title:'FlashListView'
          }}/>
           <Drawer.Screen name="scrollable-tab-view" options={{
            title:'ScrollableTabView'
          }}/>
          <Drawer.Screen name="image" options={{
            title:'ImageView'
          }}/>
           <Drawer.Screen name="picker" options={{
            title:'PickerView'
          }}/>
           <Drawer.Screen name="swich" options={{
            title:'SwichView'
          }}/>
          <Drawer.Screen name="checkBox" options={{
            title:'CheckBoxView'
          }}/>
        </Drawer>
       
    
  );
}
