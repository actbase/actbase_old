"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = _interopRequireDefault(require("./styles.css"));

var _utils = require("../App/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      oProps = _objectWithoutProperties(props, ["size", "type", "style", "children", "disabled", "onPress", "onPressIn", "onPressOut", "forceInset"]);

  var classes = ["_".concat(STYLE_GROUP_NAME)];
  var context = (0, _react.useContext)(_utils.ABContext);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      press = _useState2[0],
      setPress = _useState2[1];

  if (press) classes.push("_".concat(STYLE_GROUP_NAME, "-press"));

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hover = _useState4[0],
      setHover = _useState4[1];

  if (hover) classes.push("_".concat(STYLE_GROUP_NAME, "-hover"));
  if (disabled) classes.push("_".concat(STYLE_GROUP_NAME, "-disabled"));
  if (['xs', 'lg'].indexOf(size) >= 0) classes.push("_".concat(STYLE_GROUP_NAME, "-size-").concat(size));
  var handlePressIn = (0, _react.useCallback)(function (e) {
    onPressIn && onPressIn(e);
    setPress(true);
  }, []);
  var handlePressOut = (0, _react.useCallback)(function (e) {
    onPressOut && onPressOut(e);
    setPress(false);
  }, []);

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      process = _useState6[0],
      setProcess = _useState6[1];

  var handleClick = (0, _react.useCallback)(function (e) {
    if (process > 0) return;
    setProcess(1);

    try {
      var o = onPress && onPress();

      if (o instanceof Promise) {
        setProcess(2);
        o.then(function () {
          setProcess(0);
        })["catch"](function (e) {
          setProcess(0);
          console.warn(e);
        });
      } else {
        setTimeout(function () {
          return setProcess(0);
        }, 200);
      }
    } catch (e) {
      console.warn(e);
      setProcess(0);
    }
  }, [process]);
  var className = classes.concat(classes.map(function (v) {
    return v.substring(1);
  }));

  if (type) {
    var ix = STYLE_GROUP_NAME.length + 1;
    className = className.concat(classes.map(function (v) {
      return "".concat(STYLE_GROUP_NAME, "-").concat(type).concat(v.substring(ix));
    }));
  } // const elementStyle = StyleSheet.flatten(
  //   className.map(v => context.theme[v] || styles[v]).concat([style]),
  // );


  var Element1 = View;
  var Element2 = View;
  var args = {};
  var coverStyle = elementStyle;
  var innerStyle = {};
  return _react["default"].createElement("button", null);
};

var _default = Button;
exports["default"] = _default;