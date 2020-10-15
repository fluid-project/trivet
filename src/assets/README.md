# Asset Handling

Fluidic Eleventy uses [Laravel Mix](https://laravel-mix.com) as a wrapper for webpack to process JavaScript and CSS, [Sass](http://sass-lang.com) or [Stylus](http://stylus-lang.com) stylesheets.

## Scripts

By default, the Mix [configuration file](../../webpack.mix.js) will process every JavaScript file that found at the root level of the `/src/assets/scripts` directory. The resulting transpiled  JavaScript files will be written to `/dist/assets/scripts`.

## Stylesheets

The Mix configuration file includes configurations for [CSS](../../webpack.mix.js#L30), [Sass](../../webpack.mix.js#L33) or [Stylus](../../webpack.mix.js#L36). By default, CSS, Sass or Stylus will be run through [Autoprefixer](https://github.com/postcss/autoprefixer). Additional [PostCSS plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md) may be added ([configuration details can be found here](https://laravel-mix.com/docs/5.0/css-preprocessors#postcss-plugins)).

## Eleventy Integration

Laravel Mix generates an asset manifest in JSON format. The [`scripts.njk`](../_includes/partials/scripts.njk) and [`stylesheets.njk`](../_includes/partials/stylesheets.njk) template partials use this asset manifest to load scripts and stylesheets in the site header. Following a successful asset build, an update to the asset manifest will trigger an Eleventy build.
