const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpackManifest = require("webpack-pwa-manifest");

module.exports = {
	entry: {
        main:'./src/index.js',
        standing_bundle: './src/standing-bundle.js',
        team_bundle: './src/team-bundle.js'
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
			},
			{
				test: /\.(png|svg|jpg|gif)$/i,
				loader: "file-loader",
				options: {
					name: '[name].[ext]',
					publicPath: 'assets',
					outputPath: 'assets',

				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader",
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new htmlWebpackPlugin({
			filename: "index.html",
			inject: true,
			chunks: ['main'],
			template: "./src/index.html"
        }),
        new htmlWebpackPlugin({
			filename: "standing.html",
			inject: true,
			chunks: ['standing_bundle'],
			template: "./src/standing.html"
        }),
        new htmlWebpackPlugin({
			filename: "team.html",
			inject: true,
			chunks: ['team_bundle'],
			template: "./src/team.html"
		}),
		new htmlWebpackPlugin({
			filename: "nav.html",
			inject: false,
			template: "./src/nav.html"
		}),
		new htmlWebpackPlugin({
			filename: "./pages/home.html",
			inject: false,
			template: "./pages/home.html"
		}),
		new htmlWebpackPlugin({
			filename: "./pages/matches.html",
			inject: false,
			template: "./pages/matches.html"
		}),
		new htmlWebpackPlugin({
			filename: "./pages/favorite.html",
			inject: false,
			template: "./pages/favorite.html"
		}),
		new workboxPlugin.InjectManifest({
			swSrc: './src/workbox-sw.js'
		}),
		new webpackManifest({
			name: "League Football",
			short_name: "League FB",
			description: "PWA Football API",
			theme_color: "#e53935",
			background_color: "#ffffff",
			display: "standalone",
			orientation: "landscape",
			Scope: "/",
			start_url: "/index.html",
			gcm_sender_id: "665437612559",
			icons: [
				{
					src: path.resolve('assets/icon.png'),
					sizes: [72, 96, 128, 144, 152, 192, 384, 512],
					destination: 'assets',
				}
			],
			ios: true,
			fingerprints: false,

		})
	]
};