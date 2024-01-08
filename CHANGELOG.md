# Changelog

## [2.1.1](https://github.com/fluid-project/trivet/compare/v2.1.0...v2.1.1) (2024-01-08)


### Bug Fixes

* don't include package name in tag ([#406](https://github.com/fluid-project/trivet/issues/406)) ([6ab56df](https://github.com/fluid-project/trivet/commit/6ab56dfb3e0a7aa08a09c407d58511372d8d414b))
* restore manifest ([#408](https://github.com/fluid-project/trivet/issues/408)) ([ad3dcf0](https://github.com/fluid-project/trivet/commit/ad3dcf05cc0d9bf95d55ea8c8865b93f9de6fdd1))

## [2.1.0](https://github.com/fluid-project/trivet/compare/trivet-v2.0.1...trivet-v2.1.0) (2024-01-08)


### Features

* lint JavaScript in Markdown files ([#364](https://github.com/fluid-project/trivet/issues/364)) ([cb9527c](https://github.com/fluid-project/trivet/commit/cb9527c5998a4788e9c87f5b7f6ca7a66a210171))
* replace Netlify CMS with Decap CMS ([#371](https://github.com/fluid-project/trivet/issues/371)) ([1be7787](https://github.com/fluid-project/trivet/commit/1be77878bf626a33c34439d0ef228e2864b76061))
* update robots.txt ([#367](https://github.com/fluid-project/trivet/issues/367)) ([cce5674](https://github.com/fluid-project/trivet/commit/cce5674784c1f35a43d227d58c766c9c0dcd8d44))


### Bug Fixes

* use correct Dependabot ignore syntax ([#366](https://github.com/fluid-project/trivet/issues/366)) ([d11c2ae](https://github.com/fluid-project/trivet/commit/d11c2ae8501a730a3362069ae1aaa84b04b055fa))
* use more descriptive script names for linting (S)CSS and JavaScript ([#369](https://github.com/fluid-project/trivet/issues/369)) ([db7f00a](https://github.com/fluid-project/trivet/commit/db7f00a094e6b24667c89f7c22e1cc792f1bf331))

## [2.0.1](https://github.com/fluid-project/trivet/compare/v2.0.0...v2.0.1) (2023-08-15)


### Bug Fixes

* simplify YAML lint config ([#362](https://github.com/fluid-project/trivet/issues/362)) ([40ea5f9](https://github.com/fluid-project/trivet/commit/40ea5f9df913fa55c7b9a5249bbd3badb8309515))

## [2.0.0](https://github.com/fluid-project/trivet/compare/v1.0.0...v2.0.0) (2023-08-15)


### ⚠ BREAKING CHANGES

* update Docker Node version ([#335](https://github.com/fluid-project/trivet/issues/335))
* add NVM configuration, use Node 18 ([#322](https://github.com/fluid-project/trivet/issues/322))

### Features

* add NVM configuration, use Node 18 ([#322](https://github.com/fluid-project/trivet/issues/322)) ([aa63bf2](https://github.com/fluid-project/trivet/commit/aa63bf2a1320fd2bf2fb3ffaa72649e789579878))
* disallow GPT from crawling any Trivet-based sites ([#343](https://github.com/fluid-project/trivet/issues/343)) ([c56e172](https://github.com/fluid-project/trivet/commit/c56e172fbe2de41a1dfc67a8f7f1cb60133376e6))
* generate sitemap.xml (resolves [#243](https://github.com/fluid-project/trivet/issues/243)) ([#244](https://github.com/fluid-project/trivet/issues/244)) ([cea3049](https://github.com/fluid-project/trivet/commit/cea304998a7586446b18739883436272732321fe))
* update Docker Node version ([#335](https://github.com/fluid-project/trivet/issues/335)) ([c437bd4](https://github.com/fluid-project/trivet/commit/c437bd4be37fbb3afb0356b44fee2dcd1f8fbd21))
* use Eleventy localization features and Eleventy asset processing ([#337](https://github.com/fluid-project/trivet/issues/337)) ([610868d](https://github.com/fluid-project/trivet/commit/610868d0ccd4e67c8dd84bb7c0f965d1228957eb))


### Bug Fixes

* better YAML pattern to handle .github files as well as config.yml ([#355](https://github.com/fluid-project/trivet/issues/355)) ([7642a09](https://github.com/fluid-project/trivet/commit/7642a09066951eb21fd3522abe7b4d4623d71296))
* localized pagination ([#353](https://github.com/fluid-project/trivet/issues/353)) ([43df5ff](https://github.com/fluid-project/trivet/commit/43df5ff18faf0cc9519293fb7e4b861005f8d171))
* move generatePermalink out of eleventyComputed ([#354](https://github.com/fluid-project/trivet/issues/354)) ([d37829e](https://github.com/fluid-project/trivet/commit/d37829e7a2a4ddfe8fd22426214df8316e7dc49d))
* resolve sitemap parsing error in Chrome ([#351](https://github.com/fluid-project/trivet/issues/351)) ([64387bf](https://github.com/fluid-project/trivet/commit/64387bfeaf3ce9e42b80b6112b6f590dc6658be9))

## 1.0.0 (2022-03-23)

Initial release.
