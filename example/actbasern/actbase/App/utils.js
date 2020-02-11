"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TEXT_STYLE_NAMES = exports.ABContext = void 0;

var _react = require("react");

var ABContext = (0, _react.createContext)({});
exports.ABContext = ABContext;
var TEXT_STYLE_NAMES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'fontVariant', 'textShadowOffset', 'textShadowRadius', 'textShadowColor', 'letterSpacing', 'lineHeight', 'textAlign', 'textAlignVertical', 'includeFontPadding', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textTransform', 'writingDirection'];
exports.TEXT_STYLE_NAMES = TEXT_STYLE_NAMES;
var _default = {
  ABContext: ABContext,
  TEXT_STYLE_NAMES: TEXT_STYLE_NAMES
};
exports["default"] = _default;