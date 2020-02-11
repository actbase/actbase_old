"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../App/utils");

var _index = require("../DataEntry/Form/index.native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var STYLE_GROUP_NAME = 'ab-button';

var _a = require('lodash'),
    omit = _a.omit,
    pick = _a.pick;

var _b = require('react-native'),
    ActivityIndicator = _b.ActivityIndicator,
    SafeAreaView = _b.SafeAreaView,
    StyleSheet = _b.StyleSheet,
    Text = _b.Text,
    TouchableWithoutFeedback = _b.TouchableWithoutFeedback,
    View = _b.View;

var Button = function Button(props) {
  var size = props.size,
      type = props.type,
      style = props.style,
      children = props.children,
      disabled = props.disabled,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      forceInset = props.forceInset,
      oProps = (0, _tslib.__rest)(props, ["size", "type", "style", "children", "disabled", "onPress", "onPressIn", "onPressOut", "forceInset"]);
  var context = (0, _react.useContext)(_utils.ABContext);
  var formContext = (0, _react.useContext)(_index.FormContext);
  var styles = context.styles;
  var suffix = '';

  if (type && styles[STYLE_GROUP_NAME + "-type-" + type]) {
    suffix = "-type-" + type;
  }

  var classes = ["" + STYLE_GROUP_NAME + suffix];

  var _a = (0, _react.useState)(false),
      press = _a[0],
      setPress = _a[1];

  if (press) classes.push("" + STYLE_GROUP_NAME + suffix + "-press");

  var _b = (0, _react.useState)(false),
      hover = _b[0],
      setHover = _b[1];

  if (hover) classes.push("" + STYLE_GROUP_NAME + suffix + "-hover");
  if (disabled) classes.push("" + STYLE_GROUP_NAME + suffix + "-disabled");
  var handlePressIn = (0, _react.useCallback)(function (e) {
    onPressIn && onPressIn(e);
    setPress(true);
  }, []);
  var handlePressOut = (0, _react.useCallback)(function (e) {
    onPressOut && onPressOut(e);
    setPress(false);
  }, []);

  var _c = (0, _react.useState)(0),
      process = _c[0],
      setProcess = _c[1];

  var handleClick = (0, _react.useCallback)(function (e) {
    var _a, _b, _c;

    if (process > 0) return;
    setProcess(1);

    try {
      var isPromise = false;

      if (onPress) {
        var o = onPress && onPress();

        if (o instanceof Promise) {
          isPromise = true;
          setProcess(2);
          o.then(function () {
            setProcess(0);
          })["catch"](function (e) {
            setProcess(0);
            console.warn(e);
          });
        }
      } else if ((_a = formContext) === null || _a === void 0 ? void 0 : _a.submit) {
        var o = ((_b = formContext) === null || _b === void 0 ? void 0 : _b.submit) && ((_c = formContext) === null || _c === void 0 ? void 0 : _c.submit());

        if (o instanceof Promise) {
          isPromise = true;
          setProcess(2);
          o.then(function () {
            setProcess(0);
          })["catch"](function (e) {
            setProcess(0);
            console.warn(e);
          });
        }
      }

      if (!isPromise) setTimeout(function () {
        return setProcess(0);
      }, 200);
    } catch (e) {
      console.warn(e);
      setProcess(0);
    }
  }, [process]);
  var className = classes.concat(classes.map(function (v) {
    return v.substring(1);
  }));
  var elementStyle = StyleSheet.flatten(className.map(function (v) {
    return styles[v];
  }).concat([style]));
  var contents = children;

  if (process === 2) {
    contents = _react["default"].createElement(ActivityIndicator, null);
  } else if (typeof contents === 'string') {
    contents = _react["default"].createElement(Text, {
      style: pick(elementStyle, _utils.TEXT_STYLE_NAMES)
    }, props.children);
  }

  var Element1 = View;
  var Element2 = View;
  var args = {};
  var coverStyle = elementStyle;
  var innerStyle = {};

  if (forceInset) {
    Element1 = SafeAreaView;
    Element2 = View;
    coverStyle = omit(elementStyle, ['height', 'minHeight', 'maxHeight', 'borderRadius']);
    innerStyle = pick(elementStyle, ['height', 'minHeight', 'maxHeight', 'alignItems', 'justifyContent']);
  }

  return _react["default"].createElement(TouchableWithoutFeedback, _extends({
    onPress: handleClick,
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    disabled: process > 0 || disabled
  }, oProps), _react["default"].createElement(Element1, _extends({
    style: coverStyle
  }, args), _react["default"].createElement(Element2, {
    style: innerStyle,
    children: contents
  })));
};

var _default = Button;
exports["default"] = _default;