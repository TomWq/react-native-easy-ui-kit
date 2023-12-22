/*
 * @Author       : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @Date         : 1985-10-26 16:15:00
 * @LastEditors  : 尚博信_王强 wangqiang03@sunboxsoft.com
 * @LastEditTime : 2023-12-21 09:06:05
 * @FilePath     : /react-native-easy-ui-kit/app/_layout.tsx
 * @Description  : 
 * 
 * Copyright (c) 2023 by 尚博信_王强, All Rights Reserved. 
 */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import '@/modules/style'
import {Storage,RootSiblingParent} from '@/modules'
import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'expo-router/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {UnistylesRuntime, useInitialTheme, useStyles} from 'react-native-unistyles'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useInitialTheme('dark')
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const {styles} = useStyles()

  useEffect(()=>{
    // Storage.getItem('theme').then(res=>{
    //   if(res){
    //     UnistylesRuntime.setTheme(res)
    //   }
    // })
   
  },[])

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <ThemeProvider value={UnistylesRuntime.themeName === 'dark' ? DarkTheme : DefaultTheme}>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="(drawer)" options={{
            headerShown:false
          }}/>  
          <Stack.Screen name="image-detail" options={{
            animation:'fade',
            presentation:'transparentModal',
            headerTransparent:true,
            title:''
          }}/>
        </Stack>
        </RootSiblingParent>
        <StatusBar style={UnistylesRuntime.themeName === 'dark' ? 'light':'dark'} animated/>
      </ThemeProvider>
    </GestureHandlerRootView>
    
  );
}
