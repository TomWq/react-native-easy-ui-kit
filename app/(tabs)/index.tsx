/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 1985-10-26 16:15:00
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-18 16:54:10
 * @FilePath     : /react-native-easy-ui-kit/app/(tabs)/index.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import React,{useEffect} from 'react'
import { StyleSheet ,Button} from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import {Text,View,Card,ToggleTheme} from '@/modules'

import { createStyleSheet,UnistylesRuntime ,useStyles} from 'react-native-unistyles'


export default function TabOneScreen() {

 const {styles} = useStyles(stylesheet)


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator}/>
      <Button title={'切换主题'} onPress={()=>{
          ToggleTheme()
      }}/>
      <Text>配色方案:{UnistylesRuntime.themeName}</Text>
      <Card style={styles.card} onPress={()=>{
       
      }}>
        <Text>123</Text>
      </Card>
    </View>
  );
}

const stylesheet = createStyleSheet(theme=>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:theme.colors.background
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card:{
    width:300,
    height:200,
   
  }
}));
