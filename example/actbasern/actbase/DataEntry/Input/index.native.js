"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _index = require("../Form/index.native");

var _utils = require("../../App/utils.native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      oProps = _objectWithoutProperties(props, ["type", "style", "name", "onChangeText", "leftDeco", "rightDeco", "focusStyle", "onBlur", "onFocus", "disabled"]);

  var context = (0, _react.useContext)(_utils.ABContext);
  var formContext = (0, _react.useContext)(_index.FormContext);
  var styles = context.styles;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      extraProps = _useState2[0],
      setExtraProps = _useState2[1];

  var suffix = '';

  if (type && styles["".concat(STYLE_GROUP_NAME, "-type-").concat(type)]) {
    suffix = "-type-".concat(type);
  }

  var classes = ["".concat(STYLE_GROUP_NAME).concat(suffix)];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      focused = _useState4[0],
      setFocused = _useState4[1];

  if (focused) classes.push("".concat(STYLE_GROUP_NAME).concat(suffix, "-focused"));
  if (disabled) classes.push("".concat(STYLE_GROUP_NAME).concat(suffix, "-disabled"));

  var handleChangeText = function handleChangeText(text) {
    onChangeText && onChangeText(text);
    (formContext === null || formContext === void 0 ? void 0 : formContext.onChangeText) && (formContext === null || formContext === void 0 ? void 0 : formContext.onChangeText(name, text));
  };

  var handleProps = function handleProps(props) {
    console.log(props);

    if (!(0, _lodash.isEqual)(props, extraProps)) {
      setExtraProps(function (p) {
        return _objectSpread({}, p, {}, props);
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