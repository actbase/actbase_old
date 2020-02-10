"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _utils = require("../../App/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormContext = _react["default"].createContext({});

exports.FormContext = FormContext;

var Form = function Form(props) {
  var elements = (0, _react.useRef)({});

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var onLayout = props.onLayout,
      oProps = _objectWithoutProperties(props, ["onLayout"]);

  var addTarget =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(name, input, fn) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              elements.current[name] = {
                input: input,
                fn: fn
              };

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function addTarget(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleLayout =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(e) {
      var _items$sort;

      var _i2, _Object$keys, key, el, pos, area, items;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onLayout && onLayout(e);
              _i2 = 0, _Object$keys = Object.keys(elements === null || elements === void 0 ? void 0 : elements.current);

            case 2:
              if (!(_i2 < _Object$keys.length)) {
                _context2.next = 13;
                break;
              }

              key = _Object$keys[_i2];
              el = elements === null || elements === void 0 ? void 0 : elements.current[key];
              _context2.next = 7;
              return (0, _utils.measure)((0, _reactNative.findNodeHandle)(el.input));

            case 7:
              pos = _context2.sent;
              area = parseFloat("".concat(Math.floor(pos.pageX), ".").concat(Math.floor(pos.pageY)));
              elements.current[key].area = area;

            case 10:
              _i2++;
              _context2.next = 2;
              break;

            case 13:
              items = Object.values(elements.current);
              items === null || items === void 0 ? void 0 : (_items$sort = items.sort(function (a, b) {
                return a.area > b.area ? 1 : a.area < b.area ? -1 : 0;
              })) === null || _items$sort === void 0 ? void 0 : _items$sort.map(function (v, index) {
                var args = {};

                if (items.length - 1 <= index) {
                  args.returnKeyType = 'done';
                } else {
                  var _items$input;

                  args.returnKeyType = 'next';
                  args.onSubmitEditing = (_items$input = items[index + 1].input) === null || _items$input === void 0 ? void 0 : _items$input.focus;
                }

                v.fn(args);
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleLayout(_x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var onChangeText = function onChangeText(name, value) {
    setData(function (state) {
      state[name] = value;
      return state;
    });
  };

  var onSubmit = function onSubmit(input) {};

  var value = {
    addTarget: addTarget,
    onChangeText: onChangeText,
    onSubmit: onSubmit
  };
  return _react["default"].createElement(FormContext.Provider, {
    value: value
  }, _react["default"].createElement(_reactNative.View, _extends({
    onLayout: handleLayout
  }, oProps)));
};

var _default = Form;
exports["default"] = _default;