import express from 'express'
const router = express.Router()
import WarehouseManagerController from '../app/controllers/WarehouseManagerController.js';

router.get('/danh_sach_nhan_vien',WarehouseManagerController.showList)
router.post('/danh_sach_nhan_vien/them_nhan_vien',WarehouseManagerController.addEmployee)
router.get('/danh_sach_nhan_vien/thong_tin_tai_khoan/:id',WarehouseManagerController.getAccount)
router.post('/danh_sach_nhan_vien/sua_tai_khoan/:id',WarehouseManagerController.editEmployee)
router.delete('/danh_sach_nhan_vien/xoa_tai_khoan', WarehouseManagerController.deleteAccount)
router.get('/', WarehouseManagerController.show)

export default router;