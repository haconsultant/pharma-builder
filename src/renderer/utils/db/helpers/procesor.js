import { fecthDatabaseConfig } from '@/utils/db/localdb'
import store from '@/store'

export function globalConfig (globalId) {
  return new Promise((resolve, reject) => {
    fecthDatabaseConfig(globalId).then(response => {
      if (Object.keys(response).length > 0) {
        store.dispatch('hasConfig', true)
        store.dispatch('saveDatabaseConfig', response.config)
        store.dispatch('avialableDatabases', response.dataBaseName)
        store.dispatch('saveSyncSchedule', response.cron)
        store.dispatch('currentDatabaseType', response.dataBaseType)
        store.dispatch('pharmacyInfo', { id: response.user.pharmacy.id, idBranch: response.user.pharmacy.idBranch }).then(() => {
          console.log('At least!!')
        })
      } else {
        store.dispatch('hasConfig', false)
      }
    })
    console.log(store.state.global.hasConfig)
    resolve(store.state.global.hasConfig)
  })
  // deferred.resolve('Hallo!')
}
