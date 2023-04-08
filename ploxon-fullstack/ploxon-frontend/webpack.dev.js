const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const API_URL = 'http://localhost'
const FRONTEND_PORT = 8080
const BACKEND_PORT = 5050

module.exports = merge(common, {
  mode: 'development',
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
        loader: 'style-loader'
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
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: './public'
    },
    historyApiFallback: true,
    port: FRONTEND_PORT
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(`${API_URL}:${BACKEND_PORT}/api`)
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
