/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/fluidic-11ty/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/fluidic-11ty/raw/master/LICENSE.md.
*/
"use strict";

const fs = require("fs");
const fg = require("fast-glob");
const path = require("path");
const sass = require("sass");
const stylus = require("stylus");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const CleanCSS = require("clean-css");
const cssesc = require("cssesc");

const environment = process.eventNames.ELEVENTY_ENV || "development";
const isProd = environment.toLowerCase() === "production";

/**
 * @see https://github.com/maxboeck/eleventastic/blob/master/src/assets/styles/styles.11ty.js
 */

module.exports = class {
    // Configure the transform.
    async data() {
        const entryPaths = await fg("./src/assets/styles/style.{css,scss,styl}");
        const entryPath = entryPaths[0];
        return {
            permalink: '/assets/styles/style.css',
            eleventyExcludeFromCollections: true,
            entryPath
        };
    }

    // Compile SCSS to CSS.
    async compileScss(options) {
        return new Promise((resolve, reject) => {
            const config = {
                file: options.entryPath,
                sourceMap: !isProd ? 'out.map' : false,
                sourceMapEmbed: !isProd,
                sourceMapContents: !isProd,
                outputStyle: isProd ? 'compressed' : 'expanded'
            };

            sass.render(config, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const processedCss = this.processCss({str: result.css, entryPath: options.entryPath});
                    resolve(processedCss);
                }
            });
        });
    }

    // Compile Stylus to CSS.
    async compileStylus(options) {
        return new Promise((resolve, reject) => {
            const sourceMap = isProd ? false : { inline: true };

            stylus(options.str)
                .set('filename', options.entryPath)
                .set('sourcemap', sourceMap)
                .set('compress', isProd)
                .render((err, css) => {
                    if (err) {
                        reject(err);
                    } else {
                      const processedCss = this.processCss({str: css, entryPath: options.entryPath});
                      resolve(processedCss);
                    }
                });
        });
    }

    // Process CSS with PostCSS.
    async processCss(options) {
      const from = options.entryPath || 'undefined';
      const css = postcss([autoprefixer]).process(options.str, {from}).css;
      return css;
    }

    // Compile and process CSS (source-agnostic).
    async compile(options) {
      let css;
      switch (options.fileType) {
        case 'css':
          css = await this.processCss({str: options.str});
          break;
        case 'scss':
          css = await this.compileScss(options);
          break;
        case 'styl':
          css = await this.compileStylus(options);
          break;
      }
      return css;
    }

    // Minify & optimize with CleanCSS in production.
    async minify(css) {
        return new Promise((resolve, reject) => {
            if (!isProd) {
                resolve(css);
            }

            const minified = new CleanCSS().minify(css);
            if (minified.styles) {
                resolve(minified.styles);
            } else {
                reject(minified.error);
            }
        });
    }

    // Display an error overlay when CSS build fails.
    // this brilliant idea is taken from Mike Riethmuller / Supermaya
    // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-scss.js
    renderError(error) {
        return `
        /* Error compiling stylesheet */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
        html,
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            font-family: monospace;
            font-size: 1.25rem;
            line-height:1.5;
        }
        body::before {
            content: '';
            background: #000;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            position: fixed;
        }
        body::after {
            content: '${cssesc(error)}';
            white-space: pre;
            display: block;
            top: 0;
            padding: 30px;
            margin: 50px;
            width: calc(100% - 100px);
            color:#721c24;
            background: #f8d7da;
            border: solid 2px red;
            position: fixed;
        }`;
  }

    // Render the CSS file.
    async render({entryPath}) {
        try {
            const fileType = entryPath.split('.').pop();
            const str = fs.readFileSync(entryPath, 'utf8');
            const css = await this.compile({fileType, entryPath, str});
            const result = await this.minify(css);
            return result;
        } catch (error) {
            if (isProd) {
                // Throw and bail if in a production environment.
                throw new Error(error);
            } else {
                // Log and display the error.
                console.error(error);
                const message = error.formatted || error.message;
                return this.renderError(message);
            }
        }
    }
};
