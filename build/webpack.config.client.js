const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge') //合并webpack 配置

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' :'"production"'
    }
  }),
    new HtmlPlugin()
]

let config

const devServer = {
  port: '8000',
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  // open: true
  hot: true
}
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map', 
    module: {
      rules: [{
        test: /\.styl$/,
        use: [
          'vue-style-loader',  //将 JS 字符串生成为 style 节点
          // 'css-loader',   //将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              module: true,   //开启cssModules
              localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
              camelCase: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true   //复用上一个loader的sourceMap
            }
          },
          'stylus-loader'
         ]
      }]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
        ]
      })
    }]
  },
  plugins: defaultPlugins.concat([
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ])
 }
)}
module.exports = config

