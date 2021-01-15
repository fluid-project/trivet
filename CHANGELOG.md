# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0-dev.0 (2020-12-22)


### ⚠ BREAKING CHANGES

* rename to Trivet

### Features

* add commit message and pre-commit lint hooks ([#14](https://github.com/fluid-project/trivet/issues/14)) ([d6519b5](https://github.com/fluid-project/trivet/commit/d6519b5636404b880b5a1cdd170c714fa1a6951c))
* add editorconfig file ([9c688a9](https://github.com/fluid-project/trivet/commit/9c688a997751694b9d02bafe440bf0bf02f804d6))
* add JS processing (resolves [#28](https://github.com/fluid-project/trivet/issues/28)) ([e9717eb](https://github.com/fluid-project/trivet/commit/e9717eba64809935193628c4e4ec5ed3cba682ec))
* commit package-lock.json to version control ([a0a2934](https://github.com/fluid-project/trivet/commit/a0a2934399f66f5bcea9ff35e023e76e96344530))
* copy Infusion with Eleventy, use minified version ([afa8e62](https://github.com/fluid-project/trivet/commit/afa8e629c2fc4558c3fc4dda6f3afd13609deb50)), closes [#4](https://github.com/fluid-project/trivet/issues/4) [#5](https://github.com/fluid-project/trivet/issues/5)
* improve document structure ([#24](https://github.com/fluid-project/trivet/issues/24)) ([d8dc3e8](https://github.com/fluid-project/trivet/commit/d8dc3e878e086d4defbd7012b349faf7ace1881d)), closes [#7](https://github.com/fluid-project/trivet/issues/7) [#8](https://github.com/fluid-project/trivet/issues/8) [#9](https://github.com/fluid-project/trivet/issues/9) [#10](https://github.com/fluid-project/trivet/issues/10)
* load filters from plugin ([#33](https://github.com/fluid-project/trivet/issues/33)) ([b099e24](https://github.com/fluid-project/trivet/commit/b099e242242ad0cdb809fb965a080f220d323d8f)), closes [#25](https://github.com/fluid-project/trivet/issues/25) [#26](https://github.com/fluid-project/trivet/issues/26)
* rename default.njk to base.njk ([390c262](https://github.com/fluid-project/trivet/commit/390c262eccbb2c4bd915559f998a4d5bcbd315ea))
* rename to Trivet ([1fcd269](https://github.com/fluid-project/trivet/commit/1fcd269cbb9a381100b21037ffc90c6b9b242107))
* update references to base.njk ([6f73b8e](https://github.com/fluid-project/trivet/commit/6f73b8ed1171ac076afb3576afcb471d639cb8bf))
* use webpack for CSS, Sass and Stylus as well as JavaScript (resolves [#27](https://github.com/fluid-project/trivet/issues/27)) ([#37](https://github.com/fluid-project/trivet/issues/37)) ([2a52baf](https://github.com/fluid-project/trivet/commit/2a52bafdc1ae7703c13bc91731b95078a77bbf2f))


### Bug Fixes

* add clean step to start command ([8eebc5f](https://github.com/fluid-project/trivet/commit/8eebc5f514889d9aaaef54153fdc4ec7a623f769))
* add trailing newlines ([9aafd0d](https://github.com/fluid-project/trivet/commit/9aafd0d15e15179796e30ef1a4968595010c2f49))
* adjust copyright holders ([6bad467](https://github.com/fluid-project/trivet/commit/6bad46733b583e948a542016b7b50b5266b14363))
* adjust template references ([#61](https://github.com/fluid-project/trivet/issues/61)) ([2b31a24](https://github.com/fluid-project/trivet/commit/2b31a24fbba77d4aa58a6ea618cd8f5ab5e1e834))
* allow templating in HTML and Markdown ([#39](https://github.com/fluid-project/trivet/issues/39)) ([63c02ab](https://github.com/fluid-project/trivet/commit/63c02abd23196dc13ad3acc376092666ff761068))
* copy map ([bed21a0](https://github.com/fluid-project/trivet/commit/bed21a0c140975f417ae1a612d8d4e31d8a919e0))
* copy the correct file ([7b153d9](https://github.com/fluid-project/trivet/commit/7b153d9d53b69290c0f035f9adfe7ebfa6f66afb))
* expand lint configuration, fix indents ([31dc696](https://github.com/fluid-project/trivet/commit/31dc696457a75c6704d3dfba8e29fd228c5feb42))
* header copyright with generic reference to AUTHORS.md ([e44a34c](https://github.com/fluid-project/trivet/commit/e44a34c5c3ec2d31819fe3e0dc062d774384dcd7))
* move stylesheets into generic partial ([9b81234](https://github.com/fluid-project/trivet/commit/9b81234440bf0314b366b54614b0feb53ec38aae))
* remove anonymous closure ([eb161f2](https://github.com/fluid-project/trivet/commit/eb161f2b95c5a7e300965a4e8d8e2728e1f26d25))
* remove Foundation code ([d48fa8a](https://github.com/fluid-project/trivet/commit/d48fa8a549548634be439b17e37ae8a1af0cabaf))
* remove Roboto ([e62fee7](https://github.com/fluid-project/trivet/commit/e62fee7d8b2fa421e3335f6c1ff38028d04c39bd))
* rename directory to scripts ([e717e6c](https://github.com/fluid-project/trivet/commit/e717e6c24ee8a2b3c95e9671cde3fe0967fc88f2))
* resolve typo in partial path ([67e2295](https://github.com/fluid-project/trivet/commit/67e2295bae9a2e0e38990a5be6f3caa46eda94e4))
* restore newline ([43fd063](https://github.com/fluid-project/trivet/commit/43fd0633da012fbc06a0a697516d8dea9608c03a))
* simplify UIO loading ([75db4ae](https://github.com/fluid-project/trivet/commit/75db4aea50f27673bf7f0b08420242ae57085744))
* update comments ([dce8974](https://github.com/fluid-project/trivet/commit/dce89747063eddf101568124c9df4b150618deb2))
* update copyright year ([0a924f5](https://github.com/fluid-project/trivet/commit/0a924f50c8b3fd965a5f8e89095a224286186a32))
* update project name in Authors.md ([468763a](https://github.com/fluid-project/trivet/commit/468763aff430ab2de382624a49fbce9afa46c594))
* use infusion-uio.min.js ([ee6191e](https://github.com/fluid-project/trivet/commit/ee6191ef9c54e6b3233af3d4c2cddfeaf46889c8))
* use infusion-uio.min.js ([65f16ce](https://github.com/fluid-project/trivet/commit/65f16ce343ecababbfd143453391be9200d613db))
