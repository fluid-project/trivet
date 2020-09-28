# CSS Compilation and Processing

The [Javascript template file](https://www.11ty.dev/docs/languages/javascript/) found at [`src/assets/styles/styles.11ty.js`](https://github.com/fluid-project/fluidic-11ty/blob/c6e82aa65ae828b01298f4c36e24b4de38f135c0/src/assets/styles/styles.11ty.js) handles compilation of [Sass (`.scss`)](http://sass-lang.com) or [Stylus (`.styl`)](https://stylus-lang.com) files and processes the resulting CSS using [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer). It will also process plain CSS using [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer) for projects where you don't want or need to use a CSS preprocessor.

The template file looks for a file in `src/assets/styles` that matches the following naming convention:

- `style.css`: CSS which will be processed using [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer)
- `style.scss`: [SCSS](https://sass-lang.com) which will be compiled using the [Sass JavaScript API](https://sass-lang.com/documentation/js-api) and then processed using [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer)
- `style.styl`: [Stylus](https://stylus-lang.com) which will be compiled using the [Stylus JavaScript API](https://stylus-lang.com/docs/js.html) and then processed using [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer)

If multiple files exist (as is the case in this starter project), the first matched file will be processed and subsequent files will be ignored. To configure Fluidic Eleventy to use your preferred CSS flavour, delete the unneeded files (for example, if you want to use Stylus, delete `src/assets/styles/style.css` and `src/assets/styles/style.scss`).