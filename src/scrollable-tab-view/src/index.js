import React from 'react'
import { Dimensions,
  View,
  Animated,
  Platform,
  StyleSheet,
}
from 'react-native'
import {ViewPropTypes} from 'deprecated-react-native-prop-types'
import PropTypes from 'prop-types'
import ViewPager from 'react-native-pager-view'
import DefaultTabBar from './DefaultTabBar'
import ScrollableTabBar from './ScrollableTabBar'
import SceneComponent from './SceneComponent'

const containerWidth = Dimensions.get('window').width;

const AnimatedViewPagerAndroid = Platform.OS === 'android' ?
  Animated.createAnimatedComponent(ViewPager) :
  undefined;

class ScrollableTabView extends React.Component {

    static propTypes = {
      tabBarPosition: PropTypes.oneOf(['top', 'bottom', 'overlayTop', 'overlayBottom', ]),
      initialPage: PropTypes.number,
      page: PropTypes.number,
      onChangeTab: PropTypes.func,
      onScroll: PropTypes.func,
      renderTabBar: PropTypes.any,
      tabBarUnderlineStyle:ViewPropTypes.style,
      tabUnderlineBackgroundColor: PropTypes.string,
      tabUnderlineWidth: PropTypes.number,
      tabBarBackgroundColor: PropTypes.string,
      tabBarActiveTextColor: PropTypes.string,
      tabBarInactiveTextColor: PropTypes.string,
      tabBarTextStyle: ViewPropTypes.style,
      style: ViewPropTypes.style,
      contentProps: PropTypes.object,
      scrollWithoutAnimation: PropTypes.bool,
      locked: PropTypes.bool,
      prerenderingSiblingsNumber: PropTypes.number,
  
    }

    static defaultProps = {
      tabBarPosition: 'top',
      initialPage: 0,
      page: -1,
      onChangeTab: () => {},
      onScroll: () => {},
      contentProps: {},
      scrollWithoutAnimation: false,
      locked: false,
      prerenderingSiblingsNumber: 0,
    }

    static DefaultTabBar = DefaultTabBar;
    static ScrollableTabBar = ScrollableTabBar; 

    constructor(props) {
      super(props);

    
      let scrollValue;
      let scrollXIOS;
      let positionAndroid;
      let offsetAndroid;
  
      if (Platform.OS === 'ios') {
        scrollXIOS = new Animated.Value(this.props.initialPage * containerWidth);
        const containerWidthAnimatedValue = new Animated.Value(containerWidth);
        containerWidthAnimatedValue.__makeNative();
        scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue);
  
        const callListeners = this._polyfillAnimatedValue(scrollValue);
        scrollXIOS.addListener(({ value }) => callListeners(value / containerWidth));
      } else {
        positionAndroid = new Animated.Value(this.props.initialPage);
        offsetAndroid = new Animated.Value(0);
        scrollValue = Animated.add(positionAndroid, offsetAndroid);
  
        const callListeners = this._polyfillAnimatedValue(scrollValue);
        let positionAndroidValue = this.props.initialPage;
        let offsetAndroidValue = 0;
        positionAndroid.addListener(({ value }) => {
          positionAndroidValue = value;
          callListeners(positionAndroidValue + offsetAndroidValue);
        });
        offsetAndroid.addListener(({ value }) => {
          offsetAndroidValue = value;
          callListeners(positionAndroidValue + offsetAndroidValue);
        });
      }

  

      this.state = {
        currentPage: this.props.initialPage,
        scrollValue,
        scrollXIOS,
        positionAndroid,
        offsetAndroid,
        scrollOnMountCalled: false,
        tabWillChangeWithoutGesture: false,
        sceneKeys: this.newSceneKeys({ currentPage: this.props.initialPage }),
      };

