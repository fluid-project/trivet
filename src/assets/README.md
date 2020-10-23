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
