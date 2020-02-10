"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _utils = require("./utils.native");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ABApp = function ABApp(RootComponent, overrideStyle) {
  return function (props) {
    var value = _react["default"].useMemo(function () {
      var styles = ABApp.styles;
      (0, _lodash.forIn)(overrideStyle, function (value, key) {
        styles[key] = (0, _lodash.assign)(styles[key], value);
      });
      return {
        styles: _reactNative.StyleSheet.create(styles)
      };
    }, []);

    return _react["default"].createElement(_utils.ABContext.Provider, {
      value: value
    }, _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(RootComponent, props)));
  };
};

ABApp.styles = {};
var _default = ABApp;
exports["default"] = _default;