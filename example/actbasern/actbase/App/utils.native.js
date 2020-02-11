"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TEXT_STYLE_NAMES = exports.measure = exports.ABContext = void 0;

var _react = require("react");

var _reactNative = require("react-native");

var ABContext = (0, _react.createContext)({});
exports.ABContext = ABContext;

var measure = function measure(target) {
  return new Promise(function (resolve, reject) {
    try {
      _reactNative.UIManager.measure(target, function (originX, originY, width, oHeight, pageX, pageY) {
        return resolve({
          originX: originX,
          originY: originY,
          width: width,
          height: oHeight,
          pageX: pageX,
          pageY: pageY
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.measure = measure;
var TEXT_STYLE_NAMES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'fontVariant', 'textShadowOffset', 'textShadowRadius', 'textShadowColor', 'letterSpacing', 'lineHeight', 'textAlign', 'textAlignVertical', 'includeFontPadding', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textTransform', 'writingDirection'];
exports.TEXT_STYLE_NAMES = TEXT_STYLE_NAMES;
var _default = {
  ABContext: ABContext,
  TEXT_STYLE_NAMES: TEXT_STYLE_NAMES,
  measure: measure
};
exports["default"] = _default;