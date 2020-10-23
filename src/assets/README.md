# Asset Handling

Fluidic Eleventy uses [Laravel Mix](https://laravel-mix.com) as a wrapper for webpack to process JavaScript and CSS, [Sass](http://sass-lang.com) or [Stylus](http://stylus-lang.com) stylesheets.

## Scripts

By default, the Mix [configuration file](../../webpack.mix.js) includes configuration for processing the three JavaScript files that are found at the root level of the [`/src/assets/scripts`](scripts) directory. The processed JavaScript files will be written to `/dist/assets/scripts`. Additional JavaScript files can be added to the Mix [configuration file](../../webpack.mix.js) if desired. For example, if you want to add a new JavaScript file called `widget.js`, you can make the following change to add it to Mix for processing:

```diff
// Process JavaScript files with Babel.
mix.js("./src/assets/scripts/app.js", "dist/assets/scripts");
mix.js("./src/assets/scripts/matomo.js", "dist/assets/scripts");
mix.js("./src/assets/scripts/uio.js", "dist/assets/scripts");
+ mix.js("./src/assets/scripts/widget.js", "dist/assets/scripts");
```

## Stylesheets

By default, the Mix [configuration file](../../webpack.mix.js) includes configuration for processing the CSS file that is found at the root level of the [`/src/assets/styles`](styles) directory. The processed CSS file will be written to `/dist/assets/styles`. Additional CSS files can be added to the Mix [configuration file](../../webpack.mix.js) if desired. For example, if you want to add a new CSS file called `widget.css`, you can make the following change to add it to Mix for processing:

```diff
// Process CSS with PostCSS.
mix.postCss("./src/assets/styles/app.css", "dist/assets/styles");
+ mix.postCss("./src/assets/styles/widget.css", "dist/assets/styles");
```

Mix also supports [Sass](https://sass-lang.com) and [Stylus](https://stylus-lang.com). If you'd like to use Sass or Stylus instead of plain CSS, you'll need to make the following changes.

### Sass

1. Rename `/src/assets/styles/app.css` to `/src/assets/styles/app.scss`.
2. Modify the Mix [configuration file](../../webpack.mix.js):

```diff
- // Process CSS with PostCSS.
- mix.postCss("./src/assets/styles/app.css", "dist/assets/styles");
+ // Process Sass.
+ mix.sass("./src/assets/styles/app.scss", "dist/assets/styles");
```

### Stylus

1. Rename `/src/assets/styles/app.css` to `/src/assets/styles/app.styl`.
2. Modify the Mix [configuration file](../../webpack.mix.js):

```diff
- // Process CSS with PostCSS.
- mix.postCss("./src/assets/styles/app.css", "dist/assets/styles");
+ // Process Stylus.
+ mix.stylus("./src/assets/styles/app.styl", "dist/assets/styles");
```

CSS, Sass and Stylus files will be processed with [Autoprefixer](https://github.com/postcss/autoprefixer). See the Laravel Mix documentation on [PostCSS plugin configuration](https://laravel-mix.com/docs/5.0/css-preprocessors#postcss-plugins) for information on how to add and configure additional [PostCSS plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md).

## Eleventy Integration

Laravel Mix generates an asset manifest in JSON format (this example shows the assets with a [version string for cache busting](https://laravel-mix.com/docs/5.0/versioning)):

```json
{
    "/scripts/app.js": "/scripts/app.js?id=f45bfe43b5e6cb80a6da",
    "/styles/app.css": "/styles/app.css?id=bc8ec84445a00d932c8a",
    "/scripts/matomo.js": "/scripts/matomo.js?id=3155c9bb3c237aa64c27",
    "/scripts/uio.js": "/scripts/uio.js?id=41d589185ccf95cc14f9"
}
```

The [`scripts.njk`](../_includes/partials/scripts.njk) and [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partials use this asset manifest to load scripts and stylesheets in the site header. When running webpack and Eleventy in watch mode (using `npm start`), a successful webpack build will update the asset manifest, triggering an Eleventy build and refreshing the local development site with updated CSS and JavaScript assets.

If you wish to load different scripts or stylesheets on different pages, you will need to modify the [`scripts.njk`](../_includes/partials/scripts.njk) and [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partials to accomplish this.

## Advanced Methods

### Automatic Processing

The Mix [configuration file](../../webpack.mix.js) can be modified to automatically process all JavaScript, CSS, Sass, or Stylus files in the root of the [`/src/assets/scripts`](scripts) or [`/src/assets/styles`](styles) directory as follows.

1. Add the [`fast-glob`](https://www.npmjs.com/package/fast-glob) package to your devDependencies:

    ```bash
    npm i --save-dev --save-exact fast-glob
    ```

2. Require `fast-glob` in the Mix [configuration file](../../webpack.mix.js):

    ```diff
    const mix = require("laravel-mix");
    + const fg = require("fast-glob");
    const moveFile = require("move-file");
    ```

3. Replace the relevant section (for JavaScript, CSS, Sass, and/or Stylus — this example shows JavaScript):

    ```diff
    // Process JavaScript files with Babel.
    - mix.js("./src/assets/scripts/app.js", "dist/assets/scripts");
    - mix.js("./src/assets/scripts/matomo.js", "dist/assets/scripts");
    - mix.js("./src/assets/scripts/uio.js", "dist/assets/scripts");
    + const scriptPaths = fg.sync("./src/assets/scripts/*.js");
    +
    + scriptPaths.forEach(entryPath => {
    +     mix.js(entryPath, "dist/assets/scripts");
    + });
    ```

This technique [globs](https://en.wikipedia.org/wiki/Glob_(programming)) all files of the specified type and then calls the appropriate Mix function against each file in the resulting array.

#### Caveats

- This example configuration will only process files in the root of the [`/src/assets/scripts`](scripts) or [`/src/assets/styles`](styles) directories. If you need to process files in subdirectories (rather than importing them into the main files), this might not be the right approach for you.
- If you add a new JavaScript, CSS, Sass, or Stylus file to the appropriate directory while Eleventy is running (after calling `npm run start`), the new file will not be processed immediately. You'll need to restart the build for the new file to be processed.

### Automatic Loading

The [`scripts.njk`](../_includes/partials/scripts.njk) and [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partials can be modified to automatically load all JavaScript and CSS files from the asset manifest as follows.

1. Modify the [`scripts.njk`](../_includes/partials/scripts.njk) template partial to automatically load all JavaScript files listed in the asset manifest:

    ```diff
    - <script type="text/javascript" src="/assets{{ assets['/scripts/app.js'] }}" defer></script>
    - <script type="text/javascript" src="/assets{{ assets['/scripts/matomo.js'] }}" defer></script>
    - <script type="text/javascript" src="/assets{{ assets['/scripts/uio.js'] }}" defer></script>
    + {% set jsPattern = r/.*\.js$/ %}
    + {% for key, value in assets %}
    + {% if jsPattern.test(key) %}
    + <script type="text/javascript" src="/assets{{ value }}" defer></script>
    + {% endif %}
    + {% endfor %}
    ```

2. Modify the [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partial to automatically load all CSS files listed in the asset manifest:

    ```diff
    - <link href="/assets{{ assets['/styles/app.css'] }}" rel="stylesheet" />
    + {% set cssPattern = r/.*\.css$/ %}
    + {% for key, value in assets %}
    + {% if cssPattern.test(key) %}
    + <link href="/assets{{ value }}" rel="stylesheet" />
    + {% endif %}
    + {% endfor %}
    ```

#### Caveats

If you need to selectively load some assets on some pages and not on others, this technique isn't suitable.

## Further Information

For the complete Mix API, visit the Laravel Mix [documentation site](https://laravel-mix.com/docs/5.0/installation).
