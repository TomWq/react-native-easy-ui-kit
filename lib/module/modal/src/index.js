function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useImperativeHandle } from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import View from '../../view';
import { StyleSheet } from 'react-native';
import { useStyles, createStyleSheet } from 'react-native-unistyles';
import { isIos } from '../../utils/platform';
const ModalView = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    children,
    snapPoints,
    opacity,
    enableBlurBackdrop,
    backgroundComponent,
    ...otherProps
  } = props;
  const bottomSheetModalRef = useRef(null);
  useImperativeHandle(ref, () => ({
    presentModal: () => handlePresentModalPress(),
    dismissModal: () => handleClosePress()
  }));

  // variables
  const snapPoint = useMemo(() => snapPoints, [snapPoints]);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index === 0) {
      handleClosePress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePresentModalPress = useCallback(() => {
    var _bottomSheetModalRef$;
    (_bottomSheetModalRef$ = bottomSheetModalRef.current) === null || _bottomSheetModalRef$ === void 0 || _bottomSheetModalRef$.present();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClosePress = useCallback(() => {
    var _bottomSheetModalRef$2;
    (_bottomSheetModalRef$2 = bottomSheetModalRef.current) === null || _bottomSheetModalRef$2 === void 0 || _bottomSheetModalRef$2.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/React.createElement(BottomSheetModal, _extends({
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: snapPoint,
    onChange: handleSheetChanges,
    handleComponent: () => null,
    backgroundComponent: enableBlurBackdrop ? BlurredBackground : backgroundComponent,
    backdropComponent: props => /*#__PURE__*/React.createElement(BottomSheetBackdrop, _extends({}, props, {
      opacity: opacity ?? 0.1
    }))
  }, otherProps), children);
});
function BlurredBackground() {
  const {
    styles
  } = useStyles(stylesheet);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, isIos ? /*#__PURE__*/React.createElement(BlurView, {
    tint: "light",
    style: styles.blurView,
    intensity: 50
  }) : /*#__PURE__*/React.createElement(View, {
    style: [styles.blurView, {
      backgroundColor: '#fff'
    }]
  }));
}
const stylesheet = createStyleSheet({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  blurView: {
    ...StyleSheet.absoluteFillObject
  }
});
export default ModalView;
//# sourceMappingURL=index.js.map