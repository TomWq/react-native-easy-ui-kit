"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _deprecatedReactNativePropTypes = require("deprecated-react-native-prop-types");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactNativePagerView = _interopRequireDefault(require("react-native-pager-view"));
var _DefaultTabBar = _interopRequireDefault(require("./DefaultTabBar"));
var _ScrollableTabBar = _interopRequireDefault(require("./ScrollableTabBar"));
var _SceneComponent = _interopRequireDefault(require("./SceneComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const containerWidth = _reactNative.Dimensions.get('window').width;
const AnimatedViewPagerAndroid = _reactNative.Platform.OS === 'android' ? _reactNative.Animated.createAnimatedComponent(_reactNativePagerView.default) : undefined;
class ScrollableTabView extends _react.default.Component {
  static propTypes = {
    tabBarPosition: _propTypes.default.oneOf(['top', 'bottom', 'overlayTop', 'overlayBottom']),
    initialPage: _propTypes.default.number,
    page: _propTypes.default.number,
    onChangeTab: _propTypes.default.func,
    onScroll: _propTypes.default.func,
    renderTabBar: _propTypes.default.any,
    tabBarUnderlineStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabUnderlineBackgroundColor: _propTypes.default.string,
    tabUnderlineWidth: _propTypes.default.number,
    tabBarBackgroundColor: _propTypes.default.string,
    tabBarActiveTextColor: _propTypes.default.string,
    tabBarInactiveTextColor: _propTypes.default.string,
    tabBarTextStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    style: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    contentProps: _propTypes.default.object,
    scrollWithoutAnimation: _propTypes.default.bool,
    locked: _propTypes.default.bool,
    prerenderingSiblingsNumber: _propTypes.default.number
  };
  static defaultProps = {
    tabBarPosition: 'top',
    initialPage: 0,
    page: -1,
    onChangeTab: () => {},
    onScroll: () => {},
    contentProps: {},
    scrollWithoutAnimation: false,
    locked: false,
    prerenderingSiblingsNumber: 0
  };
  static DefaultTabBar = _DefaultTabBar.default;
  static ScrollableTabBar = _ScrollableTabBar.default;
  constructor(props) {
    super(props);
    let scrollValue;
    let scrollXIOS;
    let positionAndroid;
    let offsetAndroid;
    if (_reactNative.Platform.OS === 'ios') {
      scrollXIOS = new _reactNative.Animated.Value(this.props.initialPage * containerWidth);
      const containerWidthAnimatedValue = new _reactNative.Animated.Value(containerWidth);
      containerWidthAnimatedValue.__makeNative();
      scrollValue = _reactNative.Animated.divide(scrollXIOS, containerWidthAnimatedValue);
      const callListeners = this._polyfillAnimatedValue(scrollValue);
      scrollXIOS.addListener(({
        value
      }) => callListeners(value / containerWidth));
    } else {
      positionAndroid = new _reactNative.Animated.Value(this.props.initialPage);
      offsetAndroid = new _reactNative.Animated.Value(0);
      scrollValue = _reactNative.Animated.add(positionAndroid, offsetAndroid);
      const callListeners = this._polyfillAnimatedValue(scrollValue);
      let positionAndroidValue = this.props.initialPage;
      let offsetAndroidValue = 0;
      positionAndroid.addListener(({
        value
      }) => {
        positionAndroidValue = value;
        callListeners(positionAndroidValue + offsetAndroidValue);
      });
      offsetAndroid.addListener(({
        value
      }) => {
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
      sceneKeys: this.newSceneKeys({
        currentPage: this.props.initialPage
      })
    };
    this.onScroll = _reactNative.Animated.event([{
      nativeEvent: {
        contentOffset: {
          x: this.state.scrollXIOS
        }
      }
    }], {
      useNativeDriver: true,
      listener: e => this._onScroll(e)
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.updateSceneKeys({
        page: this.state.currentPage,
        children: this.props.children
      });
    }
    if (this.props.page >= 0 && this.props.page !== this.state.currentPage) {
      // 使用箭头函数确保在正确的上下文中调用
      this.goToPage(this.props.page);
    }
  }
  componentWillUnmount() {
    if (_reactNative.Platform.OS === 'ios') {
      this.state.scrollXIOS.removeAllListeners();
    } else {
      this.state.positionAndroid.removeAllListeners();
      this.state.offsetAndroid.removeAllListeners();
    }
  }
  goToPage = pageNumber => {
    if (_reactNative.Platform.OS === 'ios') {
      const offset = pageNumber * containerWidth;
      if (this.scrollView) {
        this.scrollView.scrollTo({
          x: offset,
          y: 0,
          animated: !this.props.scrollWithoutAnimation
        });
      }
    } else {
      if (this.scrollView) {
        this.setState({
          tabWillChangeWithoutGesture: true
        });
        // this.tabWillChangeWithoutGesture = true;
        if (this.props.scrollWithoutAnimation) {
          this.scrollView.setPageWithoutAnimation(pageNumber);
        } else {
          this.scrollView.setPage(pageNumber);
        }
      }
    }
    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber)
    });
  };
  renderTabBar = props => {
    if (this.props.renderTabBar === false) {
      return null;
    } else if (this.props.renderTabBar) {
      return /*#__PURE__*/_react.default.cloneElement(this.props.renderTabBar(props), props);
    } else {
      return /*#__PURE__*/_react.default.createElement(_DefaultTabBar.default, props);
    }
  };
  updateSceneKeys = ({
    page,
    children = this.props.children,
    callback = () => {}
  }) => {
    let newKeys = this.newSceneKeys({
      previousKeys: this.state.sceneKeys,
      currentPage: page,
      children
    });
    this.setState({
      currentPage: page,
      sceneKeys: newKeys
    }, callback);
  };
  newSceneKeys = ({
    previousKeys = [],
    currentPage = 0,
    children = this.props.children
  }) => {
    let newKeys = [];
    this._children(children).forEach((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      if (this._keyExists(previousKeys, key) || this._shouldRenderSceneKey(idx, currentPage)) {
        newKeys.push(key);
      }
    });
    return newKeys;
  };
  _polyfillAnimatedValue = animatedValue => {
    const listeners = new Set();
    const addListener = listener => {
      listeners.add(listener);
    };
    const removeListener = listener => {
      listeners.delete(listener);
    };
    const removeAllListeners = () => {
      listeners.clear();
    };
    animatedValue.addListener = addListener;
    animatedValue.removeListener = removeListener;
    animatedValue.removeAllListeners = removeAllListeners;
    return value => listeners.forEach(listener => listener({
      value
    }));
  };
  _shouldRenderSceneKey = (idx, currentPageKey) => {
    let numOfSibling = this.props.prerenderingSiblingsNumber;
    return idx < currentPageKey + numOfSibling + 1 && idx > currentPageKey - numOfSibling - 1;
  };
  _keyExists = (sceneKeys, key) => {
    return sceneKeys.find(sceneKey => key === sceneKey);
  };
  _makeSceneKey = (child, idx) => {
    return child.props.tabLabel + '_' + idx;
  };
  renderScrollableContent = () => {
    if (_reactNative.Platform.OS !== 'android') {
      const scenes = this._composeScenes();
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.ScrollView, _extends({
        horizontal: true,
        pagingEnabled: true,
        automaticallyAdjustContentInsets: false,
        contentOffset: {
          x: this.props.initialPage * containerWidth
        },
        ref: scrollView => {
          this.scrollView = scrollView;
        },
        onScroll: _reactNative.Animated.event([{
          nativeEvent: {
            contentOffset: {
              x: this.state.scrollXIOS
            }
          }
        }], {
          useNativeDriver: true,
          listener: this._onScroll
        }),
        onMomentumScrollBegin: this._onMomentumScrollBeginAndEnd,
        onMomentumScrollEnd: this._onMomentumScrollBeginAndEnd,
        scrollEventThrottle: 16,
        scrollsToTop: false,
        showsHorizontalScrollIndicator: false,
        scrollEnabled: !this.props.locked,
        directionalLockEnabled: true,
        alwaysBounceVertical: false,
        keyboardDismissMode: "on-drag"
      }, this.props.contentProps), scenes);
    } else {
      const scenes = this._composeScenes();
      return /*#__PURE__*/_react.default.createElement(AnimatedViewPagerAndroid, _extends({
        key: this._children().length,
        style: styles.scrollableContentAndroid,
        initialPage: this.props.initialPage,
        onPageSelected: this._updateSelectedPage,
        keyboardDismissMode: "on-drag",
        scrollEnabled: !this.props.locked,
        onPageScroll: _reactNative.Animated.event([{
          nativeEvent: {
            position: this.state.positionAndroid,
            offset: this.state.offsetAndroid
          }
        }], {
          useNativeDriver: true,
          listener: this._onScroll
        }),
        ref: scrollView => {
          this.scrollView = scrollView;
        }
      }, this.props.contentProps), scenes);
    }
  };
  _composeScenes = () => {
    return this._children().map((child, idx) => {
      let key = this._makeSceneKey(child, idx);
      return /*#__PURE__*/_react.default.createElement(_SceneComponent.default, {
        key: child.key,
        shouldUpdated: this._shouldRenderSceneKey(idx, this.state.currentPage),
        style: {
          width: containerWidth
        }
      }, this._keyExists(this.state.sceneKeys, key) ? child : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        tabLabel: child.props.tabLabel
      }));
    });
  };
  _onMomentumScrollBeginAndEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / containerWidth);
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page);
    }
  };
  _updateSelectedPage = nextPage => {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }
    const currentPage = this.state.currentPage;
    !this.state.tabWillChangeWithoutGesture && this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage)
    });
    this.setState({
      tabWillChangeWithoutGesture: false
    });
  };
  _onChangeTab = (prevPage, currentPage) => {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage
    });
  };
  _onScroll = e => {
    if (_reactNative.Platform.OS === 'ios') {
      const offsetX = e.nativeEvent.contentOffset.x;
      if (offsetX === 0 && !this.state.scrollOnMountCalled) {
        this.setState({
          scrollOnMountCalled: true
        });
      } else {
        this.props.onScroll(offsetX / containerWidth);
      }
    } else {
      const {
        position,
        offset
      } = e.nativeEvent;
      this.props.onScroll(position + offset);
    }
  };
  _handleLayout = e => {
    const {
      width
    } = e.nativeEvent.layout;
    if (!width || width <= 0 || Math.round(width) === Math.round(containerWidth)) {
      return;
    }
    let scrollValue;
    if (_reactNative.Platform.OS === 'ios') {
      const containerWidthAnimatedValue = new _reactNative.Animated.Value(width);
      // Need to call __makeNative manually to avoid a native animated bug. See
      // https://github.com/facebook/react-native/pull/14435
      containerWidthAnimatedValue.__makeNative();
      scrollValue = _reactNative.Animated.divide(this.state.scrollXIOS, containerWidthAnimatedValue);
    }
    this.setState({
      containerWidth: width,
      scrollValue
    });
    this.requestAnimationFrame(() => {
      this.goToPage(this.state.currentPage);
    });
  };
  _children = (children = this.props.children) => {
    return _react.default.Children.map(children, child => child);
  };
  render() {
    let overlayTabs = this.props.tabBarPosition === 'overlayTop' || this.props.tabBarPosition === 'overlayBottom';
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map(child => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      containerWidth: containerWidth
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
      console.log('tabBarUnderlineStyle', this.props.tabBarUnderlineStyle);
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0
      };
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.container, this.props.style],
      onLayout: this._handleLayout
    }, this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps), this.renderScrollableContent());
  }
}
module.exports = ScrollableTabView;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  scrollableContentAndroid: {
    flex: 1
  }
});
//# sourceMappingURL=index.js.map