const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, './src/index'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'  //预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
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
  config.module.rules.push({
    test: /\.styl$/,
    use: [
          'style-loader',  //将 JS 字符串生成为 style 节点
          'css-loader',   //将 CSS 转化成 CommonJS 模块
          {
            loader: 'postcss-loader',
            options: {
            sourceMap: true   //复用上一个loader的sourceMap
          }
        },
          'stylus-loader'
      ]
  })
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
} else {
  config.entry = {
    app: path.join(__dirname, './src/index'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
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
    },
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config

