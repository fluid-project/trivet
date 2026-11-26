export default {
	layout: 'layouts/page.vto',
	permalink(data) {
		return `${data.page.filePathStem.replace('/collections/pages', '')}.html`;
	},

	eleventyComputed: {
		langDir: (data) => data.supportedLanguages[data.lang].dir,
		eleventyNavigation(data) {
			if (data.nav !== true) {
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
