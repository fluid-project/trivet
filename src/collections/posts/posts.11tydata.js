"use strict";

const slugify = require("slugify");

module.exports = {
    layout: "layouts/post.njk",
    eleventyComputed: {
        lang: data => data.page.filePathStem.replace(/\/collections\/posts\/([a-z]*)\/[a-z0-9-]*/g, "$1"),
        permalink: data => {
            const lang = data.page.filePathStem.replace(/\/collections\/posts\/([a-z]*)\/[a-z0-9-]*/g, "$1");
            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (lang === "en") ? `/${slug}/` : `/${lang}/${slug}/`;
        }
    }
};
