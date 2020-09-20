const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './dist',
		disableHostCheck: true,
		// host: '192.168.1.107'
	},
	module: {
		rules: [{
			test: /\.(js)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}],
		}, {
			test: /\.s[ac]ss$/i,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[local]'
					}
				}
			}, {
				loader: 'sass-loader'
			}]
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/'
				}
			}],
		}, {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader'
				// options: {
				// 	name: '[name].[ext]',
				// 	outputPath: 'fonts/'
				// }
			}]
		}, {
			test: /\.handlebars$/,
			loader: 'handlebars-loader',
			exclude: /(node_modules|bower_components)/
		}]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};
