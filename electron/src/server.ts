import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import create from './routes/create'
import read from './routes/read'
import update from './routes/update'
import del from './routes/delete'
import { createJWT } from './jwt'
import User from './db'

dotenv.config()

let port = process.env.SERVER_PORT || 0
const app = express()
app.use(express.json())
app.use(cors())
app.use('/create', create)
app.use('/read', read)
app.use('/update', update)
app.use('/delete', del)

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await User.login(username, password)
  if (user) {
    const token = createJWT(user.username, user.id)
    res.json({ token, user })
  } else {
    res.json({ error: 'Invalid username or password' })
  }
})

app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await User.register(username, password)
  if (user) {
    const token = createJWT(user.username, user.id)
    res.json({ token, user })
  } else {
    res.status(400).json({ error: 'Username already taken' })
  }
})

type AddressInfo = {
  address: string
  family: string
  port: number
}

const server = app.listen(port, async () => {
  const { port: p } = server?.address?.() as AddressInfo
  port = p
  console.log(`App listening at http://localhost:${port}`)
})

const getServerAddress = () => {
  return `http://localhost:${port}`
}

export default getServerAddress
