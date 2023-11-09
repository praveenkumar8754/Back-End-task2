import express from 'express'
const router = express.Router()

import StudentRoutes from './Students.js'
router.use('/students',StudentRoutes)

export default router