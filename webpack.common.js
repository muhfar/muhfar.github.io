const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
        main:'./index.js',
        standing_bundle: './standing-bundle.js',
        team_bundle: './team-bundle.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module:{
		rules:[{
			test: /\.css$/,
			use: [
				{
					loader: "style-loader"
				},
				{
					loader: "css-loader"
				}
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: "index.html",
			inject: true,
			chunks: ['main'],
			template: "./index.html"
        }),
        new htmlWebpackPlugin({
			filename: "standing.html",
			inject: true,
			chunks: ['standing_bundle'],
			template: "./standing.html"
        }),
        new htmlWebpackPlugin({
			filename: "team.html",
			inject: true,
			chunks: ['team_bundle'],
			template: "./team.html"
		}),
	]
};