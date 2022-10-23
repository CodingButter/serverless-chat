import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from './types/custom'

dotenv.config()
const secret = process.env.JWT_SECRET || 'secret'
const expiresIn = process.env.JWT_EXPIRES_IN || '10d'
export const createJWT = (username: string, id: number) => {
  const token = jwt.sign({ username, id }, secret, { expiresIn })
  return token
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (err) {
    return false
  }
}

export const refreshJWT = (token: string) => {
  const decoded = jwt.decode(token) as any
  const newToken = jwt.sign(decoded, secret, { expiresIn })
  return newToken
}

export const useJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  if (token) {
    const decoded = verifyJWT(token) as User
    if (decoded) {
      req.user = decoded
      next()
    } else {
      res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    res.status(401).json({ error: 'Must be logged in' })
  }
}
