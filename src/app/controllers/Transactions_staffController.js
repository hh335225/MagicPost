class Transaction_staffController {
    show(req, res, next) {
        // var user_id = req.user_data._id;
        res.render('./transaction_staff_view/transaction_staff', {transaction_staff_header: true})
        
    }

    show_hoa_don(req, res, next) {
        res.render('./transaction_staff_view/hoadon')
    }
}

export default new Transaction_staffController;