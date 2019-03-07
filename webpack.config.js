var path = require('path');
var htmlwp = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: ['babel-loader', 'css-loader' ] }
		]
	},
	mode: 'development',
	devServer: {
		host: '0.0.0.0',
		contentBase: './dist',
		hot: true,
		inline: true,
		port: 8080
	},
	watch: true,
	plugins: [
		new htmlwp({
			template: 'app/index.html',
			title: 'HMR'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
