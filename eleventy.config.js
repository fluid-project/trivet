import { env } from 'node:process';
import fluidPlugin from 'eleventy-plugin-fluid';
import fontAwesomePlugin from '@11ty/font-awesome';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { HtmlBasePlugin, RenderPlugin } from '@11ty/eleventy';
import pluginRss, { dateToRfc3339, getNewestCollectionItemDate } from '@11ty/eleventy-plugin-rss';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import { VentoPlugin } from 'eleventy-plugin-vento';
import parseTransform from './src/_transforms/parse-transform.js';
import siteConfig from './src/_data/site.json' with { type: 'json' };
import findTranslationFilter from './src/_filters/find-translation-filter.js';

// Functions
const now = new Date();
const isLive = (post) => post.date <= now && !post.data.draft;

/**
 * @param {object} $config The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy($config) {
	const supportedLanguages = {
		en: {
			slug: 'en',
			name: 'English',
			dir: 'ltr',
			uioSlug: 'en_CA',
		},
		fr: {
			slug: 'fr',
			name: 'Français',
			dir: 'ltr',
			uioSlug: 'fr',
		},
	};

	// Global Data
	// Add global data here.

	// Filters
	$config.addFilter('findTranslationById', findTranslationFilter);
	$config.addFilter('dateToRfc3339', dateToRfc3339);
	$config.addFilter('getNewestCollectionItemDate', getNewestCollectionItemDate);

	// Shortcodes
	$config.addShortcode('uioCustomInit', (locale, direction) => {
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
	$config.addTransform('parse', parseTransform);

	// Passthrough Copy
	$config.addPassthroughCopy({ 'src/admin/config.yml': 'admin/config.yml' });
	$config.addPassthroughCopy({ 'src/assets/icons': '/' });
	$config.addPassthroughCopy('src/assets/images');
	$config.addPassthroughCopy('src/assets/uploads');

	// Custom collections
	for (const lang of ['en', 'fr']) {
		$config.addCollection(`posts_${lang}`, (collection) => collection
			.getFilteredByGlob(`./src/collections/posts/${lang}/*.md`)
			.filter((posts) => isLive(posts)));

		// The following collection is used to create a collection of posts for the RSS feed.
		$config.addCollection(`feed_${lang}`, (collection) => collection
			.getFilteredByGlob(`./src/collections/posts/${lang}/*.md`)
			.filter((posts) => isLive(posts))
			.toReversed()
			.slice(0, siteConfig.en.maxPostsInFeed));
	}

	// Plugins
	$config.addPlugin(eleventyNavigationPlugin);
	$config.addPlugin(HtmlBasePlugin);
	$config.addPlugin(fluidPlugin, {
		defaultLanguage: 'en',
		//	Use the `override:` prefix to replace default languages: https://www.11ty.dev/docs/data-cascade/#using-the-override-prefix
		'override:supportedLanguages': supportedLanguages,
	});
	$config.addPlugin(VentoPlugin);
	$config.addPlugin(fontAwesomePlugin);
	$config.addPlugin(pluginRss);
	$config.addPlugin(RenderPlugin);
	$config.addPlugin(syntaxHighlightPlugin);

	// Preprocessors
	$config.addPreprocessor('drafts', '*', (data, _content) => {
		if (data.draft && env.ELEVENTY_RUN_MODE === 'build') {
			return false;
		}
	});

	return {
		dir: {
			input: 'src',
		},
		templateFormats: ['vto', 'md'],
		htmlTemplateEngine: 'vto',
		markdownTemplateEngine: 'vto',
	};
}
