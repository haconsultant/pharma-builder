<template>
  <v-card class="flex-fluid" id="home__box">
                <v-container class="full-flex">
                <home-info></home-info>
        </v-container>
            <v-container class="full-flex">
                <home-connection></home-connection>
        </v-container>
                <v-container class="full-flex">
                  <home-schedule></home-schedule>
        </v-container>
  </v-card>
</template>

<script>
  import HomeConnection from './Home/HomeConnection'
  import HomeInfo from './Home/HomeInfo'
  import HomeSchedule from './Home/HomeSchedule'
  export default {
    name: 'welcome',
    components: { HomeConnection, HomeInfo, HomeSchedule },
    created () {
      // this.usarData()
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  #home__box {
    background: rgba(1, 153, 148, 0.88);
  }
  .full-flex {
    display: flex;
  }
  .flex-fluid
  {
    flex: 1;
    display: flex;
    flex-flow: column;
  }

  .padd
  {
    padding: 1rem;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
