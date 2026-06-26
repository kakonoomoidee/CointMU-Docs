import { defineConfig } from 'vitepress'

/**
 * VitePress site configuration for the CointMU documentation portal.
 * It defines the global metadata, top navigation, and sidebar structure for the
 * core guides and CLI reference.
 */
export default defineConfig({
  title: 'CointMU Docs',
  description: 'The official documentation for the CointMU ecosystem.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'CLI Reference', link: '/cli/overview' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Introduction', link: '/guide/introduction' }],
      },
      {
        text: 'Core Guides',
        items: [
          { text: 'Network & Node Setup', link: '/guide/network-setup' },
          { text: 'Deploying Your First Token', link: '/guide/deploying-first-token' },
        ],
      },
      {
        text: 'CLI Tooling',
        items: [{ text: 'CointMU CLI Reference', link: '/cli/overview' }],
      },
    ],
  },
})