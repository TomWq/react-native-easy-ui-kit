"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class StaticContainer extends _react.default.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }
  render() {
    var child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return _react.default.Children.only(child);
  }
}
var _default = exports.default = StaticContainer;
//# sourceMappingURL=StaticContainer.js.map