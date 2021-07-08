"use strict";

const slugify = require("slugify");
const translations = require("../../_data/translations.json");

module.exports = {
    layout: "layouts/post.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => data.page.filePathStem.replace(/\/collections\/posts\/([A-Za-z-]*)\/[a-z0-9-]*/g, "$1"),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => data.page.fileSlug,
        /* Build a permalink using the post title, language key, and translated collection type slug. */
        permalink: data => {
            /* If this post is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
            if (!Object.hasOwnProperty(data, "title")) {
                return false;
            }
            const lang = data.page.filePathStem.replace(/\/collections\/posts\/([A-Za-z-]*)\/[a-z0-9-]*/g, "$1");
            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (lang === "en-CA") ? `/post/${slug}/` : `/${lang.split("-")[0]}/${translations[lang].post}/${slug}/`;
        }
    }
};
