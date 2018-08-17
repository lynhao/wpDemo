<template>
  <div :class="$style.notification" :style="style">
    <span :class="$style.content">{{content}}</span>
    <a :class="$style.btn" @click.prevent="closeBtn">{{close}}</a>
  </div>
</template>
<script>
  export default {
    name: 'Notification',
    props: {
      content: {
        type: String,
        default: true
      },
      close: {
        type: String,
        default: '关闭'
      }
    },
    data () {
      return {
        visible: true
      }
    },
    computed: {
      style () {
        return {}
      }
    },
    methods: {
      closeBtn (e) {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="stylus" module>
.notification 
  position fixed
  right: 20px
  display: flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 20px
  position fixed
  min-width 280px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap wrap
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>