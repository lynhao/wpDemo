import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {}
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
