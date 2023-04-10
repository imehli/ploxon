const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
// const API_URL = 'http://localhost'
const API_URL = 'https://www.ploxon.com'
const BACKEND_PORT = 5050

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader'
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(`${API_URL}:${BACKEND_PORT}/api`)
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css'
    }),
    new FaviconsWebpackPlugin({
      logo: './public/favicon.png'
    })
  ]
})
