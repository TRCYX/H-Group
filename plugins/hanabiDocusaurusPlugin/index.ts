// This is a Docusaurus plugin to automatically create SVG images from the YAML files. This is
// triggered whenever the website is built.

import type { LoadContext, Plugin } from "@docusaurus/types";
import path from "node:path";
import url from "node:url";

/**
 * Using `import.meta.dirname` here results in an error while building:
 *
 * "SyntaxError: Cannot use 'import.meta' outside a module"
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

interface TranslatableContent {
  clueGiver: string;
  unknown: string;
}

export default function hanabiDocusaurusPlugin(
  context: LoadContext,
): Plugin<TranslatableContent> {
  return {
    name: "hanabi-docusaurus-plugin",

    loadContent() {
      return {
        clueGiver: "Clue Giver",
        unknown: "Unknown",
      };
    },

    // eslint-disable-next-line complete/no-mutable-return
    getTranslationFiles() {
      return [
        {
          path: "svg",
          content: {
            clueGiver: {
              message: "Clue Giver",
            },
            unknown: {
              message: "Unknown",
              description: "Name of unknown player",
            },
          },
        },
      ];
    },

    translateContent({ content, translationFiles }) {
      const translationFile = translationFiles.find((f) => f.path === "svg");
      return {
        ...content,
        clueGiver:
          translationFile?.content["clueGiver"]?.message ?? content.clueGiver,
        unknown:
          translationFile?.content["unknown"]?.message ?? content.unknown,
      };
    },

    configureWebpack(_config, _isServer, _utils, contents) {
      let { baseUrl } = context;
      if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1);
      }

      return {
        module: {
          rules: [
            {
              test: /\.yml$/,
              use: [
                // Convert the SVG to a React component:
                // https://react-svgr.com/
                {
                  loader: "@svgr/webpack",
                  options: {
                    /**
                     * We add the "example" class to every SVG so that the text will respect the
                     * light/dark theme.
                     *
                     * @see https://react-svgr.com/docs/options/#svg-props
                     * @see ./src/css/custom.css
                     */
                    svgProps: {
                      className: "example",
                    },

                    /**
                     * By default, SVGR will use the SVG Optimizer on the output. However, SVGO will
                     * mess up the class names, so we have to use the "prefixIds" plugin:
                     * https://svgo.dev/docs/plugins/prefixIds/
                     *
                     * Furthermore, if we specify an SVGO config, it will remove all optimizations,
                     * so we have to first extend from the default presets.
                     */
                    svgoConfig: {
                      plugins: [
                        {
                          name: "preset-default",
                          params: {
                            overrides: {
                              // We must keep the view box to preserve the behavior of automatically
                              // resizing the images as the window size changes.
                              removeViewBox: false,
                            },
                          },
                        },
                        {
                          name: "prefixIds",
                          params: {
                            prefixClassNames: false,
                          },
                        },
                      ],
                    },
                  },
                },

                // Generate an SVG based on the YAML file. (This must be after "@svgr/webpack".)
                {
                  // Webpack loaders do not support TypeScript, so the plugin must be transpiled to
                  // a JavaScript file.
                  loader: path.join(
                    __dirname,
                    "plugin",
                    "dist",
                    "convertYAMLToSVG.js",
                  ),
                  options: {
                    baseUrl,
                    translations: contents,
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
}
