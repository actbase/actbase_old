"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _index2["default"];
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _index3["default"];
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _index4["default"];
  }
});
exports["default"] = exports.ActBase = exports.Text = exports.Article = exports.Aside = exports.Section = exports.Footer = exports.Header = exports.View = exports.Div = void 0;

var _index = _interopRequireDefault(require("./App/index.native"));

var _reactNative = require("react-native");

var _cssToReactNativeTransform = _interopRequireDefault(require("css-to-react-native-transform"));

var _lodash = require("lodash");

var _index2 = _interopRequireDefault(require("./Button/index.native"));

var _index3 = _interopRequireDefault(require("./Form/index.native"));

var _index4 = _interopRequireDefault(require("./Input/index.native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {}; // General

/* babel-plugin-inline-import './Button/styles.css' */
var buttonStyle = ".ab-button {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  padding: 0px 14px;\n  height: 38px;\n  font-size: 14px;\n  font-weight: bold;\n  background: #fff;\n  border: 1px solid #d9d9d9;\n  color: rgba(0, 0, 0, 0.65);\n}\n\n.ab-button-hover {\n}\n\n.ab-button-press {\n  border: 1px solid #007bff;\n  color: #007bff;\n}\n\n.ab-button-disabled {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  border-color: #d9d9d9;\n}\n\n.ab-button-size-xs {\n  padding: 0px 5px;\n  height: 31px;\n  font-size: 12px;\n}\n\n.ab-button-size-lg {\n  padding: 0px 12px;\n  height: 48px;\n  font-size: 18px;\n}\n\n.ab-button-solid {\n  background: #007bff;\n  color: #fff;\n  border: 1px solid #007bff;\n}\n\n.ab-button-solid-press {\n  background: #f00;\n  color: #fff;\n  border: 1px solid #f00;\n}\n\n.ab-button-solid-disabled {\n  color: rgba(0, 0, 0, 0.25);\n  background-color: #f5f5f5;\n  border-color: #d9d9d9;\n}\n\n\n.ab-button-type-link {\n  background: transparent;\n  color: #007bff;\n  border: 1px solid transparent;\n}\n\n.ab-button-type-link-press {\n  color: #f00;\n}\n\n.ab-button-type-link-disabled {\n  color: rgba(0, 0, 0, 0.25);\n}\n";
styles = (0, _lodash.assign)(styles, (0, _cssToReactNativeTransform["default"])(buttonStyle)); // Data Entry

/* babel-plugin-inline-import './Input/styles.css' */
var inputStyle = ".ab-input {\n  border-radius: 4px;\n  padding: 0px 14px;\n  height: 38px;\n  font-size: 14px;\n  background: #fff;\n  border: 1px solid #d9d9d9;\n  color: rgba(0, 0, 0, 0.65);\n}\n";
styles = (0, _lodash.assign)(styles, (0, _cssToReactNativeTransform["default"])(inputStyle)); // Web Migrated

var Div = _reactNative.View;
exports.Div = Div;
var View = _reactNative.View;
exports.View = View;
var Header = _reactNative.View;
exports.Header = Header;
var Footer = _reactNative.View;
exports.Footer = Footer;
var Section = _reactNative.View;
exports.Section = Section;
var Aside = _reactNative.View;
exports.Aside = Aside;
var Article = _reactNative.View;
exports.Article = Article;
var Text = _reactNative.Text;
exports.Text = Text;
_index["default"].styles = styles;
var ActBase = _index["default"];
exports.ActBase = ActBase;
var _default = ActBase;
exports["default"] = _default;