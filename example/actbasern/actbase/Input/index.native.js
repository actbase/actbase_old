"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _index = require("../Form/index");

var _utils = require("../App/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var STYLE_GROUP_NAME = 'ab-input';

var styles = _reactNative.StyleSheet.create({
  container: {
    height: 40,
    borderColor: '#e2e4ec',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    fontSize: 20,
    lineHeight: 24,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1
  }
});

var propTemplate = {
  email: {
    keyboardType: 'email-address',
    autoCorrect: false,
    autoCapitalize: 'none'
  },
  password: {
    secureTextEntry: true,
    autoCorrect: false,
    autoCapitalize: 'none'
  }
};

var Input = function Input(props) {
  var type = props.type,
      style = props.style,
      name = props.name,
      onChangeText = props.onChangeText,
      leftDeco = props.leftDeco,
      rightDeco = props.rightDeco,
      focusStyle = props.focusStyle,
      _onBlur = props.onBlur,
      _onFocus = props.onFocus,
      disabled = props.disabled,
      oProps = (0, _tslib.__rest)(props, ["type", "style", "name", "onChangeText", "leftDeco", "rightDeco", "focusStyle", "onBlur", "onFocus", "disabled"]);
  var context = (0, _react.useContext)(_utils.ABContext);
  var formContext = (0, _react.useContext)(_index.FormContext); // const styles = context.styles;

  var _a = (0, _react.useState)({}),
      extraProps = _a[0],
      setExtraProps = _a[1];

  var suffix = '';

  if (type && styles[STYLE_GROUP_NAME + "-type-" + type]) {
    suffix = "-type-" + type;
  }

  var classes = ["" + STYLE_GROUP_NAME + suffix];

  var _b = (0, _react.useState)(false),
      focused = _b[0],
      setFocused = _b[1];

  if (focused) classes.push("" + STYLE_GROUP_NAME + suffix + "-focused");
  if (disabled) classes.push("" + STYLE_GROUP_NAME + suffix + "-disabled");

  var handleChangeText = function handleChangeText(text) {
    var _a, _b;

    onChangeText && onChangeText(text);
    ((_a = formContext) === null || _a === void 0 ? void 0 : _a.onChangeText) && ((_b = formContext) === null || _b === void 0 ? void 0 : _b.onChangeText(name, text));
  };

  var handleProps = function handleProps(props) {
    console.log(props);

    if (!(0, _lodash.isEqual)(props, extraProps)) {
      setExtraProps(function (p) {
        return (0, _tslib.__assign)((0, _tslib.__assign)({}, p), props);
      });
    }
  };

  var containerStyle = [],
      inputStyle = [props.inputStyle];

  if (focused) {
    containerStyle.push(focusStyle);
    inputStyle.push((0, _lodash.pick)(_reactNative.StyleSheet.flatten(focusStyle), _utils.TEXT_STYLE_NAMES));
  }

  if (props.multiline) {
    inputStyle.push({
      height: _reactNative.StyleSheet.flatten(style).height || '100%',
      textAlignVertical: 'top',
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 10
    });
  }

  var containerStyle2 = {};

  if (disabled) {
    containerStyle2.backgroundColor = colors.very_light_pink;
  }

  var className = classes.concat(classes.map(function (v) {
    return v.substring(1);
  }));

  var elementStyle = _reactNative.StyleSheet.flatten(className.map(function (v) {
    return styles[v];
  }).concat([style]));

  return _react["default"].createElement(_reactNative.View, {
    style: [styles.container, style, _reactNative.StyleSheet.flatten(containerStyle), containerStyle2]
  }, leftDeco, _react["default"].createElement(_reactNative.TextInput, _extends({
    ref: function ref(el) {
      return formContext.addTarget && formContext.addTarget(name, el, handleProps);
    },
    onChangeText: handleChangeText,
    style: [styles.input, (0, _lodash.pick)(style, _utils.TEXT_STYLE_NAMES), inputStyle],
    onFocus: function onFocus(e) {
      setFocused(true);
      _onFocus && _onFocus(e);
    },
    onBlur: function onBlur(e) {
      setFocused(false);
      _onBlur && _onBlur(e);
    },
    editable: !disabled
  }, propTemplate[type], extraProps, oProps)), rightDeco);
};

var _default = Input;
exports["default"] = _default;