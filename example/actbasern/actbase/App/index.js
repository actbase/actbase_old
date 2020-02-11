"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ABApp = function ABApp(RootComponent, theme) {
  return function (props) {
    var value = {
      theme: theme
    };
    return _react["default"].createElement(_utils.ABContext.Provider, {
      value: value
    }, _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(RootComponent, props)));
  };
};

var _default = ABApp;
exports["default"] = _default;