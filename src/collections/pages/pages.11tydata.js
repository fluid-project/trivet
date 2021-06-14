"use strict";

const slugify = require("slugify");

module.exports = {
    layout: "layouts/page.njk",
    eleventyComputed: {
        lang: data => data.page.filePathStem.replace(/\/collections\/pages\/([a-z]*)\/[a-z0-9-]*/g, "$1"),
        eleventyNavigation: data => {
            if (data.order) {
                return {
                    parent: data.lang,
                    order: data.order,
                    key: data.hasOwnProperty("key") ? data.key : data.title
                };
            }
            return false;
        },
        permalink: data => {
            const slug = slugify(data.title, {
                replacement: "-",
                lower: true,
                strict: true
            });

            return (data.lang === "en") ? `/${slug}/` : `/${data.lang}/${slug}/`;
        }
    }
};
