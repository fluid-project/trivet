import { env } from 'node:process';
import fluidPlugin from 'eleventy-plugin-fluid';
import fontAwesomePlugin from '@11ty/font-awesome';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { RenderPlugin } from '@11ty/eleventy';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import parseTransform from './src/_transforms/parse-transform.js';
import siteConfig from './src/_data/config.json' with { type: 'json' };

// Functions
const now = new Date();
const isLive = (post) => post.date <= now && !post.data.draft;

/**
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy(eleventyConfig) {
	// Global Data
	// eleventyConfig.addGlobalData('now', () => new Date());

	// Filters
	eleventyConfig.addFilter('findTranslation', (page, collection = [], lang, desiredLang) => {
		const expectedFilePathStem = page.filePathStem.replace(lang, () => desiredLang);

		let isTranslationUrl = false;

		for (const element of collection) {
			if (element.filePathStem === expectedFilePathStem) {
				isTranslationUrl = element.url;
			}
		}

		return isTranslationUrl;
	});

	// Shortcodes
	eleventyConfig.addShortcode('uioCustomInit', (locale, direction) => {
		const options = {
			preferences: ['fluid.prefs.lineSpace', 'fluid.prefs.textFont', 'fluid.prefs.contrast', 'fluid.prefs.enhanceInputs'],
			auxiliarySchema: {
				terms: {
					templatePrefix: '/lib/infusion/src/framework/preferences/html',
					messagePrefix: '/lib/infusion/src/framework/preferences/messages',
				},
			},
			prefsEditorLoader: {
				lazyLoad: true,
			},
			locale,
			direction,
		};

		return `<script>fluid.uiOptions.multilingual(".flc-prefsEditor-separatedPanel", ${JSON.stringify(options)});</script>`;
	});

	// Transforms
	eleventyConfig.addTransform('parse', parseTransform);

	// Passthrough
	eleventyConfig.addPassthroughCopy({ 'src/admin/config.yml': 'admin/config.yml' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/icons': '/' });
	eleventyConfig.addPassthroughCopy('src/assets/images');
	eleventyConfig.addPassthroughCopy('src/assets/messages');

	// Custom collections
	for (const locale of siteConfig.locales) {
		eleventyConfig.addCollection(`posts_${locale}`, (collection) => collection
			.getFilteredByGlob(`./src/collections/posts/${locale}/*.md`)
			.filter((posts) => isLive(posts)));

		// The following collection is used to create a collection of posts for the RSS feed.
		eleventyConfig.addCollection(`postFeed_${locale}`, (collection) => collection
			.getFilteredByGlob(`./src/collections/posts/${locale}/*.md`)
			.filter((posts) => isLive(posts))
			.toReversed()
			.slice(0, siteConfig.maxPostsInFeed));
	}

	// Plugins
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(fluidPlugin, {
		defaultLanguage: 'en',
		supportedLanguages: {
			en: {
				slug: 'en',
				name: 'English',
			},
			fr: {
				slug: 'fr',
				name: 'Français',
				dir: 'ltr',
				uioSlug: 'fr',
			},
		},
	});
	eleventyConfig.addPlugin(fontAwesomePlugin);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	// Preprocessors
	eleventyConfig.addPreprocessor('drafts', '*', (data, _content) => {
		if (data.draft && env.ELEVENTY_RUN_MODE === 'build') {
			return false;
		}
	});

	return {
		dir: {
			input: 'src',
		},
		templateFormats: ['njk', 'md', 'css', 'png', 'jpg', 'svg'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	};
}
