import astroRemark from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';
import remarkGfm from 'remark-gfm';
import remarkTwoslash from 'remark-shiki-twoslash';

export default {
  // Enable Custom Markdown options, plugins, etc.
	markdownOptions: {
		render: [
			astroRemark,
			{
        // Add a Remark plugin to your project.
        remarkPlugins: [
          // [
          //   remarkTwoslash.default, 
          //   {
          //     theme: "dark-plus",
          //     defaultCompilerOptions: {
          //       types: ["node"],
          //     },
          //   },
          // ],
          remarkSmartypants,
          remarkGfm,
        ],

        // Add a Rehype plugin to your project.
        rehypePlugins: [
          [rehypeSlug, {bahavior: 'prepend'}]
        ],

        syntaxHighlight: 'shiki',
        shikiConfig: {
					theme: 'one-dark-pro',
					// Learn more about this configuration here:
					// https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting
				},
			},
		],
	},
  // vite: {
  //   ssr: {
  //     external: ['remark-shiki-twoslash']
  //   },
  // },
  
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    // site: 'http://example.com',           // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    sitemap: true,         // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    // hostname: 'localhost',  // The hostname to run the dev server on.
    // port: 3000,             // The port to run the dev server on.
      tailwindConfig: './tailwind.config.js',
  },
  renderers: [
    '@astrojs/renderer-react'
  ],
  
};
