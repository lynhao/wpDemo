const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
  	preserveWhitespace: true,   // 去除html中elment的空格
  	extractCSS: !isDev, // 单独打包css(包括.vue文件中的css)
  	cssModules: {
  	  localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
  	  camelCase: true  //驼峰命名, '-'的连接符在js变量不允许
  	},
  	// hotReload: true   //热重载,默认会根据环境变量生成
  	// loaders: {
  	//   'docs': docsLoader   //自定义vue模块, 例如给组件库的样例文件写文档
  	// }
  	// preLoader: {
  	//   //解析之前先用某个loader处理
  	// },
  	// postLoader: {
 	 //  //解析之后先用某个loader处理
  	// }
  }
}