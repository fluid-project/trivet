"use strict";

const { localizeData } = require("eleventy-plugin-fluid");

module.exports = () => {
    return localizeData({}, __dirname);
};
