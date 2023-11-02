import express from 'express'
const router = express.Router()
import managerController from '../app/controllers/ManagerController.js';

router.get('/', managerController.show)

export default router;
