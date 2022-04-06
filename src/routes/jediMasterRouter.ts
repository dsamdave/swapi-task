import express from 'express'

import jediMasterCtrl from '../controllers/jediMasterCtrl'

const router = express.Router()

router.get('/welcome', jediMasterCtrl.welcome)

router.get('/task', jediMasterCtrl.task)

export default router;