import type { ConfigAPI, PluginObj } from "@babel/core";
import { types as t } from "@babel/core";

// Replace the link in every <image xlinkHref="/img/..." ...> to that suggested by docusaurus.
export default function fixStaticImagePath(_: ConfigAPI): PluginObj {
  return {
    visitor: {
      JSXOpeningElement(path) {
        if (
          !t.isJSXIdentifier(path.node.name) ||
          path.node.name.name !== "image"
        ) {
          return;
        }

        for (const attribute of path.get("attributes")) {
          if (
            attribute.isJSXAttribute() &&
            attribute.get("name").isJSXIdentifier({ name: "xlinkHref" })
          ) {
            const value = attribute.get("value");
            t.assertStringLiteral(value.node);
            // See the require example [here](https://docusaurus.io/docs/static-assets#in-jsx).
            const newValueExpr = t.memberExpression(
              t.callExpression(t.identifier("require"), [
                t.stringLiteral(`@site/static${value.node.value}`),
              ]),
              t.identifier("default"),
            );
            value.replaceWith(t.jsxExpressionContainer(newValueExpr));
            break;
          }
        }
      },
    },
  };
}
