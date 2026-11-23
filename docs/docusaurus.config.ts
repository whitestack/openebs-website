import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


// On Netlify deploy previews the site is served at the root of a standalone
const baseUrl = '/whitecruiser-openebs/';

const config: Config = {
  title: 'OpenEBS Docs',
  tagline: 'OpenEBS Docs: Information regarding the latest releases',
  url: 'https://customers.whitestack.com',
  baseUrl,
  // Older 3.x versioned docs use absolute /docs/... paths from the 2.x site
  // which don't exist in the current site structure. These are archived content.
  // main/ and 4.6.x have no broken links (verified).
  onBrokenLinks: 'ignore',
  // Older 3.x versioned docs have anchors pointing to headings that no longer exist
  // (e.g., #top, old FAQ anchors). main/ and 4.6.x have been fixed.
  onBrokenAnchors: 'ignore',
  markdown: {
    // 'detect': .md files → CommonMark (no JSX parsing), .mdx files → MDX.
    // Older version docs (.md) have HTML/JSX-incompatible content;
    // custom React components are only used in .mdx files.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/favicon.ico',
  organizationName: 'whitestack',
  projectName: 'openebs-website',

  future: {
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    currentYear: new Date().getFullYear(),
    breakpoints: {
      xs: 0,
      sm: 767,
      md: 996,
      lg: 1100,
      xl: 0,
    },
  },

  presets: [
    [
      'classic',
      {        docs: {
          path: 'main',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          includeCurrentVersion: true,
          lastVersion: '4.6.x',
          // Exclude orphan legacy pages with broken links to deprecated content.
          // These can be re-added once their links are updated for the new structure.
          exclude: ['stateful-applications/**'],
          versions: {
            current: {
              label: 'main',
              path: 'main',
              banner: 'unreleased',
            },
            '4.6.x': {
              label: '4.6.x',
              // No path — lastVersion serves at /docs/[slug] (root)
            },
            '4.5.x': {
              label: '4.5.x',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: '/',
        docsDir: 'main',
        searchResultLimits: 8,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Redirect old absolute paths (used in stateful-applications pages)
        // to their current equivalents in the reorganised docs structure.
        redirects: [
          {
            from: '/introduction/usecases',
            to: '/introduction-to-openebs/usecases',
          },
          {
            from: '/user-guides/installation',
            to: '/quickstart-guide/installation',
          },
          {
            from: '/user-guides/localpv-hostpath',
            to: '/user-guides/local-storage-user-guide/local-pv-hostpath/hostpath-overview',
          },
          {
            from: '/user-guides/localpv-device',
            to: '/user-guides/local-storage-user-guide/local-pv-lvm/lvm-overview',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    image: 'img/card-openebs.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'OpenEBS Logo',
        src: 'img/openebs.svg',
        href: '/',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Whitestack. All rights reserved`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
