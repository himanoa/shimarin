const path = require('path')
const ENV = process.env.NODE_ENV || 'development'
const DEV_PORT = process.env.PORT || 4444
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: DEV_PORT
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: DEV_PORT,
  },
  devtool: process.env.NODE_ENV === 'production' ? null : 'inline-source-map',
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new FlowWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.template.ejs',
      inject: 'body',
    })
  ]
}
