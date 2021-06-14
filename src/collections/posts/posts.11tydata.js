"use strict";

const slugify = require("slugify");
const translations = require("../../_data/translations.json");

module.exports = {
    layout: "layouts/post.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => data.page.filePathStem.replace(/\/collections\/posts\/([a-z]*)\/[a-z0-9-]*/g, "$1"),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => data.page.fileSlug,
        /* Build a permalink using the post title, language key, and translated collection type slug. */
        permalink: data => {
            const lang = data.page.filePathStem.replace(/\/collections\/posts\/([a-z]*)\/[a-z0-9-]*/g, "$1");
            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (lang === "en") ? `/post/${slug}/` : `/${lang}/${translations[lang].post}/${slug}/`;
        }
    }
};
