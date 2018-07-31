<template>
    <v-container class="item__container">
        <v-card color="blue-grey lighten-5" id="cron__module" class="fixed__card">
            <v-card-title primary-title>
                <div class="headline">Sincronización</div>
                <v-btn @click="startCRON()">Start</v-btn>
                <v-btn @click="stopCRON()">Stop</v-btn>
            </v-card-title>
            <v-card-text class="fluid__container"> 
                <h1>{{ `${timer.hours}:${timer.minutes} Horas/Minutos` }}</h1>
                <p>{{ task }}</p>
            </v-card-text>
            <v-card-actions>
                <v-layout align-center justify-end class="large__title" style="margin-top: -2rem!important;">
                   <v-btn  @click.stop="getInfo()">Configuracion<v-icon right dark>settings</v-icon></v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark color="accent" class="large__title">
                    <v-btn icon class="error" @click.native="dialog = false">
                        <v-icon>close</v-icon>  
                    </v-btn>
                    <v-toolbar-title>Configuracion de Sincronización</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="save()">Guardar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Frecuencia de Actualizacion de Inventario</v-subheader>
                        </v-layout>
                        <v-card flat color="transparent" class="step__controls__sm">
                            <v-layout align-center justify-center>
                                <v-subheader class="headline"></v-subheader>
                            </v-layout>
                            <v-card-text>
                                <v-layout row>
                                    <v-flex class="pr-3">
                                        <v-slider label="h:" v-model="cron.hours" :max="12" :min="0"></v-slider>
                                    </v-flex>
                                    <v-flex shrink style="width: 60px">
                                        <v-text-field v-model="cron.hours" class="mt-0" hide-details single-line type="number"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-text>
                                <v-layout row>
                                    <v-flex class="pr-3">
                                        <v-slider label="m:" v-model="cron.minutes" :max="59" :min="1"></v-slider>
                                    </v-flex>
                                    <v-flex shrink style="width: 60px">
                                        <v-text-field v-model="cron.minutes" class="mt-0" hide-details single-line type="number"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-text>
                                <v-layout align-center justify-center>
                                    <v-subheader class="headline">Su Inventario se sincronizara cada:</v-subheader>
                                </v-layout>
                                <v-layout align-center justify-center>
                                    <p class="display-2">{{cron.hours + ' : ' + cron.minutes + ' ' + stateSync}}</p>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;">
                    <!-- <cron></cron> -->
                </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { updateCron } from '@/utils/db/localdb'
export default {
  data () {
    return {
      stateSync: 'm',
      cron: {
        hours: '',
        minutes: ''
      },
      dialog: false
    }
  },
  computed: {
    timer () {
      return this.$store.state.schedule.timer
    },
    task () {
      return this.$store.state.schedule.task
    }
  },
  watch: {
    'cron.hours' () {
      this.isCronSetted = false
      if (this.cron.hours < 10) {
        this.cron.hours = ('0' + this.cron.hours).slice(-2)
      }
      if (this.cron.hours > 0) {
        this.stateSync = 'h'
      } else {
        this.stateSync = 'm'
      }
    },
    'cron.minutes' () {
      this.isCronSetted = false
      if (this.cron.minutes < 10) {
        this.cron.minutes = ('0' + this.cron.minutes).slice(-2)
      }
    }
  },
  methods: {
    getInfo () {
      this.dialog = true
      let time = this.$store.state.schedule.timer
      this.cron.hours = time.hours
      this.cron.minutes = time.minutes
      console.log(this.cron.hours)
      console.log(this.cron.minutes)
    },
    save () {
      this.$store.dispatch('saveSyncSchedule', this.cron)
      this.$bus.emit('cron')
      updateCron()
    },
    startCRON () {
      this.$bus.emit('cron')
    },
    stopCRON () {
      this.$bus.emit('stop-cron')
    }
  }
}
</script>

<style>
  #cron__module {
    background-image: url('~@/assets/cron_module.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .dialog--fullscreen {
      margin: 30px 0px;
  }
  .fixed__card {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width: 100%;
  }
  .item__container {
     margin: 0px;
    display: flex;
  }
  .config__controls {
      padding: 1rem 9rem;
  }
  .large__title {
      padding: 2rem;
  }
</style>
