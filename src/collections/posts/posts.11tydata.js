import { __ } from 'eleventy-plugin-fluid';

export default {
	layout: 'layouts/post.vto',
	eleventyComputed: {
		langDir: (data) => data.supportedLanguages[data.lang].dir,
		permalink(data) {
			return `${data.page.filePathStem.replace('/collections/posts/fr', 'fr/articles').replace('/collections/posts', 'posts')}/`;
		},
	},
};
