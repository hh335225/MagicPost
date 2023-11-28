import express from 'express'
const router = express.Router()
import warehouse_staffController from '../app/controllers/Warehouse_staffController.js'


router.get('/hoadon/:code_tracking', warehouse_staffController.show_hoa_don)
router.post('/tui_hang', warehouse_staffController.tui_hang)
router.post('/tao_tui_hang', warehouse_staffController.tao_tui_hang)
router.post('/cap_nhap_trang_thai', warehouse_staffController.cap_nhap_trang_thai)
router.get('/danh_sach_tui_di', warehouse_staffController.danh_sach_tui_di)
router.post('/danh_sach_tui_di', warehouse_staffController.post_danh_sach_tui_di)
router.get('/danh_sach_tui_nhan', warehouse_staffController.danh_sach_tui_nhan)
router.post('/danh_sach_tui_nhan', warehouse_staffController.post_danh_sach_tui_nhan)
router.get('/thong_tin_tui_hang/:code_tracking', warehouse_staffController.thong_tin_tui)
router.post('/xac_nhan_tui_den', warehouse_staffController.xac_nhan_tui_den)
router.get('/xac_nhan_chi_tiet_tui/:code_tracking', warehouse_staffController.xac_nhan_chi_tiet_tui)
router.post('/xac_nhan_item', warehouse_staffController.xac_nhan_item)
router.get('/tra_cuu_don', warehouse_staffController.tra_cuu_don)
router.get('/', warehouse_staffController.show)


export default router;