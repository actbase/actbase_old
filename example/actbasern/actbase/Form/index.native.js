"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormContext = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _utils = require("../App/utils");

var _lodash = require("lodash");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormContext = _react["default"].createContext({});

exports.FormContext = FormContext;

var Form = function Form(props) {
  var elements = (0, _react.useRef)({});

  var _a = (0, _react.useState)({}),
      data = _a[0],
      setData = _a[1];

  var _b = (0, _react.useState)({}),
      lastLayout = _b[0],
      setLastLayout = _b[1];

  var onLayout = props.onLayout,
      oProps = (0, _tslib.__rest)(props, ["onLayout"]);
  var addTarget = (0, _react.useCallback)(function (name, input, fn) {
    elements.current[name] = {
      name: name,
      input: input,
      fn: fn
    };
  }, []);

  var handleLayout = function handleLayout(e) {
    return (0, _tslib.__awaiter)(void 0, void 0, void 0, function () {
      var _a, width, height, pos, _i, _b, key, el, pos_1, area, items;

      var _c, _d, _e, _f;

      return (0, _tslib.__generator)(this, function (_g) {
        switch (_g.label) {
          case 0:
            onLayout && onLayout(e);
            _a = e.nativeEvent.layout, width = _a.width, height = _a.height;
            pos = {
              width: width,
              height: height
            };
            if ((0, _lodash.isEqual)(lastLayout, pos)) return [2
            /*return*/
            ];
            setLastLayout(pos);
            _i = 0, _b = Object.keys((_c = elements) === null || _c === void 0 ? void 0 : _c.current);
            _g.label = 1;

          case 1:
            if (!(_i < _b.length)) return [3
            /*break*/
            , 4];
            key = _b[_i];
            el = (_d = elements) === null || _d === void 0 ? void 0 : _d.current[key];
            return [4
            /*yield*/
            , (0, _utils.measure)((0, _reactNative.findNodeHandle)(el.input))];

          case 2:
            pos_1 = _g.sent();
            area = parseFloat(Math.floor(pos_1.pageY) + "." + Math.floor(pos_1.pageX));
            elements.current[key].area = area;
            _g.label = 3;

          case 3:
            _i++;
            return [3
            /*break*/
            , 1];

          case 4:
            items = Object.values(elements.current);
            (_f = (_e = items) === null || _e === void 0 ? void 0 : _e.sort(function (a, b) {
              return a.area > b.area ? 1 : a.area < b.area ? -1 : 0;
            })) === null || _f === void 0 ? void 0 : _f.map(function (v, index) {
              var _a;

              var args = {};

              if (items.length - 1 <= index) {
                args.returnKeyType = 'done';
              } else {
                args.returnKeyType = 'next';
                args.onSubmitEditing = (_a = items[index + 1].input) === null || _a === void 0 ? void 0 : _a.focus;
              }

              v.fn(args);
            });
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var onChangeText = (0, _react.useCallback)(function (name, value) {
    setData(function (state) {
      state[name] = value;
      return state;
    });
  }, []);

  var submit = function submit(input) {
    var _a, _b, _c;

    var result = data;

    if (props.output === 'FormData') {
      result = new FormData();
      (0, _lodash.forIn)(data, function (value, name) {
        return result.append(name, "" + value);
      });
    }

    (_c = (_a = props) === null || _a === void 0 ? void 0 : (_b = _a).onSubmit) === null || _c === void 0 ? void 0 : _c.call(_b, result);
  };

  var value = {
    addTarget: addTarget,
    onChangeText: onChangeText,
    submit: submit
  };
  return _react["default"].createElement(FormContext.Provider, {
    value: value
  }, _react["default"].createElement(_reactNative.View, _extends({
    onLayout: handleLayout
  }, oProps)));
};

var _default = Form;
exports["default"] = _default;