import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
    vite: {
        ssr: {
            external: ['svgo'],
        },
    },
    // Enable Custom Markdown options, plugins, etc.
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            theme: 'one-dark-pro', // Learn more about this configuration here:
            // https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting
        },
    },
    // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // pages: './src/pages', // Path to Astro components, pages, and data
    // dist: './dist',       // When running `astro build`, path to final static output
    // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    // site: 'http://example.com',           // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    integrations: [
        react(),
        tailwind({
            // Example: Provide a custom path to a Tailwind config file
            config: {
                path: 'tailwind.config.js',
                applyBaseStyles: false,
            },
        }),
        image(),
        mdx(),
    ],
});
