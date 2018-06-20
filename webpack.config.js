
const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',

  devtool: 'eval', // source-map
  cache: true,
  
  target: 'electron-renderer',
  
  entry: {
	'polyfills': './src/polyfills.ts',
    'app': './src/app/main',
	'vendor': './src/vendor.ts',
    'styles': './src/app/css/css.js'
  },

  // Config for our build files
  output: {
    path: helpers.root('src/app/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
	sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.js', '.css', '.html'],

    modules: [
      helpers.root('src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
		{
			test: /\.css$/,
			use: [
			  MiniCssExtractPlugin.loader,
			  "css-loader"
			]
		},

		{
			test: /\.ts$/,
			loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
			exclude: [/\.(spec|e2e)\.ts$/]
		},

      // support for .html antd .css as raw text
		{
			test: /\.html$/,
			loader: 'raw-loader',
			exclude: [helpers.root('app/index.html')]
		},

		{
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			loader: 'file-loader?name=/fonts/[name]-[hash].[ext]'
		},

		{
			test: /\.svg/,
			loader: 'svg-url-loader'
		}
    ]
  },
  optimization: {
    splitChunks: {
     cacheGroups: {
      vendor: {
       test: /node_modules/,
       chunks: 'initial',
       name: 'vendor',
       enforce: true
      },
     }
    }
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false
  },
  plugins: [
	new webpack.DefinePlugin({  $dirname: '__dirname' }),
    new webpack.IgnorePlugin(/^(canvas|jsdom)$/),
	
    new MiniCssExtractPlugin({
      filename: "/[name].css",
      chunkFilename: "/[id].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};