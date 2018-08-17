<!-- <template>
	<div id="app">{{text}}</div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        text: 'text2323'
      }
    }
  }
</script>
<style scoped>
  #app {
  	color: red;
  	font-size: 20px;
  }
</style> -->
<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
     <notification content="test notify" @close="shutdown"></notification>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

console.log(Header.__docs)

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  methods: {
    shutdown () {
    }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


