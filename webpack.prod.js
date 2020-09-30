const dev = require("./webpack.dev.js");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

// @see https://github.com/clenemt/eleventy-webpack/blob/master/webpack.prod.js

module.exports = merge(dev, {
    mode: "production",
    watch: false,
    devtool: false,
    output: { filename: "[name]-[hash].js" },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true
            })
        ]
    }
});
