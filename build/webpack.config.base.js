const path = require('path')
const CreateVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   extractCSS: true
        // }
        options: CreateVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}


module.exports = config

