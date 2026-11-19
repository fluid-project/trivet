/**
 * @param {string} id - The current page's id.
 * @param {string} desiredLang - The language of the translated page.
 * @returns {string|false} The URL of the treanslated page, or false if no translation is found.
 */
export default function findTranslationFilter(id, desiredLang) {
	let translationUrl = null;

	for (const element of this.data.collections.all) {
		if (element.data.id === id && element.data.lang === desiredLang) {
			translationUrl = element.url;
		}
	}

	return translationUrl ?? false;
}
