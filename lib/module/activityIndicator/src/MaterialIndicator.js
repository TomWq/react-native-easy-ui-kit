function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { PureComponent } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Indicator from './Indicator';
export default class MaterialIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 4000,
    color: 'rgb(255,255,255)',
    size: 30,
    title: '加载中...'
  };
  _renderComponent = ({
    index,
    progress
  }) => {
    let {
      size,
      color,
      trackWidth: borderWidth = size / 10,
      animationDuration
    } = this.props;
    let frames = 60 * animationDuration / 1000;
    let easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
    let sa = 7.5;
    let ea = 30;
    let sequences = 3;
    let rotations = 5;
    let inputRange = Array.from(new Array(frames), frameIndex => frameIndex / (frames - 1));
    let outputRange = Array.from(new Array(frames), frameIndex => {
      let progress = 2 * sequences * frameIndex / (frames - 1);
      let rotation = index ? +(360 - sa) : -(180 - sa);
      let sequence = Math.ceil(progress);
      if (sequence % 2) {
        progress = progress - sequence + 1;
      } else {
        progress = sequence - progress;
      }
      let direction = index ? -1 : +1;
      return direction * (180 - (sa + ea)) * easing(progress) + rotation + 'deg';
    });
    let layerStyle = {
      width: size,
      height: size,
      transform: [{
        rotate: 90 - sa + 'deg'
      }, {
        rotate: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', 360 * rotations + 'deg']
        })
      }]
    };
    let viewportStyle = {
      width: size,
      height: size,
      transform: [{
        translateY: index ? -size / 2 : 0
      }, {
        rotate: progress.interpolate({
          inputRange,
          outputRange
        })
      }]
    };
    let containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden'
    };
    let offsetStyle = index ? {
      top: size / 2
    } : null;
    let lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size / 2,
      borderWidth
    };
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: styles.layer,
      key: index
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: layerStyle
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [containerStyle, offsetStyle],
      collapsable: false
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: viewportStyle
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: containerStyle,
      collapsable: false
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: lineStyle
    }))))));
  };
  render() {
    let {
      style,
      size: width,
      size: height,
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement(Indicator, _extends({
      style: {
        width,
        height
      },
      renderComponent: this._renderComponent
    }, props, {
      count: 2
    }));
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100%',
    height: '100%'
  },
  laodView: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  loadTitle: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 15
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=MaterialIndicator.js.map