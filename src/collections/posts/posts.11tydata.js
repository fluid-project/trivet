"use strict";

const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require("eleventy-plugin-i18n-gettext");
const generatePermalink = require("../../utils/generatePermalink.js");

module.exports = {
    layout: "layouts/post.njk",
    eleventyComputed: {
        lang: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        langDir: data => data.defaultLanguageDirection,
        locale: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        permalink: data => {
            const locale = data.locale;
            return generatePermalink(data, "posts", i18n._(locale, "posts"));
        }
    }
};
