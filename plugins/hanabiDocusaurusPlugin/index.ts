// This is a Docusaurus plugin to automatically create SVG images from the YAML files. This is
// triggered whenever the website is built.

import type {
  LoadContext,
  Plugin,
  TranslationFile,
  TranslationMessage,
} from "@docusaurus/types";
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
  color: {
    red: string;
    yellow: string;
    black: string;
    purple: string;
    blue: string;
    green: string;
    rainbow: string;
    pink: string;
    focus: string;
    play: string;
    chop: string;
    fresh: string;
    bad: string;
    brown: string;
  };
  shortColor: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
    purple: string;
  };
  Rainbow: {
    text: string;
    extraWidth: number;
    decreaseOffset: number;
  };
  bigText: {
    Bluff: string;
    Finesse: string;
    "Illegal!": string;
  };
}

function translateContentSubObject<
  K extends "color" | "shortColor" | "bigText",
>(
  key: K,
  content: TranslatableContent,
  translationFile?: TranslationFile,
): TranslatableContent[K] {
  return Object.fromEntries(
    Object.entries(content[key]).map(([k, v]) => [
      k,
      translationFile?.content[`${key}.${k}`]?.message ?? v,
    ]),
  ) as TranslatableContent[K];
}

function parseTranslationInt(s: string | undefined): number | undefined {
  return s === undefined ? undefined : Number.parseInt(s, 10);
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
        color: {
          red: "red",
          yellow: "yellow",
          black: "black",
          purple: "purple",
          blue: "blue",
          green: "green",
          rainbow: "rainbow",
          pink: "pink",
          focus: "focus",
          play: "play",
          chop: "chop",
          fresh: "fresh",
          bad: "bad",
          brown: "brown",
        },
        shortColor: {
          red: "(R)",
          blue: "(B)",
          green: "(G)",
          yellow: "(Y)",
          purple: "(P)",
        },
        bigText: {
          Bluff: "Bluff",
          Finesse: "Finesse",
          "Illegal!": "Illegal!",
        },
        Rainbow: {
          text: "Rainbow",
          extraWidth: 21,
          decreaseOffset: 13,
        },
      };
    },

    // eslint-disable-next-line complete/no-mutable-return
    getTranslationFiles({ content }) {
      return [
        {
          path: "svg",
          content: Object.fromEntries([
            [
              "clueGiver",
              {
                message: "Clue Giver",
              } as const,
            ],
            [
              "unknown",
              {
                message: "Unknown",
                description: "Name of unknown player",
              } as const,
            ],
            ...Object.keys(content.color).map(
              (k) =>
                [
                  `color.${k}`,
                  { message: k, description: `Lowercase of ${k}` },
                ] as const,
            ),
            ...Object.keys(content.shortColor).map(
              (k) =>
                [
                  `shortColor.${k}`,
                  {
                    message: `(${k.charAt(0).toUpperCase()})`,
                  } as TranslationMessage,
                ] as const,
            ),
            [
              "Rainbow.text",
              {
                message: "Rainbow",
                description: "Start of Rainbow text boxes",
              } as const,
            ],
            [
              "Rainbow.extraWidth",
              {
                message: "21",
                description:
                  "Numerical extra width of text boxes starting with Rainbow.text",
              } as const,
            ],
            [
              "Rainbow.decreaseOffset",
              {
                message: "13",
                description:
                  "Numerical decrease of offset of text boxes starting with Rainbow.text",
              } as const,
            ],
            ...Object.keys(content.bigText).map(
              (k) =>
                [`bigText.${k}`, { message: k } as TranslationMessage] as const,
            ),
          ]),
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
        color: translateContentSubObject("color", content, translationFile),
        shortColor: translateContentSubObject(
          "shortColor",
          content,
          translationFile,
        ),
        bigText: translateContentSubObject("bigText", content, translationFile),
        Rainbow: {
          text:
            translationFile?.content["Rainbow.text"]?.message
            ?? content.Rainbow.text,
          extraWidth:
            parseTranslationInt(
              translationFile?.content["Rainbow.extraWidth"]?.message,
            ) ?? content.Rainbow.extraWidth,
          decreaseOffset:
            parseTranslationInt(
              translationFile?.content["Rainbow.decreaseOffset"]?.message,
            ) ?? content.Rainbow.decreaseOffset,
        },
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
