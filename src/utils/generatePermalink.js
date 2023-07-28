"use strict";

const config = require("../_data/config.json");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const TemplateConfig = require("@11ty/eleventy/src/TemplateConfig.js");

module.exports = (data, collectionType, collectionSlug) => {
    /* If this post is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!data.hasOwnProperty("title")) {
        return false;
    }

    const lang = EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath);
    const langSlug = config.languages[lang].slug || lang;
    const eleventyConfig = new TemplateConfig();
    const slugify = eleventyConfig.userConfig.getFilter("slugify");

    if (collectionType === "pages") {
        /* If the page is a 404 page, return 404.html, optionally prepended with the language code. */
        if (data.page.fileSlug === "404") {
            return (lang === data.defaultLanguage) ? "/404.html" : `/${langSlug}/404.html`;
        }

        /** If the page is the index page, the basepath, optionally prepended with the language code. */
        if (data.page.fileSlug === lang) {
            return (lang === data.defaultLanguage) ? "/" : `/${langSlug}/`;
        }

        /* If the page is not the index page, return the slugified page title, optionally prepended with the language code. */
        const slug = slugify(data.title);
        return (lang === data.defaultLanguage) ? `/${slug}/` : `/${langSlug}/${slug}/${data.hasOwnProperty("pagination") && data.pagination.pageNumber > 0 ? "page/" + data.pagination.pageNumber + 1 + "/" : ""}`;
    } else {
        const slug = slugify(data.title);
        return (lang === data.defaultLanguage) ? `/${collectionSlug}/${slug}/` : `/${langSlug}/${collectionSlug}/${slug}/`;
    }
};
