import { parseHTML } from 'linkedom';

/**
 * @param {string} value The content of the file to transform.
 * @param {string} outputPath The output path of the file to transform.
 *
 * @returns {string} The transformed string.
 */
export default function parseTransform(value, outputPath) {
	if (outputPath && outputPath.endsWith('.html')) {
		const { document } = parseHTML(value);
		const articleImages = [...document.querySelectorAll('main article img')];

		for (const image of articleImages) {
			// Enable native lazy-loading.
			image.setAttribute('loading', 'lazy');
		}

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
}
