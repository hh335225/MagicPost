import express from 'express'
const router = express.Router()
import transaction_staffController from '../app/controllers/Transactions_staffController.js';

router.get('/', transaction_staffController.show)

export default router;