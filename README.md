# Fluidic Eleventy

## A simple starter kit for Eleventy-based static sites for the Fluid Project

This repository contains the files needed to build [Eleventy](http://11ty.dev/)-based static sites for the Fluid Project.

## Tutorial

1. Visit [Fluid Wiki page for Fluidic Eleventy](https://wiki.fluidproject.org/pages/viewpage.action?pageId=202506598).
2. Check [Starter kit](https://wiki.fluidproject.org/display/~schopra/Creating+blog+sites+using+Fluidic-11ty)
   for building blog sites.

## To build locally

1. Get the required node modules: `npm install`
2. Run [Eleventy](http://11ty.dev) from the fluid-website directory `npm run start`.
3. Open http://localhost:8080/ to see the website.

## To build locally using Docker

You can serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t fluidic-11ty .`
* Run the container: `docker run --name fluidic-11ty -p 8000:80 fluidic-11ty`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

## To deploy to a personal webserver

1. Run: `npm run build`
2. Copy the contents of `./dist/` directory to your server.

## Features

1. Integrated [UI Options](https://docs.fluidproject.org/infusion/development/UserInterfaceOptionsAPI.html) Preference Editor.
2. Basic static site configuration for developing project sites and blogs.

## Notes

1. Modifications can be made to any source file or directory except for the contents of the `dist` directory.
2. The `dist` directory is not versioned since it contains the generated output made by Eleventy from the source files, and the files in `dist` are overwritten at build time.

## License

Fluidic Eleventy is available under the [New BSD License](https://raw.githubusercontent.com/fluid-project/fluidic-11ty/master/LICENSE.md).
