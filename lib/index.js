"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = babelPluginPreactFragment;

var _pluginSyntaxJsx = _interopRequireDefault(require("@babel/plugin-syntax-jsx"));

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
          p.replaceWithMultiple(p.node.children);
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