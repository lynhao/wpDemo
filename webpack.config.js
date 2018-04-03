const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, './src/index'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
       {
        test: /\.styl$/,
        use: [
          'style-loader',  //将 JS 字符串生成为 style 节点
          'css-loader',   //将 CSS 转化成 CommonJS 模块
          'stylus-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|svg|png)$/,
        use: [
          { 
            loader: 'url-loader',
            options: {
              limit: 1024,   //判断图片大小小于1M, loader会将其转译成base64
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' :'"production"'
    }
  }),
    new HtmlPlugin()
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'  //帮助调试代码 sourceMap
  config.devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    // open: true
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config

