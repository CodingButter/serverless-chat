// Native
import { join } from 'path'
// @ts-ignore
import Store from 'electron-store'
// Packages
import { BrowserWindow, app, ipcMain, IpcMainInvokeEvent } from 'electron'

import isDev from 'electron-is-dev'
import getServerAddress from './src/server'

const storage: Store = new Store()

const windowBounds = (storage.get('windowBounds') as any) || { width: 800, height: 600, x: 0, y: 0 }
const windowOptions = {
  ...windowBounds,
  //  change to false to use AppBar
  frame: isDev,
  show: true,
  resizable: true,
  fullscreenable: true,
  webPreferences: {
    devTools: isDev,
    contextIsolation: true,
    webSecurity: !isDev,
    preload: join(__dirname, 'preload.js')
  }
}
function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow(windowOptions)

  const port = process.env.PORT || 3000
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../../src/out/index.html')

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url)
  } else {
    window?.loadFile(url)
  }
  // Open the DevTools.
  // window.webContents.openDevTools();
  const saveBounds = () => {
    const { x, y, width: w, height: h } = window.getBounds()
    storage.set('windowBounds', { x, y, width: w, height: h })
  }
  window.on('resize', saveBounds)
  window.on('move', saveBounds)

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize()
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  })
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize()
  })

  ipcMain.on('close', () => {
    window.close()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('getServerAddress', (_: IpcMainInvokeEvent, __: string) => {
  return getServerAddress()
})

ipcMain.handle('getItem', (_: IpcMainInvokeEvent, key: string) => {
  const servers = storage.get(key)
  return servers
})

ipcMain.handle('setItem', (_: IpcMainInvokeEvent, { key, value }: { key: string; value: any }) => {
  storage.set(key, value)
})
