"use strict";

const mix = require("laravel-mix");
const cpFile = require("cp-file");
const fg = require("fast-glob");

mix.setPublicPath("dist/assets");

const scriptPaths = fg.sync("./src/assets/scripts/*.js");

scriptPaths.forEach(entryPath => {
    mix.js(entryPath, "dist/assets/scripts");
});

mix.postCss("src/assets/styles/app.css", "dist/assets/styles");
// mix.sass("src/assets/styles/app.scss", "dist/assets/styles");
// mix.stylus("src/assets/styles/app.styl", "dist/assets/styles");

mix.then(() => {
    cpFile.sync("dist/assets/mix-manifest.json", "src/_data/assets.json");
});

if (mix.inProduction()) {
    mix.version();
}
