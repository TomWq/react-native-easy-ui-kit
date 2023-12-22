function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import FastImage from "react-native-fast-image";
const Image = /*#__PURE__*/React.forwardRef((props, ref) => {
  //@ts-ignore
  return /*#__PURE__*/React.createElement(FastImage, _extends({}, props, {
    ref: ref
  }));
});

// function Image(props:FastImageProps) {
//   return <FastImage {...props} />;
// }

export default Image;
//# sourceMappingURL=index.js.map