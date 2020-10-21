# Asset Handling

Fluidic Eleventy uses [Laravel Mix](https://laravel-mix.com) as a wrapper for webpack to process JavaScript and CSS, [Sass](http://sass-lang.com) or [Stylus](http://stylus-lang.com) stylesheets.

## Scripts

By default, the Mix [configuration file](../../webpack.mix.js) will process every JavaScript file that is found at the root level of the [`/src/assets/scripts`](scripts) directory. The resulting transpiled JavaScript files will be written to `/dist/assets/scripts`.

## Stylesheets

The Mix configuration file includes configurations for CSS, Sass and Stylus files. By default, the Mix [configuration file](../../webpack.mix.js) will process every CSS, Sass, and Stylus file that is found at the root level of the [`/src/assets/styles`](styles) directory. The resulting compiled CSS files will be written to `/dist/assets/styles`. This starter project only includes a CSS file; to use Sass or Stylus, add `.scss` or `.styl` files to [`/src/assets/styles`](styles).

CSS, Sass and Stylus will be run through [Autoprefixer](https://github.com/postcss/autoprefixer). See the Laravel Mix documentation on [PostCSS plugin configuration](https://laravel-mix.com/docs/5.0/css-preprocessors#postcss-plugins) for information on how to add and configure additional [PostCSS plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md).

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

The [`scripts.njk`](../_includes/partials/scripts.njk) and [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partials use this asset manifest to load scripts and stylesheets in the site header. (If you wish to load different scripts or stylesheets on different pages, you will need to modify these template partials to accomplish this.) When running webpack and Eleventy in watch mode (using `npm start`), a successful webpack build will update the asset manifest, triggering an Eleventy build and refreshing the local development site with updated CSS and JavaScript assets.
