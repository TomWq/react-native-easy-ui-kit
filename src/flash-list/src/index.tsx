import React from 'react'
import ActivityIndicator from '../../activityIndicator/src';
import View from '../../view';
import Text from '../../text'
import { FlashList} from '@shopify/flash-list';
import type {FlashListProps} from '@shopify/flash-list'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Platform } from 'react-native';
import type {RefreshControlProps} from 'react-native'
import { PullToRefresh } from '@sdcx/pull-to-refresh'

type FlashListViewProps<T> = FlashListProps <T> & {
  isLastPage: boolean
  refreshControl?:React.ReactElement<RefreshControlProps> | undefined;
}

function FlashListView<T>(props:FlashListViewProps<T>){

    const {styles,theme} = useStyles(stylesheet)

    return(
      <View style={styles.container}>

        <FlashList
            {...props}
            data={props.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index) => index+ ''}
            renderItem={props.renderItem}
            onEndReachedThreshold={0.1}
            nestedScrollEnabled
            ListFooterComponent={_ListFooterComponent}
            refreshControl={MyRefreshControl()}
          />
      </View>
    )

    function MyRefreshControl(){
      if(Platform.OS !== 'android'){
        return props.refreshControl
      }else{
        return(
          <PullToRefresh
            style={{ flex: 1 }}
            header={props.refreshControl}
          />
        )
      }
    }




    function _ListFooterComponent() {
      if (!props.isLastPage && props.data && props.data.length > 0) {
        return (
          <View style={styles.footer}>
            <ActivityIndicator color={theme.colors.primary}/>
            <Text>加载中...</Text>
          </View>
        );
      }else{
        return (
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>已加载全部数据</Text>
          </View>
        );
      }
    }

}

export default FlashListView

const stylesheet = createStyleSheet({
  container:{
    flex:1
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:50,
  },
  footerTitle:{
    fontSize:10
  }
})
