import express from 'express'
const router = express.Router()
import transaction_staffController from '../app/controllers/Transactions_staffController.js';

router.get('/hoadon/:code_tracking', transaction_staffController.show_hoa_don)
router.post('/tao_don_hang', transaction_staffController.tao_don_hang)
router.get('/tra_cuu_don', transaction_staffController.tra_cuu_don)
router.get('/danh_sach_don', transaction_staffController.danh_sach_don)
router.post('/danh_sach_don', transaction_staffController.post_danh_sach_don)
// router.get('/tao_tui', transaction_staffController.tao_tui_hang)
router.post('/tui_hang', transaction_staffController.tui_hang)
router.post('/tao_tui_hang', transaction_staffController.tao_tui_hang)
router.get('/danh_sach_tui_di', transaction_staffController.danh_sach_tui_di)
router.post('/danh_sach_tui_di', transaction_staffController.post_danh_sach_tui_di)
router.get('/danh_sach_tui_nhan', transaction_staffController.danh_sach_tui_nhan)
router.post('/danh_sach_tui_nhan', transaction_staffController.post_danh_sach_tui_nhan)
router.post('/xac_nhan_tui_den', transaction_staffController.xac_nhan_tui_den)
router.get('/thong_tin_tui_hang/:code_tracking', transaction_staffController.thong_tin_tui)
router.get('/xac_nhan_chi_tiet_tui/:code_tracking', transaction_staffController.xac_nhan_chi_tiet_tui)
router.post('/xac_nhan_item', transaction_staffController.xac_nhan_item)
router.post('/cap_nhap_trang_thai', transaction_staffController.cap_nhap_trang_thai)
router.get('/danh_sach_giao_thanh_cong', transaction_staffController.show_giao_thanh_cong)
router.post('/danh_sach_giao_thanh_cong', transaction_staffController.giao_thanh_cong)
router.get('/danh_sach_giao_that_bai', transaction_staffController.show_giao_that_bai)
router.post('/danh_sach_giao_that_bai', transaction_staffController.giao_that_bai)
router.get('/', transaction_staffController.show)

export default router;