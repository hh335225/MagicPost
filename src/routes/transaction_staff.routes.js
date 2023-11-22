import express from 'express'
const router = express.Router()
import transaction_staffController from '../app/controllers/Transactions_staffController.js';

router.get('/hoadon/:code_tracking', transaction_staffController.show_hoa_don)
router.post('/tao_don_hang', transaction_staffController.tao_don_hang)
router.get('/', transaction_staffController.show)

export default router;