<script>
  export default {
    name: 'Tab',
    props: {
      index: {
        type: [Number, String],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    inject: ['data'],
    computed: {
      active () {
        // return this.$parent.value === this.index
        return this.data.value === this.index
      }
    },
    mounted () {

    },
    methods: {
      handleSelect (index) {
        console.log(this.$root)
        this.$parent.onSelect(this.index)
      }
    },
    render () {
      const tab = this.$slots.label || <span>{this.label}</span>
      const classNames = {
        tab: true,
        active: this.active
      }
      return (
        <li class={classNames} on-click={this.handleSelect}>
          {tab}
        </li>
      )
    }
  }
</script>
<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer
    display inline-block
    &.active
      border-bottom 2px solid blue
      color: red
    &:last-child
      margin-right 0
</style>
