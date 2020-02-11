"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScrollView = function ScrollView(_a) {
  var children = _a.children;
  return _react["default"].createElement("div", {
    style: {
      overflowY: 'scroll'
    }
  }, children);
};

var _default = ScrollView;
exports["default"] = _default;