      this.onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: this.state.scrollXIOS, }, }, }, ],
        { useNativeDriver: true, listener: (e) => this._onScroll(e) }
      );
    }

    componentDidUpdate(prevProps) {
      if (this.props.children !== prevProps.children) {
        this.updateSceneKeys({
          page: this.state.currentPage,
          children: this.props.children,
        });
      }
    
      if (this.props.page >= 0 && this.props.page !== this.state.currentPage) {
        // 使用箭头函数确保在正确的上下文中调用
        this.goToPage(this.props.page);
      }
    }
  
    componentWillUnmount() {
      if (Platform.OS === 'ios') {
        this.state.scrollXIOS.removeAllListeners();
      } else {
        this.state.positionAndroid.removeAllListeners();
        this.state.offsetAndroid.removeAllListeners();
      }
    }

    goToPage =(pageNumber) =>{
      if (Platform.OS === 'ios') {
        const offset = pageNumber * containerWidth;
        if (this.scrollView) {
          this.scrollView.scrollTo({x: offset, y: 0, animated: !this.props.scrollWithoutAnimation, });
        }
      } else {
        if (this.scrollView) {
          this.setState({
            tabWillChangeWithoutGesture:true
          })
          // this.tabWillChangeWithoutGesture = true;
          if (this.props.scrollWithoutAnimation) {
            this.scrollView.setPageWithoutAnimation(pageNumber);
          } else {
            this.scrollView.setPage(pageNumber);
          }
        }
      }
  
      const currentPage = this.state.currentPage
      this.updateSceneKeys({
        page: pageNumber,
        callback: this._onChangeTab.bind(this, currentPage, pageNumber),
      });
    }

    renderTabBar =(props)=> {
      if (this.props.renderTabBar === false) {
        return null;
      } else if (this.props.renderTabBar) {
        return React.cloneElement(this.props.renderTabBar(props), props);
      } else {
        return <DefaultTabBar {...props} />;
      }
    }

    updateSceneKeys =({ page, children = this.props.children, callback = () => {}, })=> {
      let newKeys = this.newSceneKeys({ previousKeys: this.state.sceneKeys, currentPage: page, children, });
      this.setState({currentPage: page, sceneKeys: newKeys, }, callback);
    }

    newSceneKeys = ({ previousKeys = [], currentPage = 0, children = this.props.children, }) => {
      let newKeys = [];
      this._children(children).forEach((child, idx) => {
        let key = this._makeSceneKey(child, idx);
        if (this._keyExists(previousKeys, key) ||
          this._shouldRenderSceneKey(idx, currentPage)) {
          newKeys.push(key);
        }
      });
      return newKeys;
    }

    _polyfillAnimatedValue = (animatedValue)=> {

      const listeners = new Set();
      const addListener = (listener) => {
        listeners.add(listener);
      };
  
      const removeListener = (listener) => {
        listeners.delete(listener);
      };
  
      const removeAllListeners = () => {
        listeners.clear();
      };
  
      animatedValue.addListener = addListener;
      animatedValue.removeListener = removeListener;
      animatedValue.removeAllListeners = removeAllListeners;
  
      return (value) => listeners.forEach(listener => listener({ value, }));
    }
  
    _shouldRenderSceneKey = (idx, currentPageKey) =>{
      let numOfSibling = this.props.prerenderingSiblingsNumber;
      return (idx < (currentPageKey + numOfSibling + 1) &&
        idx > (currentPageKey - numOfSibling - 1));
    }

    _keyExists =(sceneKeys, key)=> {
      return sceneKeys.find((sceneKey) => key === sceneKey);
    }

    _makeSceneKey =(child, idx) =>{
      return child.props.tabLabel + '_' + idx;
    }

    renderScrollableContent =() =>{
      if (Platform.OS !== 'android') {
        const scenes = this._composeScenes();
        return <Animated.ScrollView
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          contentOffset={{ x: this.props.initialPage * containerWidth, }}
          ref={(scrollView) => { this.scrollView = scrollView; }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scrollXIOS, }, }, },],
            { useNativeDriver: true, listener: this._onScroll }
          )}
          onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
          onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
          scrollEventThrottle={16}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!this.props.locked}
          directionalLockEnabled
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          {...this.props.contentProps}
        >
            {scenes}
        </Animated.ScrollView>;
      } else {
        const scenes = this._composeScenes();
        return <AnimatedViewPagerAndroid
          key={this._children().length}
          style={styles.scrollableContentAndroid}
          initialPage={this.props.initialPage}
          onPageSelected={this._updateSelectedPage}
          keyboardDismissMode="on-drag"
          scrollEnabled={!this.props.locked}
          onPageScroll={Animated.event(
            [{
              nativeEvent: {
                position: this.state.positionAndroid,
                offset: this.state.offsetAndroid,
              },
            }, ],
            {
              useNativeDriver: true,
              listener: this._onScroll,
            },
          )}
          ref={(scrollView) => { this.scrollView = scrollView; }}
          {...this.props.contentProps}
        >
          {scenes}
        </AnimatedViewPagerAndroid>
      }
    }

    _composeScenes =() =>{
      return this._children().map((child, idx) => {
        let key = this._makeSceneKey(child, idx);
        return <SceneComponent
          key={child.key}
          shouldUpdated={this._shouldRenderSceneKey(idx, this.state.currentPage)}
          style={{width: containerWidth, }}
        >
          {this._keyExists(this.state.sceneKeys, key) ? child : <View tabLabel={child.props.tabLabel}/>}
        </SceneComponent>;
      });
    }

    _onMomentumScrollBeginAndEnd = (e) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const page = Math.round(offsetX / containerWidth);
      if (this.state.currentPage !== page) {
        this._updateSelectedPage(page);
      }
    };

    _updateSelectedPage =(nextPage) =>{
      let localNextPage = nextPage;
      if (typeof localNextPage === 'object') {
        localNextPage = nextPage.nativeEvent.position;
      }
    
      const currentPage = this.state.currentPage;
      !this.state.tabWillChangeWithoutGesture && this.updateSceneKeys({
        page: localNextPage,
        callback: this._onChangeTab.bind(this, currentPage, localNextPage),
      });
      this.setState({
        tabWillChangeWithoutGesture: false,
      });
    }
  
    _onChangeTab =(prevPage, currentPage)=> {
      this.props.onChangeTab({
        i: currentPage,
        ref: this._children()[currentPage],
        from: prevPage,
      });
    }
  
    _onScroll =(e) =>{
      if (Platform.OS === 'ios') {
        const offsetX = e.nativeEvent.contentOffset.x;
        if (offsetX === 0 && !this.state.scrollOnMountCalled) {
          this.setState({
            scrollOnMountCalled:true
          })
        } else {
          this.props.onScroll(offsetX / containerWidth);
        }
      } else {
        const { position, offset } = e.nativeEvent;
        this.props.onScroll(position + offset);
      }
    }

  
    _handleLayout =(e) =>{
      const { width, } = e.nativeEvent.layout;
  
      if (!width || width <= 0 || Math.round(width) === Math.round(containerWidth)) {
        return;
      }
  
      let scrollValue;
      if (Platform.OS === 'ios') {
        const containerWidthAnimatedValue = new Animated.Value(width);
        // Need to call __makeNative manually to avoid a native animated bug. See
        // https://github.com/facebook/react-native/pull/14435
        containerWidthAnimatedValue.__makeNative();
        scrollValue = Animated.divide(this.state.scrollXIOS, containerWidthAnimatedValue);
      }
  
      this.setState({ containerWidth: width, scrollValue, });
  
      this.requestAnimationFrame(() => {
        this.goToPage(this.state.currentPage);
      });
    }

  
    _children =(children = this.props.children) =>{
      return React.Children.map(children, (child) => child);
    }

    render() {
      let overlayTabs = (this.props.tabBarPosition === 'overlayTop' || this.props.tabBarPosition === 'overlayBottom');
      let tabBarProps = {
        goToPage: this.goToPage,
        tabs: this._children().map((child) => child.props.tabLabel),
        activeTab: this.state.currentPage,
        scrollValue: this.state.scrollValue,
        containerWidth: containerWidth,
      };
  
      if (this.props.tabBarBackgroundColor) {
        tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
      }
      if (this.props.tabBarActiveTextColor) {
        tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
      }
      if (this.props.tabBarInactiveTextColor) {
        tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
      }
      if (this.props.tabBarTextStyle) {
        tabBarProps.textStyle = this.props.tabBarTextStyle;
      }
      
      if (this.props.tabBarUnderlineStyle) {
        console.log('tabBarUnderlineStyle',this.props.tabBarUnderlineStyle)
        tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
      }

      if (overlayTabs) {
        tabBarProps.style = {
          position: 'absolute',
          left: 0,
          right: 0,
          [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0,
        };
      }
  
      return <View style={[styles.container, this.props.style, ]} onLayout={this._handleLayout}>
        {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
        {this.renderScrollableContent()}
      </View>;
    }

  }



module.exports = ScrollableTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentAndroid: {
    flex: 1,
  },
});
