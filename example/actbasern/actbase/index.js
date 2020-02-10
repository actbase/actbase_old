"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Button = exports.Text = exports.Article = exports.Aside = exports.Section = exports.Footer = exports.Header = exports.View = exports.Div = exports.ActBase = void 0;

var _App = _interopRequireDefault(require("./App"));

var _index = _interopRequireDefault(require("./Button/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActBase = _App["default"];
exports.ActBase = ActBase;
var Div = div;
exports.Div = Div;
var View = div;
exports.View = View;
var Header = header;
exports.Header = Header;
var Footer = footer;
exports.Footer = Footer;
var Section = section;
exports.Section = Section;
var Aside = aside;
exports.Aside = Aside;
var Article = article;
exports.Article = Article;
var Text = span; // General

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