<template>
    <v-container class="item__container">
        <v-card color="blue-grey lighten-5" id="conn__module" class="fixed__card">
            <v-card-title primary-title>
                <div class="headline">Base de Datos</div>
                <v-btn :loading="sync" @click="testingGlobal()">Sync</v-btn>
                <v-btn @click="getInfo()">Local Info</v-btn>
            </v-card-title>
            <v-card-text class="fluid__container"> 
                <h1>{{database}}</h1>
                <p>{{'Servidor - ' + server}}</p>
            </v-card-text>
            <v-card-actions>
                <v-layout align-center justify-end class="mid__title" style="margin-top: -2rem!important;">
                <v-btn @click="openConfig()">Configuracion<v-icon right dark>settings</v-icon></v-btn>
                <v-btn router to="/Walkthrough/WalkthroughSteps">Paso a paso<v-icon right dark>list</v-icon></v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark color="accent" class="large__title">
                    <v-btn icon class="error" @click.native="dialog = false">
                        <v-icon>close</v-icon>  
                    </v-btn>
                    <v-toolbar-title>Configuracion de Base de Datos</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="saveDatabaseConfig()">Guardar</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Conexion del Servidor</v-subheader>
                        </v-layout>
                        <v-form class="config__controls">
                            <v-text-field v-model="config.server" label="Direcion del Servidor" required></v-text-field>
                            <v-text-field v-model="config.userName" label="Usuario" required></v-text-field>
                            <v-text-field v-model="config.password" label="Contraseña" required></v-text-field>
                            <v-layout align-center justify-center>
                                <v-btn :loading="isLoading" large @click="serverConnection">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader class="large__title">
                        <v-layout align-center justify-center>
                            <v-subheader class="headline">Base de Datos</v-subheader>
                        </v-layout>
                        <v-form  class="config__controls">
                            <v-select :disabled="!isServerConfig" outline v-model="config.options.database" :items="dataBaseName" label="Bases de Datos"></v-select>
                            <v-layout  align-center justify-center>
                                <v-btn :disabled="!isServerConfig" :loading="isLoadingDatabase" large @click="connectDatabase">Conectarse</v-btn>
                            </v-layout>
                        </v-form>
                    </v-list>
                </v-card-text>
                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mssqlServerConnection, mssqlConectDataBase } from '@/utils/server/mssql'

export default {
  data () {
    return {
      isServerConfig: false,
      isLoading: false,
      isLoadingDatabase: false,
      dialog: false,
      dataBaseName: [],
      activeDatabase: '',
      databaseType: '',
      config: {
        userName: '',
        password: '',
        server: '',
        options: {
          database: '',
          rowCollectionOnDone: true
        }
      }
    }
  },
  computed: {
    database () {
      return this.$store.state.database.config.options.database === 'efficacis3' ? 'Effacis' : 'SmartPharma'
    },
    sync () {
      return this.$store.state.global.synchronizing
    },
    server () {
      return this.$store.state.database.config.server
    }
  },
  created () {
    /* this.getConfigInfo()
    this.getDetails() */
  },
  methods: {
    getInfo () {
      console.log(this.$store.state)
    },
    testingGlobal () {
      this.$bus.emit('sycn')
    },
    openConfig () {
      this.dialog = true
      let Databases = this.$store.state.database.databases
      let config = this.$store.state.database.config
      let current = this.$store.state.database.config.options.database === 'efficacis3' ? 'Effacis' : 'SmartPharma'
      this.activeDatabase = current
      this.config = {
        userName: config.userName,
        password: config.password,
        server: config.server,
        options: {
          database: config.database,
          rowCollectionOnDone: true
        }
      }
      this.config.options.database = current
      this.dataBaseName = Databases
      console.log(this.config)
      console.log(this.dataBaseName)
    },
    serverConnection () {
      this.isLoading = true
      this.isServerConfig = false
      this.connectSuccessful = true
      this.dataBaseName = []
      mssqlServerConnection(this.config).then(response => {
        this.isServerConfig = true
        response.forEach(tuple => {
          this.dataBaseName.push({text: tuple.DATABASE_NAME, value: tuple.DATABASE_NAME})
        })
      }).then(() => {
        this.isLoading = false
        console.log(this.dataBaseName)
      })
    },
    getConfigInfo () {
      let dataBaseConfig = Object.assign({}, this.$store.state.database.config)
      let databases = this.$store.state.database.databases
      let current = this.$store.state.database.config.options.database === 'efficacis3' ? 'Effacis' : 'SmartPharma'
      this.config = Object.assign({}, dataBaseConfig)
      this.activeDatabase = current
      if (!this.dataBaseName.length > 0) {
        databases.forEach((database) => {
          this.dataBaseName = database
        })
      }
    },
    saveDatabaseConfig () {
      console.log(this.config)
      this.$store.dispatch('saveDatabaseConfig', this.config)
    },
    connectDatabase () {
      this.isLoadingDatabase = true
      mssqlConectDataBase(this.config).then(response => {
        if (response.valid) {
          this.databaseType = response.schema
          this.isLoadingDatabase = false
        } else {
          console.log(this.config)
        }
      })
    }
  }
}
</script>

<style>
  #conn__module {
    background-image: url('~@/assets/conn_module.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .fluid__container {
    flex: 1;
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
  .mid__title {
      padding: 1.5rem;
  }
</style>
