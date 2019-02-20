import pluginJsx from '@babel/plugin-syntax-jsx';
import * as types from '@babel/types';

export default function babelPluginPreactFragment() {
  return {
    inherits: pluginJsx,
    visitor: {
      CallExpression(p) {
        if (p.node.callee.type === 'MemberExpression' && p.node.callee.property.name === 'createElement') {
          if (p.node.arguments[0].property && p.node.arguments[0].property.name === 'Fragment') {
            p.replaceWithMultiple(p.node.arguments.slice(2));
          }
        }
      },
      JSXElement(p) {
        if (!p.node.openingElement) return;
        const { children } = p.node;
        if (children.length > 1) return;

        if (this.hasImportedFragment && p.node.openingElement.name && p.node.openingElement.name.name === 'Fragment') {
          const filteredChildren = children
            .filter(c => !types.isJSXText(c))
            .map(c => (types.isJSXExpressionContainer(c) ? c.expression : c));

          p.replaceWithMultiple(filteredChildren);
          return;
        }

        if (!p.node.openingElement.name.object) return;

        if (p.node.openingElement.name.object.name === 'React' && p.node.openingElement.name.property.name === 'Fragment') {
          p.replaceWithMultiple(children);
        }
      },
      ImportDeclaration(p) {
        const importSpecifiers = p.node.specifiers.filter(s => s.type === 'ImportSpecifier');
        if (importSpecifiers.length === 0) return;
        if (importSpecifiers.some(s => s.imported.name === 'Fragment')) {
          this.hasImportedFragment = true;
        }
      },
    },
  };
}
