const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	plugins: [
	  new HtmlPlugin({ template: path.resolve(__dirname, './index.html')})
	],
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
				  loader: 'babel-loader',
				  options: {
				  	presets: ['env']
				  }

				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			}
		]
	}
};