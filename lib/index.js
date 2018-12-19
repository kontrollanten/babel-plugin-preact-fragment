"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = babelPluginPreactFragment;

var _pluginSyntaxJsx = _interopRequireDefault(require("@babel/plugin-syntax-jsx"));

var types = _interopRequireWildcard(require("@babel/types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function babelPluginPreactFragment() {
  return {
    inherits: _pluginSyntaxJsx.default,
    visitor: {
      CallExpression: function CallExpression(p) {
        if (p.node.callee.type === 'MemberExpression' && p.node.callee.property.name === 'createElement') {
          if (p.node.arguments[0].property && p.node.arguments[0].property.name === 'Fragment') {
            p.replaceWithMultiple(p.node.arguments.slice(2));
          }
        }
      },
      JSXElement: function JSXElement(p) {
        if (!p.node.openingElement) return;

        if (this.hasImportedFragment && p.node.openingElement.name && p.node.openingElement.name.name === 'Fragment') {
          var filteredChildren = p.node.children.filter(function (c) {
            return !types.isJSXText(c);
          }).map(function (c) {
            return types.isJSXExpressionContainer(c) ? c.expression : c;
          });
          p.replaceWithMultiple(filteredChildren);
          return;
        }

        if (!p.node.openingElement.name.object) return;

        if (p.node.openingElement.name.object.name === 'React' && p.node.openingElement.name.property.name === 'Fragment') {
          p.replaceWithMultiple(p.node.children);
        }
      },
      ImportDeclaration: function ImportDeclaration(p) {
        var importSpecifiers = p.node.specifiers.filter(function (s) {
          return s.type === 'ImportSpecifier';
        });
        if (importSpecifiers.length === 0) return;

        if (importSpecifiers.some(function (s) {
          return s.imported.name === 'Fragment';
        })) {
          this.hasImportedFragment = true;
        }
      }
    }
  };
}