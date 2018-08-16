<script>
  export default {
    name: 'Tabs',
    // 这里provide必须是这种写法,如果直接返回一个对象,由于Vue的实例还没创建是拿不到this
    provide () {
      const data = {}
      Object.defineProperty(data, 'value', {
        get: () => {
          return this.value
        },
        enumerable: true
      })
      return {
        // value: this.value
        data
      }
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    render () {
      return (
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.options}
          </ul>
        </div>
      )
    },
    methods: {
      onSelect (index) {
        this.$emit('select', index)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.tabs-header
  margin: 0
  padding: 0
  border-bottom: 2px solid #ededed
</style>