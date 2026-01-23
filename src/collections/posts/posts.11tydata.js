import {__, generatePermalink} from 'eleventy-plugin-fluid';

export default {
	layout: 'layouts/post',
	eleventyComputed: {
		langDir: data => data.supportedLanguages[data.lang].dir,
		permalink(data) {
			return generatePermalink(data, 'posts', __('posts', {}, data));
		},
	},
};
