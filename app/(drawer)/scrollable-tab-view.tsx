import { View ,Text ,ScrollableTabView,TabProps, Button,DefaultTabBar,ScrollableTabBar} from '@/modules'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

interface  TabChildren {
    children?: React.ReactNode;
}

const TabComponent :React.FunctionComponent<TabProps<TabChildren>> = ({children}) => {
    return children
}

type ScrollableTabViewType = 'DefaultTabBar' | 'ScrollableTabBar'

export default function ScrollableTab() {

    const {theme} = useStyles(stylesheet)
    const [tabType, setTabType] = React.useState<ScrollableTabViewType>('ScrollableTabBar')



    return (
        <View style={{flex:1}}>
            <Button label={'DefaultTabBar'} onPress={()=>setTabType('DefaultTabBar')}/>
            <Button label={'ScrollableTabBar'} onPress={()=>setTabType('ScrollableTabBar')}/>

            {
                tabType === 'DefaultTabBar' ? 
                <ScrollableTabView
                tabBarBackgroundColor={theme.colors.tabBarBackgroundColor}
                tabBarActiveTextColor={theme.colors.tabBarActiveTextColor}
                tabBarInactiveTextColor={theme.colors.text}
                tabBarUnderlineStyle={{
                    backgroundColor:'red',
                }}
               >
                   <TabComponent tabLabel={'标题一'}>
                    <Tab1/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题二'}>
                    <Tab2/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题三'}>
                    <Tab3/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题四'}>
                    <Tab3/>
                   </TabComponent>
               </ScrollableTabView>
               : 
               <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor={theme.colors.tabBarBackgroundColor}
                tabBarActiveTextColor={theme.colors.tabBarActiveTextColor}
                tabBarInactiveTextColor={theme.colors.text}
               
               >
                   <TabComponent tabLabel={'标题一'}>
                    <Tab1/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题二'}>
                    <Tab2/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题三'}>
                    <Tab3/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题四'}>
                    <Tab3/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题一'}>
                    <Tab1/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题二'}>
                    <Tab2/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题三'}>
                    <Tab3/>
                   </TabComponent>
                   <TabComponent tabLabel={'标题四'}>
                    <Tab3/>
                   </TabComponent>
               </ScrollableTabView>
            }
        </View>
    )


}

function Tab1() {
    return (
        
        <View style={{backgroundColor:'#fff',flex:1}}>
            <Text>Tab1</Text>
        </View>
    )
}

function Tab2() {
    return (
        <View style={{backgroundColor:'#fff',flex:1}}>
            <Text>Tab2</Text>
        </View>
    )
}

function Tab3() {
    return (
        <View style={{backgroundColor:'#fff',flex:1}}>
            <Text>Tab3</Text>
        </View>
    )
}

const stylesheet = createStyleSheet(theme=>({
    container: {
        flex:1
    }
}))