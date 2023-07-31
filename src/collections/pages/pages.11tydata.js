"use strict";

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const generatePermalink = require("../../utils/generatePermalink.js");

module.exports = {
    eleventyComputed: {
        /* Determine the language of this page based on the language code in the file path. */
        lang: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        langDir: data => data.defaultLanguageDirection,
        locale: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        eleventyNavigation: data => {
            /* If this page has an `order` attribute, create an Eleventy Navigation object for it. */
            if (data.order) {
                return {
                    parent: data.parent,
                    order: data.order,
                    /* If a key is set, use that for the navigation item label; otherwise use the page title. */
                    key: data.hasOwnProperty("key") ? data.key : data.title,
                    lang: data.lang
                };
            }
            return false;
        },
        /* Build a permalink using the page title and language. */
        permalink: data => generatePermalink(data, "pages")
    }
};
