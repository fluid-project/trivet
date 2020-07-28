# A simple starter kit for Eleventy based static sites for Fluid project

This repository contains the files needed to build [11ty](http://11ty.dev/) based sites for Fluid-Project.

## To Build Locally

1. Get the required node modules: `npm install`
2. Run [11ty](http://11ty.dev) from the fluid-website directory `npm run eleventyport`.
3. Open `http://localhost:9778/` to see the website.

## To build locally using Docker

You can serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t fluidproject .`
* Run the container: `docker run --name fluidproject -p 8000:80 fluidproject`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

## To deploy to a personal webserver

1. Run: `npm run build`
2. Copy the contents of `./dist/` directory to your server.

## Features

1. Integrated UIO Preference Editor
2. Configured basic static site for making blog sites.

## Notes

-  Modifications can be done to any source file or directory except for the contents of the `dist` directory.
-  The `dist` directory is not versioned since it contains the generated output made by 11ty from the source files, and the files in `dist` are overwritten at build time
-  The changed source files in dist directory gets overwritten at build time.

## License

The Fluid Project website is available under [Creative Commons Attribution License](http://creativecommons.org/licenses/by/4.0/).
