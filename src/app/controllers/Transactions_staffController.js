class Transaction_staffController {
    show(req, res, next) {
        // var user_id = req.user_data._id;
        res.render('./transaction_staff')
        
    }
}

export default new Transaction_staffController;