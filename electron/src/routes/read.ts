import { Response, Request, Router } from 'express'
import { useJWT } from '../jwt'
import { verifyDataSignature, signData } from '../utils/enc'

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

router.post('/verifySignature', async (req: Request, res: Response) => {
  const { data, signature } = req.body
  const publicKey = await User.getUserPublicKey(req.user?.id)
  const valid = verifyDataSignature(data, signature, publicKey)
  res.json({ valid })
})

router.post('/getSignature', async (req: Request, res: Response) => {
  const { data } = req.body
  const privateKey = await User.getUserPrivateKey(req.user?.id)
  const signature = signData(data, privateKey)
  res.json({ signature })
})

export default router
