import express from 'express'
const router = express.Router()
import TransactionManagerController from '../app/controllers/TransactionsManagerController.js';


router.get('/danh_sach_nhan_vien',TransactionManagerController.showList)
router.post('/danh_sach_nhan_vien/them_nhan_vien',TransactionManagerController.addEmployee)
router.get('/danh_sach_nhan_vien/thong_tin_tai_khoan/:id',TransactionManagerController.getAccount)
router.post('/danh_sach_nhan_vien/sua_tai_khoan/:id',TransactionManagerController.editEmployee)
router.delete('/danh_sach_nhan_vien/xoa_tai_khoan', TransactionManagerController.deleteAccount)
router.get('/', TransactionManagerController.show)

export default router;