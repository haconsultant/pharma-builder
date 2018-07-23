<template>
    <p class="hidde">{{sycn}}</p>
</template>

<script>
import { mssqlGetClientInventory } from '@/utils/server/mssql'
import { sycnInventory } from '@/utils/api/inventory'
export default {
  data: () => ({
    sycn: 'Sync Module'
  }),
  created () {
    this.$bus.on('sycn', () => {
      this.start()
    })
  },
  beforeDestroy () {
    this.$bus.off('sycn')
  },
  methods: {
    start () {
      this.$store.dispatch('isSynchronizing', true)
      mssqlGetClientInventory(this.$store.state.database.config, this.$store.state.database.type).then(response => {
        this.result = response
        console.log(this.result)
      }).then(() => {
        sycnInventory(this.result).then(response => {
          this.$store.dispatch('isSynchronizing', false)
        })
      })
    }
  }
}
</script>

<style>

</style>
