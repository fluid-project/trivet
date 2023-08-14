"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");
const { generatePermalink } = require("eleventy-plugin-fluid");

module.exports = {
    /* Build a permalink using the page title and language. */
    permalink: data => {
        const locale = data.locale;
        return generatePermalink(data, "pages", false, i18n._(locale, "page"));
    },
    eleventyComputed: {
        langDir: data => data.supportedLanguages[data.locale].dir,
        eleventyNavigation: data => {
            /* If this page has an `order` attribute, create an Eleventy Navigation object for it. */
            if (data.order) {
                return {
                    parent: data.parent,
                    order: data.order,
                    /* If a key is set, use that for the navigation item label; otherwise use the page title. */
                    key: data.hasOwnProperty("key") ? data.key : data.title,
                    lang: data.locale
                };
            }
            return false;
        }
    }
};
