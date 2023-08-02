# Trivet

## A simple starter kit for Eleventy-based static sites for the Fluid Project

[![Netlify Status](https://api.netlify.com/api/v1/badges/8286bcec-a92b-47ca-a4cf-128a276b57eb/deploy-status)](https://app.netlify.com/sites/trivet/deploys)

This repository contains the files needed to build [Eleventy](http://11ty.dev/)-based static sites for the [Fluid Project](https://fluidproject.org).

## Usage

You can use this repository as a template for a new site hosted on [Netlify](https://netlify.com) with [Decap CMS](https://decapcms.org/)
pre-configured:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/fluid-project/trivet&stack=cms)

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t trivet .`
* Run the container: `docker run --name trivet -p 8000:80 trivet`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./dist/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./_site/`
directory to the web root of your server.

## Features

* Integrated [UI Options](https://docs.fluidproject.org/infusion/development/UserInterfaceOptionsAPI.html) Preferences Editor.
* Basic static site configuration for developing project websites and blogs.
* Starter configuration for [Netlify CMS](https://netlifycms.org/).
* Internationalization support.

## Notes

Modifications can be made to any source file or directory except for the contents of the `./_site/` directory. The
`./_site/` directory is not versioned since it contains the built website that Eleventy generates from the source files,
and  files in `_site` are overwritten at build time.

## Working with Netlify CMS

The [Decap CMS](https://decapcms.org/) configuration can be edited in [`src/admin/config.yml`](src/admin/config.yml).
For full documentation, see the [Decap CMS documentation](https://decapcms.org/docs/).

## Internationalization

Trivet includes internationalization support for English (Canada) and French (Canada). To add a language, the
following changes need to be made:

1. Update the `locales` array of [`src/_data/config.json`](src/_data/config.json) to add the new language. For
   example, to add German, you would add the [IETF language code](https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json)
   `de-DE`:

   ```diff
   {
       "locales": [
   +       "de-DE",
           "en-CA",
           "fr-CA"
       ],
   }
   ```

2. Update the `eleventy-plugin-fluid` configuration's `supportedLanguages` object in [`eleventy.config.js`](eleventy.config.js)
   with the following data:
   * `slug`: a short form of the language code for use in URLs
   * `uioSlug`: a short form of the language code that corresponds to an available message bundle locale for Infusion's
     [User Interface Options](https://github.com/fluid-project/infusion/tree/main/src/framework/preferences/messages)
     (if UIO is not localized in that language, you can omit this option)
   * `dir`: the direction of the language (`ltr` for left to right or `rtl` for right to left)
   * `name`: the localized language name (endonym), which will be used to link to content in that language

   ```diff
   eleventyConfig.addPlugin(fluidPlugin, {
      defaultLanguage: "en-CA",
      localesDirectory: "src/_locales",
      supportedLanguages: {
         "en-CA": {
            slug: "en",
            name: "English"
         },
   +     "de-DE": {
   +        slug: "de",
   +        dir: "ltr",
   +        name: "Deutsch",
   +     },
         "fr-CA": {
            slug: "fr",
            name: "Français"
         }
      }
    });
   ```

   You can change the site's default language by changing the the `eleventy-plugin-fluid` configuration's
   `defaultLanguage` string in [`eleventy.config.js`](eleventy.config.js) to the [IETF language code](https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json)
   of the desired default language.
3. Add folders in each collection for translated content. For example, you would add a folder called `de-DE` to
   [`src/collections/pages`](src/collections/pages) and [`src/collections/posts`](src/collections/posts).
4. Create a localized version of the posts archive page, following the example of [`src/collections/pages/fr-CA/posts.md`](src/collections/pages/fr-CA/posts.md).
5. Create a localized version of the 404 page, following the example of [`src/collections/pages/fr-CA/404.md`](src/collections/pages/fr-CA/404.md).
6. To ensure that the 404 page is displayed in the appropriate language, verify that a redirect block has been added to
   the [netlify.toml](netlify.toml) file for each language following the examples. This feature is described in
   Netlify's [redirects documentation](https://docs.netlify.com/routing/redirects/redirect-options/#custom-404-page-handling).

For more information about how Decap CMS works with internationalized content, see the [internationalization support documentation](https://www.decapcms.org/docs/beta-features/#i18n-support).

## Disabling Internationalization

TODO: Describe steps to disable internationalization.

## License

Trivet is available under the [New BSD License](https://raw.githubusercontent.com/fluid-project/trivet/master/LICENSE.md).

## Third Party Software in Trivet

Trivet is based on other publicly available software, categorized by license:

### MIT License

* [Eleventastic](https://github.com/maxboeck/eleventastic)
* [eleventy-webpack](https://github.com/clenemt/eleventy-webpack)
* [Hylia](https://github.com/hankchizljaw/hylia)
* [Supermaya](https://github.com/MadeByMike/supermaya)
