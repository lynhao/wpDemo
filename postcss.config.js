/**
 * PostCSS 的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果
 我们在stylus-loader编译成css后,再通过将postcss将CSS 代码解析成抽象语法树结构(ast),再交由插件来进行处理
 *插件基于 CSS 代码的 AST 所能进行的操作是多种多样的，比如可以支持变量和混入（mixin），增加浏览器相关的声明前缀，或是把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格式
**/
const autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
	  autoprefixer()  //这个插件用于优化css,给它们加前缀
	]
}