/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/fluidic-11ty/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/fluidic-11ty/raw/main/LICENSE.md.
*/

"use strict";

const fs = require("fs");

const fluidPlugin = require("@fluid-project/eleventy-plugin-fluid");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

// Import data files
const site = require("./src/_data/site.json");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy({"src/posts/images": "posts/images"});
    config.addPassthroughCopy({"node_modules/infusion/dist/infusion-uio.min.js": "lib/infusion/infusion-uio.min.js"});
    config.addPassthroughCopy({"node_modules/infusion/dist/infusion-uio.min.js.map": "lib/infusion/infusion-uio.min.js.map"});
    config.addPassthroughCopy({"node_modules/infusion/src/components/tableOfContents/css/": "lib/infusion/src/components/tableOfContents/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/components/tableOfContents/html/": "lib/infusion/src/components/tableOfContents/html/"});
    config.addPassthroughCopy({"node_modules/infusion/src/components/textfieldControl/css/": "lib/infusion/src/components/textfieldControl/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/components/switch/css/": "lib/infusion/src/components/switch/css/"});
    config.addPassthroughCopy({"node_modules/infusion/Infusion-LICENSE.txt": "lib/infusion/Infusion-LICENSE.txt"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/preferences/css/": "lib/infusion/src/framework/preferences/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/preferences/fonts/": "lib/infusion/src/framework/preferences/fonts/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/preferences/html/": "lib/infusion/src/framework/preferences/html/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/preferences/messages/": "lib/infusion/src/framework/preferences/messages/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/preferences/preferencesDependencies.json": "lib/infusion/src/framework/preferences/preferencesDependencies.json"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/enhancement/css/": "lib/infusion/src/framework/enhancement/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/core/css/": "lib/infusion/src/framework/core/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/framework/core/images/": "lib/infusion/src/framework/core/images/"});
    config.addPassthroughCopy({"node_modules/infusion/src/lib/jquery/ui/css/default-theme/": "lib/infusion/src/lib/jquery/ui/css/default-theme/"});
    config.addPassthroughCopy({"node_modules/infusion/src/lib/normalize/css/": "lib/infusion/src/lib/normalize/css/"});
    config.addPassthroughCopy({"node_modules/infusion/src/lib/open-dyslexic/fonts/": "lib/infusion/src/lib/open-dyslexic/fonts"});
    config.addPassthroughCopy({"node_modules/infusion/src/lib/opensans/fonts/": "lib/infusion/src/lib/opensans/fonts/"});

    const now = new Date();

    // Custom collections
    const livePosts = post => post.date <= now && !post.data.draft;
    config.addCollection("posts", collection => {
        return [
            ...collection.getFilteredByGlob("./src/posts/*.md").filter(livePosts)
        ];
    });
    // The following collection is used to distribute posts into different pages. However, the default pagination has not been set in fluidproject.org and all posts are shown on single page
    config.addCollection("postFeed", collection => {
        return [...collection.getFilteredByGlob("./src/posts/*.md").filter(livePosts)]
            .reverse()
            .slice(0, site.maxPostsPerPage);
    });

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(rssPlugin);
    config.addPlugin(syntaxHighlight);

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {

                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync("dist/404.html");
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.writeHead(404);
                    res.end();
                });
            }
        }
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        },
        passthroughFileCopy: true
    };
};
