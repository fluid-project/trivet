import {generatePermalink} from 'eleventy-plugin-fluid';

export default {
	permalink(data) {
		return generatePermalink(data, 'pages');
	},

	eleventyComputed: {
		langDir: data => data.supportedLanguages[data.lang].dir,
		eleventyNavigation(data) {
			/* If this page has an `order` attribute, create an Eleventy Navigation object for it. */
			if (data.order === 0) {
				return false;
			}

			return {
				key: data.uuid,
				title: data.title,
				order: data.order,
				parent: data.parent ?? false,
				lang: data.lang,
			};
		},
	},
};
