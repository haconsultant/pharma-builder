import { fecthDatabaseConfig } from '@/utils/db/localdb'
import q from 'q'
import store from '@/store'

export function globalConfig (globalId) {
  var deferred = q.defer()
  fecthDatabaseConfig(globalId).then(response => {
    console.log(response)
    if (Object.keys(response).length > 0) {
      store.dispatch('saveDatabaseConfig', response)
      store.dispatch('avialableDatabases', response.dataBaseName)
      store.dispatch('saveSyncSchedule', response.cron)
      store.dispatch('currentDatabaseType', response.dataBaseType)
      store.dispatch('pharmacyInfo', { id: response.user.pharmacy.id, idBranch: response.user.pharmacy.idBranch }).then(() => {
        console.log('At least!!')
      })
      deferred.resolve(true)
    } else {
      deferred.resolve(false)
    }
  })
  return deferred.promise
}
