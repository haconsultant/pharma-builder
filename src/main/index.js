'use strict'

import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'
import { exists } from 'fs';

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

// import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let iconPath = path.join(__static, 'iconV2.png')

let mainWindow
let tray

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function readyApp () {
  startComponents()
  // createTray()
}
function startComponents () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 840,
    maxHeight: 840,
    minHeight: 840,
    width: 800,
    maxWidth: 800,
    minWidth: 750,
    useContentSize: true,
    frame: false,
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(winURL)
  mainWindow.webContents.openDevTools()
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault()
      mainWindow.hide()
    }
    return false
  })
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Salir',
      accelerator: 'Command+Q',
      selector: 'terminate:',
      click () { exit() }
    }
  ])
  tray.setToolTip('ETL - Herramienta de Migracion')
  tray.setContextMenu(contextMenu)

  tray.on('double-click', () => {
    mainWindow.show()
  })
}

app.on('ready', () => {
  readyApp()
})

app.on('window-all-closed', e => e.preventDefault())

app.on('activate', () => {
  if (mainWindow === null) {
    startComponents()
  }
})

exit () {
  app.quit()
  mainWindow = null
  tray = null
}
/* autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

/* app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
}) */
