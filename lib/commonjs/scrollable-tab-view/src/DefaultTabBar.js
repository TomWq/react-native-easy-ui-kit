"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _deprecatedReactNativePropTypes = require("deprecated-react-native-prop-types");
var _Button = _interopRequireDefault(require("./Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DefaultTabBar extends _react.default.Component {
  static propTypes = {
    goToPage: _propTypes.default.func,
    activeTab: _propTypes.default.number,
    tabs: _propTypes.default.array,
    backgroundColor: _propTypes.default.string,
    activeTextColor: _propTypes.default.string,
    inactiveTextColor: _propTypes.default.string,
    textStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    renderTab: _propTypes.default.func,
    underlineStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    containerWidth: _propTypes.default.number,
    // scrollValue: PropTypes.instanceOf(Animated.Value),
    style: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabBarUnderlineStyle: _deprecatedReactNativePropTypes.ViewPropTypes.style,
    tabUnderlineBackgroundColor: _propTypes.default.string
  };
  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null
  };
  renderTab(name, page, isTabActive, onPressHandler) {
    const {
      activeTextColor,
      inactiveTextColor,
      textStyle
    } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      style: {
        flex: 1
      },
      key: name,
      accessible: true,
      accessibilityLabel: name,
      accessibilityRole: "button",
      onPress: () => onPressHandler(page)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tab, this.props.tabStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [{
        color: textColor,
        fontWeight
      }, textStyle]
    }, name)));
  }
  render() {
    const {
      containerWidth,
      tabs,
      backgroundColor,
      style,
      scrollValue,
      underlineStyle
    } = this.props;
    const numberOfTabs = tabs.length;
    console.log('underlineStyle', underlineStyle.width);
    const left = underlineStyle.width ? containerWidth / numberOfTabs / 2 - underlineStyle.width / 2 : containerWidth / numberOfTabs / 4;
    const tabUnderlineStyle = {
      position: 'absolute',
      borderRadius: 1,
      width: containerWidth / numberOfTabs / 2,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
      //居中
      left: left
      // left: containerWidth / numberOfTabs / 4,
    };
    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    });
    const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;
    const scaleValue = defaultScale => {
      let arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(function (pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1);
        return pre;
      }, {
        inputRange: [],
        outputRange: []
      });
    };
    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tabs, {
        backgroundColor
      }, style]
    }, tabs.map((name, page) => this.renderTab(name, page, this.props.activeTab === page, this.props.goToPage)), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [tabUnderlineStyle, {
        transform: [{
          translateX
        }, {
          scaleX
        }]
      }, underlineStyle]
    }));
  }
}
const styles = _reactNative.StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  }
});
var _default = exports.default = DefaultTabBar;
//# sourceMappingURL=DefaultTabBar.js.map