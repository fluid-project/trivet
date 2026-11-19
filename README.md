# Trivet

_A simple starter kit for Eleventy-based static sites for the Fluid Project._

This repository contains the files needed to build [Eleventy](http://11ty.dev/)-based static sites for the [Fluid Project](https://fluidproject.org).
It includes support for internationalization, which can be disabled if your project does not require it.

## Installation

You can use GitHub's template repository feature to create your own project based on Trivet. From the
[repository homepage](https://github.com/fluid-project/trivet),
click the "Use this template" button and then choose "Create a new repository".

You can also set up a new project locally using [degit](https://www.npmjs.com/package/degit):

```bash
npx degit fluid-project/trivet YOUR-PROJECT-NAME
```

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at [http://localhost:8080](http://localhost:8080).

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

- Build the image: `docker build -t trivet .`
- Run the container: `docker run --name trivet -p 8000:80 trivet`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./_site/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./_site/`
directory to the web root of your server.

## Features

- Basic static site configuration for developing project websites and blogs.
- Starter configuration for [Sveltia CMS](https://sveltiacms.app/).
- Integrated [User Interface Options](https://docs.fluidproject.org/infusion/development/UserInterfaceOptionsAPI.html)
  Preferences Editor.
- Internationalization support.

## Notes

Modifications can be made to any source file or directory except for the contents of the `_site` directory. The
`_site` directory is not versioned since it contains the built website that Eleventy generates from the source files,
and files in `_site` are overwritten at build time.

## Working with Sveltia CMS

The [Sveltia CMS](https://sveltiacms.app/) configuration can be edited in [`src/admin/config.yml`](src/admin/config.yml).
For full documentation, see the [Sveltia CMS documentation](https://sveltiacms.app/en/docs/intro).

## Internationalization

Trivet includes internationalization support for English (Canada) and French (Canada). More languages can be added. If
your project doesn't require internationalization,

### Adding a language

To add a language, the following changes need to be made:

1. Modify [`src/admin/config.yml`](src/admin/config.yml) to support the new language:

   ```diff
   - locales: [en, fr]
   + locales: [en, fr, de]
   ```

2. Using the CMS, edit the site configuration to provide site metadata in the
   new language.

3. Update the `supportedLanguages` object in [`eleventy.config.js`](eleventy.config.js)
   with the following data:
   - `slug`: a short form of the language code for use in URLs
   - `uioSlug`: a short form of the language code that corresponds to an available message bundle locale for Infusion's
     [User Interface Options](https://github.com/fluid-project/infusion/tree/main/src/framework/preferences/messages)
     (if UIO is not localized in that language, you can omit this option)
   - `dir`: the direction of the language (`ltr` for left to right or `rtl` for right to left)
   - `name`: the localized language name (endonym), which will be used to link to content in that language

   ```diff
   const supportedLanguages = {
     en: {
       slug: 'en',
       name: 'English',
       dir: 'ltr',
       uioSlug: 'en_CA',
     },
   + "de": {
   +   slug: "de",
   +   dir: "ltr",
   +   name: "Deutsch",
   + },
     fr: {
       slug: 'fr',
       name: 'Français',
       dir: 'ltr',
       uioSlug: 'fr',
     },
   };
   ```

   You can change the site's default language by changing the the `eleventy-plugin-fluid` configuration's
   `defaultLanguage` string in [`eleventy.config.js`](eleventy.config.js) to the [IETF language code](https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/availableLocales.json)
   of the desired default language.

4. Create localized versions of the posts archive and 404 pages, following the examples of [`src/collections/pages/fr/articles/index.md`](src/collections/pages/fr/articles/index.md)
   and [`src/collections/pages/fr/404.md`](src/collections/pages/fr/404.md).

For more information about how Sveltia CMS works with internationalized content, see the [internationalization support documentation](https://sveltiacms.app/en/docs/i18n).

## Disabling Internationalization

If you do not need internationalization support for some or all content on your
site, it can be disabled for specific collections or the entire site.

### Disabling Internationalization for a Specific Collection

If your site is translated into more than two languages but you aren't translating all your content, any empty
collection will not be built by Eleventy. For example, if your site is configured to use `en`, `fr` and
`de` but you do not translate your posts into `de`, the German posts index page will not be built.
However, if you want to completely remove localization support for a specific collection, you can do so in three steps:

1. Delete all language directories in the `/src/collections/<collection>/` directory. For example, to disable
   localization for posts, delete the `/src/collections/posts/fr/` directory (English content is always stored in the
   collection directory root).
2. Modify the [`src/admin/config.yml`](src/admin/config.yml) collection block for the relevant collection. For example,
   to disable localization for posts, set `i18n` to `false` and remove the hidden `lang` field from the `posts` block:

   ```diff
   - i18n:
   -   structure: multiple_folders
   + i18n: false
   ...
   fields:
   ...
   - - name: lang
   -   widget: hidden
   -   default: '{{locale}}'
   ```

3. Delete the localized index file if the collection has an index page (in the case of the posts collection, this would
   be [src/collections/pages/fr/articles/index.md](src/collections/pages/fr/articles/index.md)).

### Disabling Internationalization Completely

If you want to disable localization completely, this can be done in three steps:

1. Delete all language directories in each collection's directory within `src/collections` (English content is always
   stored in the collection directory root, so it will be unaffected).
2. Modify the file to remove the top-level `i18n` configuration block and remove the hidden `lang` field from each
   collection.
3. Delete all but the default language from the `supportedLanguages` object in [`eleventy.config.js`](eleventy.config.js):

   ```diff
   const supportedLanguages = {
     en: {
       slug: 'en',
       name: 'English',
       dir: 'ltr',
       uioSlug: 'en_CA',
     },
   - fr: {
   -   slug: 'fr',
   -   name: 'Français',
   -   dir: 'ltr',
   -   uioSlug: 'fr',
   - },
   };
   ```

## License

Trivet is available under the [New BSD License](https://raw.githubusercontent.com/fluid-project/trivet/master/LICENSE.md).

## Third Party Software in Trivet

Trivet is based on other publicly available software, categorized by license:

### MIT License

- [Eleventastic](https://github.com/maxboeck/eleventastic)
- [eleventy-webpack](https://github.com/clenemt/eleventy-webpack)
- [Hylia](https://github.com/hankchizljaw/hylia)
- [Supermaya](https://github.com/MadeByMike/supermaya)
