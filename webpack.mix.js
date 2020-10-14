"use strict";

const mix = require("laravel-mix");
const moveFile = require("move-file");
const fg = require("fast-glob");

// Set public path.
mix.setPublicPath("dist/assets");

const scriptPaths = fg.sync("./src/assets/scripts/*.js");

// Process JavaScript with Babel.
scriptPaths.forEach(entryPath => {
    mix.js(entryPath, "dist/assets/scripts");
});

// Process CSS with PostCSS.
mix.postCss("src/assets/styles/app.css", "dist/assets/styles");

// Compile Sass.
// mix.sass("src/assets/styles/app.scss", "dist/assets/styles");

// Compile Stylus.
// mix.stylus("src/assets/styles/app.styl", "dist/assets/styles");

mix.options({
    // Don't modify stylesheet url() functions.
    processCssUrls: false
});

// Enable source maps.
mix.sourceMaps(false, "source-map");

// Add version string to assets in production.
if (mix.inProduction()) {
    mix.version();
}

// Copy asset manifest into Eleventy's data directory to trigger a build when assets are updated.
mix.then(() => {
    moveFile.sync("dist/assets/mix-manifest.json", "src/_data/assets.json");
});
