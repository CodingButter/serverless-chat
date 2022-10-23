import { Response, Request, Router } from 'express'
import { useJWT } from '../jwt'
import User from '../db'

const router = Router()

router.use(useJWT)

router.get('/user', async (req: Request, res: Response) => {
  return res.json(await User.getUser(req?.user?.id))
})

router.get('/servers', async (req: Request, res: Response) => {
  return res.json(await User.getServers(req?.user?.id))
})

router.get('/servers/:id', async (req: Request, res: Response) => {
  return res.json(await User.getServer(req?.user?.id, req.params.id))
})

router.get('/servers/:serverId/channels', async (req: Request, res: Response) => {
  return res.json(await User.getChannels(req.user?.id, req.params?.serverId))
})

router.get('/servers/:serverId/channels/:id', async (req: Request, res: Response) => {
  return res.json(await User.getChannel(req.user?.id, req.params?.serverId, req.params?.id))
})

export default router
