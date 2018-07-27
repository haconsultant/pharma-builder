<template>
    <p class="hidde">Happy to see me? -- this is a Joke // dont you smile me like that I am a bad vue.js arquitecture developer so I will improve, so see yoo next time, or not (Repairing Global Instances of CRON for now is like this XD)</p>
</template>

<script>
export default {
  data: () => ({
    cron: undefined
  }),
  created () {
    this.$bus.on('cron', () => {
      this.start()
    })
    this.$bus.on('stop-cron', () => {
      this.stop()
    })
  },
  beforeDestroy () {
    this.$bus.off('cron')
    this.$bus.off('stop-cron')
  },
  methods: {
    start () {
      if (this.cron === undefined) {
        let timer = this.$store.state.schedule.cron
        console.log(timer)
        let job
        job = this.$cron.schedule(timer, () => {
          this.$bus.emit('sycn')
        })
        this.cron = job
        this.cron.start()
        console.log(this.cron)
      } else {
        console.log('reschedule')
        this.reschedule()
      }
    },
    stop () {
      this.cron.destroy()
      this.cron = undefined
      console.log(this.cron)
    },
    reschedule () {
      this.stop()
      this.start()
    }
  }
}
</script>
<style>
  .hidde {
    display: none;
  }
</style>

