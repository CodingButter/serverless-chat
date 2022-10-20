import { ipcRenderer, contextBridge } from 'electron'

declare global {
  interface Window {
    Main: typeof api
    ipcRenderer: typeof ipcRenderer
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendEvent: (event: string, data: any) => {
    ipcRenderer.send(event, data)
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize')
  },
  Maximize: () => {
    ipcRenderer.send('maximize')
  },
  Close: () => {
    ipcRenderer.send('close')
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
  send: (event: string, data: any) => {
    const response = ipcRenderer.invoke(event, data)
    return response
  },
  setItem: (key: string, value: any) => {
    const response = ipcRenderer.invoke('setItem', { key, value })
    return response
  },
  getItem: (key: string) => {
    const response = ipcRenderer.invoke('getItem', key)
    return response
  }
}
contextBridge.exposeInMainWorld('Main', api)
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
