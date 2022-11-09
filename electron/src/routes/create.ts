import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import { useJWT } from '../jwt'
import { User as UserType, Server } from '../types/custom'
import User from '../db'

const makeFolderIfNotExists = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
  }
}
const uploadDirectory = path.join(__dirname, '..', '..', 'uploads')

makeFolderIfNotExists(uploadDirectory)

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.user as UserType
      const userDirectory = path.join(uploadDirectory, `${id}`)
      makeFolderIfNotExists(userDirectory)
      const fieldFolder = path.join(userDirectory, file.fieldname)
      makeFolderIfNotExists(fieldFolder)
      cb(null, fieldFolder)
    },
    filename: (_, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  }),
  fileFilter: (_, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Please upload an image'))
    }
    return cb(null, true)
  }
})

const router = Router()

router.use(useJWT)

router.post('/server', upload.single('serverIcon'), async (req, res) => {
  const { id } = req.user as UserType
  const server = JSON.parse(req.body.server) as Server
  if (!req.file) return res.status(400).send('No Image was uploaded.')
  const imgFile = req.file as any
  const imageUrl = `files/${id}/${imgFile.fieldname}/${imgFile.filename}`
  server.avatar = imageUrl
  return res.json(await User.createServer(id, server))
})

router.post('/channel', async (req, res) => {
  const { id } = req.user as UserType
  const { serverId, channel } = req.body
  if (!serverId || !channel) return res.status(400).send('No serverId or channel was provided.')
  return res.status(200).json(await User.createChannel(id, serverId, channel))
})

export default router
