import express from 'express'
const router = express.Router()
import transaction_staffController from '../app/controllers/Transactions_staffController.js';

router.get('/hoadon', transaction_staffController.show_hoa_don)
router.get('/', transaction_staffController.show)

export default router;