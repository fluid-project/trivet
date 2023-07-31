/*
Copyright the Trivet copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/trivet/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/trivet/raw/main/LICENSE.md.
*/

"use strict";

const fluidPlugin = require("eleventy-plugin-fluid");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const i18n = require("eleventy-plugin-i18n-gettext");
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import transforms
const parseTransform = require("./src/transforms/parse-transform.js");

// Import data files
const siteConfig = require("./src/_data/config.json");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Transforms
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/admin/config.yml": "admin/config.yml"});
    config.addPassthroughCopy({"src/assets/icons": "/"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy({"src/posts/images": "posts/images"});

    const now = new Date();

    // Custom collections
    const livePosts = post => post.date <= now && !post.data.draft;
    Object.keys(siteConfig.languages).forEach(lang => {
        config.addCollection(`posts_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/collections/posts/${lang}/*.md`).filter(livePosts);
        });

        // The following collection is used to create a collection of posts for the RSS feed.
        config.addCollection(`postFeed_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/collections/posts/${lang}/*.md`).filter(livePosts)
                .reverse()
                .slice(0, siteConfig.maxPostsInFeed);
        });
    });

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "en-CA"
    });
    config.addGlobalData("defaultLanguage", "en-CA");
    config.addGlobalData("defaultLanguageDirection", "ltr");
    config.addPlugin(i18n);
    config.addPlugin(navigationPlugin);
    config.addPlugin(rssPlugin);
    config.addPlugin(syntaxHighlightPlugin);

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
