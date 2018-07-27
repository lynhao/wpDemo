<template>
  <header :class="$style.mainHeader">
    <h1>进击webpack</h1>
  </header>
</template>

<!-- <script>
	export default {
		computed: {
			$style() {
				return {
					mainHeader: '[path]-[name]'
				}
			}
		}
	}
</script>-->

<style lang="stylus" module>
.main-header{
  text-align center
  h1{
    font-size 100px
    color: red
    font-weight 100
    margin 20px
  }
}
</style>
<!-- <docs>
#123 = 456
</docs> -->