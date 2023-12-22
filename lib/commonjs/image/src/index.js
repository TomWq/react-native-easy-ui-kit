"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Image = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  //@ts-ignore
  return /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, _extends({}, props, {
    ref: ref
  }));
});

// function Image(props:FastImageProps) {
//   return <FastImage {...props} />;
// }
var _default = exports.default = Image;
//# sourceMappingURL=index.js.map