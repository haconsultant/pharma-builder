<template>
    <div id="app">
        <v-system-bar class="system__bar" fixed app window style="-webkit-app-region: drag">
            <v-menu bottom left>
                <v-btn slot="activator" flat small class="button__system">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list class="menu__fixed">
                    <v-list-tile class="menu__item" id="danger">
                        <v-list-tile-title @click="reset()">
                            WARNING / Reset - Local Data <i>(development only)</i><v-icon style="color: #ffe57f;">warning</v-icon>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn flat small class="button__system" @click="minimize()">
                <v-icon>remove</v-icon>
            </v-btn>
            <v-btn flat small class="button__system" @click="close()">
                <v-icon>close</v-icon>
            </v-btn>
        </v-system-bar>
        <v-app dark>
            <v-content>
                <v-container fluid class="flex-fluid">
                    <v-slide-y-transition mode="out-in">
                        <router-view></router-view>
                    </v-slide-y-transition>
                </v-container>
            </v-content>
            <v-footer :fixed="true" app class="footer__app">
                <cron></cron>
                <populate></populate>
                <span class="spacing">beta0.4--ExperimentalUI/Firstflow</span>
                <v-spacer></v-spacer>
                <span class="spacing">Newtoms &copy; 2018</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import Cron from '@/components/Schedule/Cron'
import Populate from '@/components/Sync/Populate'
import { globalConfig } from '@/utils/db/helpers/procesor'
import { resetDatabase, fecthDatabaseConfig } from '@/utils/db/localdb'

const id = '905cf401-c38f-4f72-8df4-662cb8ff621e'
export default {
  name: 'etl-pharma',
  components: { Cron, Populate },
  data: () => ({
    title: 'ETL-Pharma',
    cron: {}
  }),
  created () {
    this.usarData()
    this.$bus.on('add-todo', () => {
      this.checkConfigState()
    })
  },
  beforeDestroy () {
    this.$bus.off('add-todo')
  },
  methods: {
    usarData () {
      this.$store.dispatch('globalId', id).then((response) => {
        fecthDatabaseConfig(id).then(response => {
          if (Object.keys(response).length > 0) {
            this.hasConfig = true
            console.log(response)
            this.$store.dispatch('hasConfig', true)
            this.$store.dispatch('saveDatabaseConfig', response.config)
            this.$store.dispatch('avialableDatabases', response.dataBaseName)
            this.$store.dispatch('saveSyncSchedule', response.cron)
            this.$store.dispatch('currentDatabaseType', response.dataBaseType)
            this.$store.dispatch('pharmacyInfo', response.userInfo.pharmacyInfo).then(() => {
              console.log('At least!!')
            })
          } else {
            this.hasConfig = false
            this.$store.dispatch('hasConfig', false)
          }
        }).then(() => {
          if (!this.hasConfig) {
            this.$router.push('/User/Login')
          } else {
            this.$router.push('/Home')
          }
        })
      })
    },
    checkConfigState () {
      globalConfig(id).then(() => {
        this.$bus.emit('start-cron')
      })
    },
    minimize () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize()
    },
    close () {
      this.$electron.remote.BrowserWindow.getFocusedWindow().hide()
    },
    reset () {
      resetDatabase(id).then((response) => {
        console.log(response)
        this.$router.push('/User/Login')
      })
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
  html { overflow-y: auto }
  #app {
    background-image: url('~@/assets/hcare.png');
    background-repeat: no-repeat;
    background-size: 800px 810px;
  }
  .button__system {
    background: #1F2341!important;
    color: #cdd43d;
    -webkit-app-region: no-drag;
    margin: inherit!important;
    min-width: inherit!important; 
  }
  .content {
    height: 100vh;
  }
  #danger {
    background: #e53935;
  }
  .fix__toolbar {
    transform: translateY(33px)!important;
  }
  .flex-fluid {
    display: flex;
    height: 100%;
    -webkit-app-region: no-drag;
  }
  .footer__app {
    background: rgba(31, 35, 65, 0.43)!important;
    color: #cdd43d!important;
  }
  .menu__container {
    top: 35px!important;
  }
  .menu__fixed {
    background: inherit!important;
    color: inherit!important;
    padding: inherit!important;
  }
  .menu__item {
    border-radius: 4px 8px;
    cursor: pointer;
  }
  .spacing {
    padding: 0rem 2rem;
  }
  .system__bar {
    background: #1F2341;
  }
  .system-bar--window .icon {
    margin: inherit!important;
  }
</style>
