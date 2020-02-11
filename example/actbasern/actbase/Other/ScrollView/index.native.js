"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _utils = require("../../App/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var height = _reactNative.Dimensions.get('screen').height;

var ScrollView = function ScrollView(props) {
  var _a;

  var animated = null;
  var refObject = (0, _react.useRef)({
    scroll: null,
    container: null
  }).current;

  var _b = (0, _react.useState)(null),
      focusItem = _b[0],
      setFocusItem = _b[1];

  var _c = (0, _react.useState)(0),
      footDimen = _c[0],
      setFootDimen = _c[1];

  var keyboardHeight = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;

  var handleKDS = function handleKDS(e) {
    return (0, _tslib.__awaiter)(void 0, void 0, void 0, function () {
      var posScroll, bottom, toValue;

      var _a, _b;

      return (0, _tslib.__generator)(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!((_a = refObject) === null || _a === void 0 ? void 0 : _a.scroll)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , (0, _utils.measure)((0, _reactNative.findNodeHandle)((_b = refObject) === null || _b === void 0 ? void 0 : _b.scroll))];

          case 1:
            posScroll = _c.sent();
            bottom = height - (posScroll.pageY + posScroll.height);
            toValue = e.endCoordinates.height - bottom;
            setFootDimen(toValue);

            if (animated) {
              animated.stop();
              animated = null;
            }

            keyboardHeight.setValue(toValue > 0 ? toValue : 0);
            _c.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var handleKWH = function handleKWH(e) {
    if (animated) {
      animated.stop();
      animated = null;
    }

    animated = _reactNative.Animated.timing(keyboardHeight, {
      duration: e.duration,
      toValue: 0
    });
    animated.start();
  };

  var handleKDH = function handleKDH() {
    if (animated) {
      animated.stop();
      animated = null;
    }

    keyboardHeight.setValue(0);
  };

  (0, _react.useEffect)(function () {
    var _a;

    if (!focusItem || !footDimen) {
      return;
    }

    (0, _utils.measure)((0, _reactNative.findNodeHandle)((_a = refObject) === null || _a === void 0 ? void 0 : _a.scroll)).then(function (posScroll) {
      return (0, _tslib.__awaiter)(void 0, void 0, void 0, function () {
        var offsetY, posContainer, posFocus, offset, y, nowY, moveY;

        var _a, _b, _c, _d, _e, _f, _g;

        return (0, _tslib.__generator)(this, function (_h) {
          switch (_h.label) {
            case 0:
              if (!(focusItem && ((_a = refObject) === null || _a === void 0 ? void 0 : _a.container))) return [3
              /*break*/
              , 3];
              offsetY = (((_b = props) === null || _b === void 0 ? void 0 : _b.offsetY) || 0) + 50;
              return [4
              /*yield*/
              , (0, _utils.measure)((_c = refObject) === null || _c === void 0 ? void 0 : _c.container)];

            case 1:
              posContainer = _h.sent();
              return [4
              /*yield*/
              , (0, _utils.measure)((0, _reactNative.findNodeHandle)(focusItem))];

            case 2:
              posFocus = _h.sent();
              offset = posScroll.pageY - posContainer.pageY;
              y = posFocus.pageY - posScroll.pageY;

              if (y < 0) {
                (_e = (_d = refObject) === null || _d === void 0 ? void 0 : _d.scroll) === null || _e === void 0 ? void 0 : _e.scrollTo({
                  y: offset + y - 30,
                  animated: true
                });
              } else {
                nowY = posFocus.pageY - posScroll.pageY + offsetY;

                if (nowY > posScroll.height - footDimen) {
                  moveY = offset + (nowY - (posScroll.height - footDimen));
                  (_g = (_f = refObject) === null || _f === void 0 ? void 0 : _f.scroll) === null || _g === void 0 ? void 0 : _g.scrollTo({
                    y: moveY,
                    animated: true
                  });
                }
              }

              _h.label = 3;

            case 3:
              return [2
              /*return*/
              ];
          }
        });
      });
    })["catch"](function (e) {});
  }, [focusItem, footDimen]);
  (0, _react.useEffect)(function () {
    var listeners = [];

    if (_reactNative.Platform.OS === 'ios') {
      listeners.push(_reactNative.Keyboard.addListener('keyboardWillShow', handleKDS));
      listeners.push(_reactNative.Keyboard.addListener('keyboardWillHide', handleKWH));
    }

    listeners.push(_reactNative.Keyboard.addListener('keyboardDidShow', handleKDS));
    listeners.push(_reactNative.Keyboard.addListener('keyboardDidHide', handleKDH));
    return function () {
      listeners.forEach(function (listener) {
        var _a, _b;

        return ((_a = listener) === null || _a === void 0 ? void 0 : _a.remove) && ((_b = listener) === null || _b === void 0 ? void 0 : _b.remove());
      });
    };
  }, []);
  var keyboardShouldPersistTaps = props.keyboardShouldPersistTaps,
      _onFocus = props.onFocus,
      _onBlur = props.onBlur,
      children = props.children,
      oProps = (0, _tslib.__rest)(props, ["keyboardShouldPersistTaps", "onFocus", "onBlur", "children"]);
  var Element = ((_a = props) === null || _a === void 0 ? void 0 : _a.onScroll) ? _reactNative.Animated.ScrollView : _reactNative.ScrollView;
  return _react["default"].createElement(Element, _extends({
    ref: function ref(e) {
      var _a;

      if (e) {
        refObject.scroll = ((_a = props) === null || _a === void 0 ? void 0 : _a.onScroll) ? e.getNode() : e;
      }
    }
  }, oProps, {
    onFocus: function onFocus(e) {
      setFocusItem(e.target);
      _onFocus && _onFocus(e);
    },
    onBlur: function onBlur(e) {
      setFocusItem(null);
      _onBlur && _onBlur(e);
    },
    keyboardShouldPersistTaps: keyboardShouldPersistTaps || 'handled'
  }), _react["default"].createElement(_reactNative.Animated.View, {
    ref: function ref(e) {
      if (e) {
        refObject.container = (0, _reactNative.findNodeHandle)(e.getNode());
      }
    },
    style: {
      flexGrow: 1,
      marginBottom: keyboardHeight
    }
  }, children));
};

var _default = ScrollView;
exports["default"] = _default;