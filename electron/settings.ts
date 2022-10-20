import Store from 'electron-store'

const storage: Store = new Store()
type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export const setBounds = (bounds: Rectangle): void => {
  storage.set('bounds', bounds)
}

export const getBounds = (): Rectangle => {
  const bounds = (storage.get('bounds') || { x: 0, y: 0, width: 800, height: 600 }) as Rectangle
  setBounds(bounds)
  return bounds
}

type server = {
  name: string
  host: string
  port: number
  password: string
}

export const setServers = (servers: server[]): void => {
  const currentServers = (storage.get('servers') || []) as server[]
  const serverList = [...currentServers, ...servers]
  storage.set('servers', serverList)
}

export const getServers = (): server[] => {
  const servers = (storage.get('servers') || []) as server[]
  if (!servers.length) storage.set('servers', [])
  return servers
}

export default { setBounds, getBounds, setServers, getServers }
