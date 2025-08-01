import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "H-Group Conventions",
  tagline: undefined,
  favicon: "img/favicon.ico",

  url: "https://trcyx.github.io",
  baseUrl: "/H-Group/",

  organizationName: "hanabi",
  projectName: "hanabi.github.io",

  onBrokenAnchors: "throw",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",

  i18n: {
    defaultLocale: "zh",
    locales: ["en", "zh"],
    localeConfigs: {
      zh: {
        label: "中文",
        htmlLang: "zh-Hans",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root.
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/trcyx/H-Group/edit/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "H-Group Conventions",
      logo: {
        alt: "H-Group Logo",
        src: "img/logo.png",
      },
      items: [
        {
          to: "beginner",
          activeBasePath: "docs",
          label: "Beginner",
          position: "left",
        },
        {
          to: "learning-path",
          activeBasePath: "docs",
          label: "Learning Path",
          position: "left",
        },
        {
          to: "reference",
          activeBasePath: "docs",
          label: "Reference",
          position: "left",
        },
        {
          to: "variant-specific",
          activeBasePath: "docs",
          label: "Variant-Specific",
          position: "left",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/trcyx/H-Group/",
          className: "header-github-link",
          position: "right",
        },
        {
          href: "https://discord.gg/FADvkJp",
          className: "header-discord-link",
          position: "right",
        },
      ],
    },

    docs: {
      sidebar: {
        hideable: true,
      },
    },

    algolia: {
      appId: "24AGYEOQ7J", // cspell:disable-line
      apiKey: "7e647fd7de142915da9f459b345dfca4",
      indexName: "hanabi-conventions",
      contextualSearch: false, // Enabled by default; only useful for versioned sites.
    },

    colorMode: {
      defaultMode: "dark",
    },
  } satisfies Preset.ThemeConfig,

  // -------------------------
  // Added fields from vanilla
  // -------------------------

  plugins: ["./plugins/hanabiDocusaurusPlugin/index.ts"],
  scripts: [
    // Font Awesome is used for the icons on the landing page.
    // https://fontawesome.com/kits/1932a73877/setup
    {
      src: "https://kit.fontawesome.com/1932a73877.js",
      crossorigin: "anonymous",
    },

    // We provide some keyboard shortcuts for easier navigation.
    "/H-Group/js/hotkey.js",
  ],
  future: {
    experimental_faster: true,
    v4: true,
  },

  // Enable Mermaid diagrams:
  // https://docusaurus.io/docs/next/markdown-features/diagrams
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
