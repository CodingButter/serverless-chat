import { Router } from 'express'
import { useJWT } from '../jwt'

const router = Router()

router.use(useJWT)

export default router
