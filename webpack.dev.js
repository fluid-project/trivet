const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// @see https://github.com/clenemt/eleventy-webpack/blob/master/webpack.dev.js

module.exports = {
  mode: 'development',
  watch: true,
  stats: { colors: true },
  // Can't use faster eval due to a bug with MiniCssExtractPlugin
  // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/29
  devtool: 'source-map',
  entry: {
	'analytics': path.resolve(__dirname, 'src/assets/js/analytics.js'),
	'uio': path.resolve(__dirname, 'src/assets/js/uio.js'),
  },
  output: {
	filename: '[name].js',
	path: path.resolve(__dirname, 'dist/assets/js'),
	publicPath: '/assets/js'
  },
  plugins: [
	// Will create a `webpack.njk` with the css/jss files
	// that then gets picked up by eleventy
	new HtmlWebpackPlugin({
	  template: path.resolve(__dirname, 'webpack.html'),
	  filename: path.resolve(__dirname, 'src/_includes/partials/scripts.njk'),
	  // Hash is used for cache busting the generated webpack.html
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