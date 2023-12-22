import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import Button from './Button';
class DefaultTabBar extends React.Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    containerWidth: PropTypes.number,
    // scrollValue: PropTypes.instanceOf(Animated.Value),
    style: ViewPropTypes.style,
    tabBarUnderlineStyle: ViewPropTypes.style,
    tabUnderlineBackgroundColor: PropTypes.string
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
    return /*#__PURE__*/React.createElement(Button, {
      style: {
        flex: 1
      },
      key: name,
      accessible: true,
      accessibilityLabel: name,
      accessibilityRole: "button",
      onPress: () => onPressHandler(page)
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.tab, this.props.tabStyle]
    }, /*#__PURE__*/React.createElement(Text, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.tabs, {
        backgroundColor
      }, style]
    }, tabs.map((name, page) => this.renderTab(name, page, this.props.activeTab === page, this.props.goToPage)), /*#__PURE__*/React.createElement(Animated.View, {
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
const styles = StyleSheet.create({
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
export default DefaultTabBar;
//# sourceMappingURL=DefaultTabBar.js.map