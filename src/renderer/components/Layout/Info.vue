<template>
    <v-card class="fixed__card">
        <v-card-title primary-title class="pharmacy__card__title">
            <div class="headline">{{ info.pharmacy.name }}</div>
            <p>Rif: {{info.pharmacy.rif}}</p>
        </v-card-title>
        <v-card-text class="fluid__container aling-text-end">
            <p>Surcursal: {{ info.branch.name }} </p>
            <p>Direccion: {{ info.branch.location_info[0] }} </p>
        </v-card-text>
        <v-card-actions class="sync__action">
            <v-btn :loading="sync" fab dark large color="primary" class="sync__button" @click="startSync()">
                <v-icon dark>sync</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.state.user.pharmacyInfo
    },
    sync () {
      return this.$store.state.global.synchronizing
    }
  },
  methods: {
    startSync () {
      this.$bus.emit('sycn')
    }
  }
}
</script>

<style>
  .aling-text-end {
    text-align: end;
  }
  .pharmacy__card__title {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
  .sync__button {
    padding: 4rem;
  }
  .sync__action {
    justify-content: flex-start;
  }
   .sync__action .btn:not(.btn--depressed):active .btn__content, .btn:not(.btn--depressed):focus .btn__content {
     position: inherit!important;
   }
   .sync__action .btn--floating .btn__content {
     margin: -60px;
   }
   .sync__action .btn--floating.btn--large .icon {
     font-size: 5rem;
   }
  /* .sycn__button .btn__content .icon{
    line-height: 0!important;
    font-size: 5rem!important;
  } */
</style>
