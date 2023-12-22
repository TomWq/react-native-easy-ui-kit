"use strict";

var _react = _interopRequireDefault(require("react"));
var _StyleSheet = require("../utils/StyleSheet375");
var _deprecatedReactNativePropTypes = require("deprecated-react-native-prop-types");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const { ViewPropTypes } = ReactNative = require('deprecated-react-native-prop-types');

const WINDOW_WIDTH = _reactNative.Dimensions.get('window').width;
class ScrollableTabBar extends _react.default.Component {
  static propTypes = {
    goToPage: _propTypes.default.func,
    activeTab: _propTypes.default.number,
    tabs: _propTypes.default.array,
    backgroundColor: _propTypes.default.string,
    activeTextColor: _propTypes.default.string,
    inactiveTextColor: _propTypes.default.string,
    scrollOffset: _propTypes.default.number,
    style: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabsContainerStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    textStyle: _reactNative.Text.propTypes.style,
    renderTab: _propTypes.default.func,
    underlineStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    onScroll: _propTypes.default.func
  };
  static defaultProps = {
    scrollOffset: 52,
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
    style: {},
    tabStyle: {},
    tabsContainerStyle: {},
    underlineStyle: {}
  };
  constructor(props) {
    super(props);
    this._tabsMeasurements = [];
    this.state = {
      _leftTabUnderline: new _reactNative.Animated.Value(0),
      _widthTabUnderline: new _reactNative.Animated.Value(0),
      _containerWidth: null
    };
  }
  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }
  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;
    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }
    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  }
  necessarilyMeasurementsCompleted(position, isLastTab) {
    return this._tabsMeasurements[position] && (isLastTab || this._tabsMeasurements[position + 1]) && this._tabContainerMeasurements && this._containerMeasurements;
  }
  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;
    if (_reactNative.Platform.OS === 'android') {
      this._scrollView.scrollTo({
        x: newScrollX,
        y: 0,
        animated: false
      });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - this._containerMeasurements.width;
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({
        x: newScrollX,
        y: 0,
        animated: false
      });
    }
  }
  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;
    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;
      const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
      const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * lineRight;
      this.state._leftTabUnderline.setValue(newLineLeft + (0, _StyleSheet.getSize)(27));
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft - (0, _StyleSheet.getSize)(54));
    } else {
      this.state._leftTabUnderline.setValue(lineLeft + (0, _StyleSheet.getSize)(27));
      this.state._widthTabUnderline.setValue(lineRight - lineLeft - (0, _StyleSheet.getSize)(54));
    }
  }
  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const {
      activeTextColor,
      inactiveTextColor,
      textStyle
    } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'normal' : 'normal';
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      activeOpacity: 1,
      key: `${name}_${page}`,
      accessible: true,
      accessibilityLabel: name,
      accessibilityTraits: "button",
      onPress: () => onPressHandler(page),
      onLayout: onLayoutHandler
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tab, this.props.tabStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [{
        color: textColor,
        fontWeight
      }, textStyle, {
        fontSize: isTabActive ? 14 : 14
      }]
    }, name)));
  }
  measureTab(page, event) {
    const {
      x,
      width,
      height
    } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {
      left: x,
      right: x + width,
      width,
      height
    };
    this.updateView({
      value: this.props.scrollValue.__getValue()
    });
  }
  render() {
    const tabUnderlineStyle = {
      position: 'absolute',
      height: 4,
      backgroundColor: 'navy',
      bottom: 0
    };
    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.container, {
        backgroundColor: this.props.backgroundColor
      }, this.props.style],
      onLayout: this.onContainerLayout
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      ref: scrollView => {
        this._scrollView = scrollView;
      },
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      directionalLockEnabled: true,
      bounces: false,
      scrollsToTop: false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tabs, {
        width: this.state._containerWidth
      }, this.props.tabsContainerStyle],
      ref: 'tabContainer',
      onLayout: this.onTabContainerLayout
    }, this.props.tabs.map((name, page) => {
      const isTabActive = this.props.activeTab === page;
      const renderTab = this.props.renderTab || this.renderTab;
      return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle]
    }))));
  }
  componentDidUpdate(prevProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) && this.state._containerWidth) {
      this.setState({
        _containerWidth: null
      });
    }
  }
  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({
      _containerWidth: width
    });
    this.updateView({
      value: this.props.scrollValue.__getValue()
    });
  }
  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({
      value: this.props.scrollValue.__getValue()
    });
  }
}
module.exports = ScrollableTabBar;
const styles = _reactNative.StyleSheet.create({
  tab: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  container: {
    height: 35,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
//# sourceMappingURL=CustomTabBar.js.map