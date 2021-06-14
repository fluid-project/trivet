"use strict";

const slugify = require("slugify");

module.exports = {
    layout: "layouts/page.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => data.page.filePathStem.replace(/\/collections\/pages\/([a-z]*)\/[a-z0-9-]*/g, "$1"),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => data.page.fileSlug,
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
            const lang = data.page.filePathStem.replace(/\/collections\/pages\/([a-z]*)\/[a-z0-9-]*/g, "$1");
            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (lang === "en") ? `/${slug}/` : `/${lang}/${slug}/`;
        }
    }
};
