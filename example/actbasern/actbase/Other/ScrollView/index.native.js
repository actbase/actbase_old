"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _utils = require("../../App/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _Dimensions$get = _reactNative.Dimensions.get('screen'),
    height = _Dimensions$get.height;

var ScrollView = function ScrollView(props) {
  var animated = null;
  var refObject = (0, _react.useRef)({
    scroll: null,
    container: null
  }).current;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      focusItem = _useState2[0],
      setFocusItem = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      footDimen = _useState4[0],
      setFootDimen = _useState4[1];

  var keyboardHeight = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;

  var handleKDS =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var posScroll, bottom, toValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(refObject === null || refObject === void 0 ? void 0 : refObject.scroll)) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return (0, _utils.measure)((0, _reactNative.findNodeHandle)(refObject === null || refObject === void 0 ? void 0 : refObject.scroll));

            case 3:
              posScroll = _context.sent;
              bottom = height - (posScroll.pageY + posScroll.height);
              toValue = e.endCoordinates.height - bottom;
              setFootDimen(toValue);

              if (animated) {
                animated.stop();
                animated = null;
              }

              keyboardHeight.setValue(toValue > 0 ? toValue : 0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleKDS(_x) {
      return _ref.apply(this, arguments);
    };
  }();

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
    if (!focusItem || !footDimen) {
      return;
    }

    (0, _utils.measure)((0, _reactNative.findNodeHandle)(refObject === null || refObject === void 0 ? void 0 : refObject.scroll)).then(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(posScroll) {
        var offsetY, posContainer, posFocus, offset, y, _refObject$scroll, nowY, _refObject$scroll2, moveY;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(focusItem && (refObject === null || refObject === void 0 ? void 0 : refObject.container))) {
                  _context2.next = 11;
                  break;
                }

                offsetY = ((props === null || props === void 0 ? void 0 : props.offsetY) || 0) + 50;
                _context2.next = 4;
                return (0, _utils.measure)(refObject === null || refObject === void 0 ? void 0 : refObject.container);

              case 4:
                posContainer = _context2.sent;
                _context2.next = 7;
                return (0, _utils.measure)((0, _reactNative.findNodeHandle)(focusItem));

              case 7:
                posFocus = _context2.sent;
                offset = posScroll.pageY - posContainer.pageY;
                y = posFocus.pageY - posScroll.pageY;

                if (y < 0) {
                  refObject === null || refObject === void 0 ? void 0 : (_refObject$scroll = refObject.scroll) === null || _refObject$scroll === void 0 ? void 0 : _refObject$scroll.scrollTo({
                    y: offset + y - 30,
                    animated: true
                  });
                } else {
                  nowY = posFocus.pageY - posScroll.pageY + offsetY;

                  if (nowY > posScroll.height - footDimen) {
                    moveY = offset + (nowY - (posScroll.height - footDimen));
                    refObject === null || refObject === void 0 ? void 0 : (_refObject$scroll2 = refObject.scroll) === null || _refObject$scroll2 === void 0 ? void 0 : _refObject$scroll2.scrollTo({
                      y: moveY,
                      animated: true
                    });
                  }
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }())["catch"](function (e) {});
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
        return (listener === null || listener === void 0 ? void 0 : listener.remove) && (listener === null || listener === void 0 ? void 0 : listener.remove());
      });
    };
  }, []);

  var keyboardShouldPersistTaps = props.keyboardShouldPersistTaps,
      _onFocus = props.onFocus,
      _onBlur = props.onBlur,
      children = props.children,
      oProps = _objectWithoutProperties(props, ["keyboardShouldPersistTaps", "onFocus", "onBlur", "children"]);

  var Element = (props === null || props === void 0 ? void 0 : props.onScroll) ? _reactNative.Animated.ScrollView : _reactNative.ScrollView;
  return _react["default"].createElement(Element, _extends({
    ref: function ref(e) {
      if (e) {
        refObject.scroll = (props === null || props === void 0 ? void 0 : props.onScroll) ? e.getNode() : e;
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