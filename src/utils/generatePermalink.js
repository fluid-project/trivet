"use strict";

const getLang = require("./getLang.js");
const getShortLang = require("./getShortLang.js");
const slugFilter = require("../../node_modules/eleventy-plugin-fluid/src/filters/slug-filter.js");
const translations = require("../_data/translations.json");

module.exports = (data, collectionType) => {
    /* If this post is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!Object.prototype.hasOwnProperty.call(data, "title")) {
        return false;
    }

    const lang = getLang(data.page.filePathStem, collectionType);
    const shortLang = getShortLang(lang);
    const slug = slugFilter(data.title);

    if (collectionType === "pages") {
        if (data.page.fileSlug === lang) {
            return (lang === "en-CA") ? "/" : `/${shortLang}/`;
        }

        return (lang === "en-CA") ? `/${slug}/` : `/${shortLang}/${slug}/`;
    } else {
        return `/${shortLang}/${translations[lang][collectionType]}/${slug}/`;
    }
};
