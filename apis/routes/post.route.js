import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, getPosts } from '../controllers/poste.controller.js'
const router = express.Router()

router.post('/create',verifyToken,create)
router.get('/getPosts',getPosts)
export default router