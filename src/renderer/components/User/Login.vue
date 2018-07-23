<template>
    <v-container fluid class="flex-fluid" id="login__app">
        <v-layout align-center justify-center>
            <v-form ref="form" v-model="valid" lazy-validation class="login__box login__form">
                <v-layout align-center justify-center>
                    <img :src="imgUrl" alt="logo" id="logo">
                </v-layout>
                <h1>Pharma - Inventory Sync</h1>
                <h1>Acceso</h1>
                <v-text-field color="teal accent-3" v-model="user.name" :rules="nameRules" label="Usuario" required></v-text-field>
                <v-text-field v-model="user.password" :rules="passwordRules" label="Contraseña" required></v-text-field>
                <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Selecione una sucursal']" label="Sucursal" required></v-select> -->
                <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Acuerdos de Servicio" required></v-checkbox>
                <v-layout align-center justify-center>
                    <v-btn :disabled="!valid" @click="submit">
                        Acceder
                    </v-btn>
                    <v-btn @click="clear">Limpiar</v-btn>
                </v-layout>
            </v-form>
        </v-layout>
    </v-container>
</template>
<script>
import { logUser, getPharmacyBranches } from '@/utils/api/access'
export default {
  data: () => ({
    imgUrl: 'static/logo.png',
    pharmacies: [],
    branches: [],
    user: {
      id: '',
      name: '12345',
      password: '12345mM*',
      pharmacies: []
    },
    valid: true,
    nameRules: [
      v => !!v || 'Usuario requerido'
    ],
    passwordRules: [
      v => !!v || 'Contraseña requerida'
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        logUser(this.user.name, this.user.password).then(response => {
          if (response.data.message.user_type === 'farmacia') {
            this.user.id = response.data.message.id
            getPharmacyBranches(this.user.id).then(response => {
              this.checkPharmacyInfo(response.data.pharmacies).then(response => {
                this.user.pharmacies = response
                this.$store.dispatch('saveUserData', this.user)
                this.$router.push('/User/PharmacyBranch')
              })
            })
          } else {
            console.log('Crendenciales Incorrectas')
          }
        })
      }
    },
    checkPharmacyInfo (data) {
      var hasBranches = []
      return new Promise((resolve, reject) => {
        data.map((pharmacy) => {
          if (pharmacy.branches.length > 0) {
            hasBranches.push(pharmacy)
          }
        })
        resolve(hasBranches)
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
  #login__app {
    flex-flow: column;
    height: 90px;
  }
  #logo {
    height: 90px;
  }
  .login__form {
    box-shadow: 11px 10px 29px #03827f;
    background-color: rgba(1, 158, 155, 0.8);
  }
  .login__form > h1 {
    text-align: center;
    padding: 1rem;
  } 
  .login__box {
    width: 60vw;
    padding: 3rem;
  /* margin-top: 15rem; */
  }    
  .login__box > * {
    color: azure!important;
  }
</style>
