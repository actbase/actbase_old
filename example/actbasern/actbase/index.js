"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Button = exports.Text = exports.Article = exports.Aside = exports.Section = exports.Footer = exports.Header = exports.View = exports.Div = exports.ActBase = void 0;

var React = _interopRequireWildcard(require("react"));

var _App = _interopRequireDefault(require("./App"));

var _index = _interopRequireDefault(require("./Button/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ActBase = _App["default"];
exports.ActBase = ActBase;

var Div = function Div(props) {
  return React.createElement("div", props);
};

exports.Div = Div;

var View = function View(props) {
  return React.createElement("div", props);
};

exports.View = View;

var Header = function Header(props) {
  return React.createElement("header", props);
};

exports.Header = Header;

var Footer = function Footer(props) {
  return React.createElement("footer", props);
};

exports.Footer = Footer;

var Section = function Section(props) {
  return React.createElement("section", props);
};

exports.Section = Section;

var Aside = function Aside(props) {
  return React.createElement("aside", props);
};

exports.Aside = Aside;

var Article = function Article(props) {
  return React.createElement("article", props);
};

exports.Article = Article;

var Text = function Text(props) {
  return React.createElement("span", props);
}; // General


exports.Text = Text;
var Button = _index["default"]; // Layout
// Navigation
// Data Entry
// Data Display
// Feedback
// Other

exports.Button = Button;
var _default = ActBase;
exports["default"] = _default;