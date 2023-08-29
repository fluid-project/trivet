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
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import transforms
const parseTransform = require("./src/_transforms/parse-transform.js");

// Import data files
const siteConfig = require("./src/_data/config.json");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    // Transforms
    eleventyConfig.addTransform("parse", parseTransform);

    // Passthrough copy
    eleventyConfig.addPassthroughCopy({"src/admin/config.yml": "admin/config.yml"});
    eleventyConfig.addPassthroughCopy({"src/assets/icons": "/"});
    eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
    eleventyConfig.addPassthroughCopy({
        "node_modules/decap-cms/dist/decap-cms.js": "lib/cms/decap-cms.js",
        "node_modules/decap-cms/dist/decap-cms.js.map": "lib/cms/decap-cms.js.map",
        "node_modules/nunjucks/browser/nunjucks-slim.min.js": "lib/cms/nunjucks-slim.min.js",
        "node_modules/prop-types/prop-types.min.js": "lib/cms/prop-types.min.js",
        "node_modules/react/umd/react.development.js": "lib/cms/react.development.js",
        "node_modules/react/umd/react.production.min.js": "lib/cms/react.production.min.js"
    });

    const now = new Date();

    // Custom collections
    const livePosts = post => post.date <= now && !post.data.draft;
    siteConfig.locales.forEach(locale => {
        eleventyConfig.addCollection(`posts_${locale}`, collection => {
            return collection.getFilteredByGlob(`./src/collections/posts/${locale}/*.md`).filter(livePosts);
        });

        // The following collection is used to create a collection of posts for the RSS feed.
        eleventyConfig.addCollection(`postFeed_${locale}`, collection => {
            return collection.getFilteredByGlob(`./src/collections/posts/${locale}/*.md`).filter(livePosts)
                .reverse()
                .slice(0, siteConfig.maxPostsInFeed);
        });
    });

    // Plugins
    eleventyConfig.addPlugin(fluidPlugin, {
        defaultLanguage: "en-CA",
        localesDirectory: "src/_locales",
        supportedLanguages: {
            "en-CA": {
                slug: "en",
                name: "English"
            },
            "fr-CA": {
                slug: "fr",
                name: "Français",
                dir: "ltr",
                uioSlug: "fr"
            }
        }
    });
    eleventyConfig.addPlugin(navigationPlugin);
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(syntaxHighlightPlugin);

    return {
        dir: {
            input: "src"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
