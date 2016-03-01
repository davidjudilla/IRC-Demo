var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// Source maps help for debugging, 
	// 	since we're minimizing and compressing our code.
	// Source maps keep tabs on where 
	// 	bundled code is relative to the source code
	devtool: 'cheap-eval-source-map', 
	entry: [
		'webpack-hot-middleware/client',
		'./src/index'

	], //Webpack assumes .js
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		// Built in webpack plugins that minimize and optimize our code
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			/* 
				Webpack will generate a index.html file into the output
				with the contents of /src/index.html slightly 
				modified to include our modules
			*/
			template: './src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			// Regex search for .css files
			// Which will be piped into loaders from right to left (think about popping the loader array)
			test: /\.css$/,
			loaders: ['style', 'css']
		}]
	},
	devServer: {
		contentBase: './dist',
		hot: true
	}
}