import {parseHTML} from 'linkedom';

const parseTransform = (value, outputPath) => {
	if (outputPath && outputPath.endsWith('.html')) {
		const {document} = parseHTML(value);
		const articleImages = [...document.querySelectorAll('main article img')];

		if (articleImages.length > 0) {
			for (const image of articleImages) {
				// Enable native lazy-loading.
				image.setAttribute('loading', 'lazy');
			}
		}

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
};

export default parseTransform;
