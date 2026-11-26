/**
 * @param {string} id - The current page's id.
 * @param {string} desiredLang - The language of the translated page.
 * @returns {string|false} The URL of the translated page, or false if no translation is found.
 */
export default function findTranslationFilter(id, desiredLang) {
	const translation = this.data.collections.all.find((element) => element.data.id === id && element.data.lang === desiredLang);

	return translation?.url ?? false;
}
