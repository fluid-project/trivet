const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// @see https://github.com/clenemt/eleventy-webpack/blob/master/webpack.dev.js

module.exports = {
  mode: 'development',
  watch: true,
  stats: { colors: true },
  devtool: 'source-map',
  entry: {
	'analytics': path.resolve(__dirname, 'src/assets/scripts/analytics.js'),
	'uio': path.resolve(__dirname, 'src/assets/scripts/uio.js'),
  },
  output: {
	filename: '[name].js',
	path: path.resolve(__dirname, 'dist/assets/scripts'),
	publicPath: '/assets/scripts'
  },
  plugins: [
	// Will create a `scripts.njk` with the JavaScript files
	// that then gets picked up by Eleventy
	new HtmlWebpackPlugin({
	  template: path.resolve(__dirname, 'webpack.html'),
	  filename: path.resolve(__dirname, 'src/_includes/partials/scripts.njk'),
	  // Hash is used for cache busting in the generated script.njk
	  // while keeping the same file name in the output
	  hash: true,
	  inject: false
	})
  ],
  module: {
	rules: [
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	  },
	  {
		test: /\.(png|jpe?g|gif|svg)$/i,
		use: [
		  {
			loader: 'file-loader',
			options: {
			  name: '[contenthash].[ext]',
			  outputPath: 'images'
			}
		  }
		]
	  }
	]
  }
};
