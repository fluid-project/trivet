"use strict";

const slugify = require("slugify");

module.exports = {
    layout: "layouts/page.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => data.page.filePathStem.replace(/\/collections\/pages\/([A-Za-z-]*)\/[a-z0-9-]*/g, "$1"),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => {
            const lang = data.page.filePathStem.replace(/\/collections\/pages\/([A-Za-z-]*)\/[a-z0-9-]*/g, "$1");

            if (data.page.fileSlug === lang) {
                return "index";
            }

            return data.page.fileSlug;
        },
        eleventyNavigation: data => {
            /* If this page has an `order` attribute, create an Eleventy Navigation object for it. */
            if (data.order) {
                return {
                    parent: data.lang,
                    order: data.order,
                    /* If a key is set, use that for the navigation item label; otherwise use the page title. */
                    key: data.hasOwnProperty("key") ? data.key : data.title
                };
            }
            return false;
        },
        /* Build a permalink using the post title and language key. */
        permalink: data => {
            /* If this page is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
            if (!Object.hasOwnProperty(data, "title")) {
                return false;
            }

            const lang = data.page.filePathStem.replace(/\/collections\/pages\/([A-Za-z-]*)\/[a-z0-9-]*/g, "$1");

            /* Handle permalink for home pages differently. */
            if (data.page.fileSlug === lang) {
                return (lang === "en-CA") ? "/" : `/${lang.split("-")[0]}/`;
            }

            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (lang === "en-CA") ? `/${slug}/` : `/${lang.split("-")[0]}/${slug}/`;
        }
    }
};
