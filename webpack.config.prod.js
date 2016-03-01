var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: ['./src/index'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		//Built in webpack plugins that minimize and optimize our code
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			/* 
				Webpack will generate a index.html file into the output
				with the contents of /src/index.html slightly 
				modified to include our modules
			*/
			template: './src/index.html'
		})
	],
	module: {
		loaders: [{
			//Regex search for .css files
			//Which will be piped into loaders from right to left (think about popping the loader array)
			test: /\.css$/,
			loaders: ['style', 'css']
		}]
	}
	// We don't load devServer in prod, because duh
}