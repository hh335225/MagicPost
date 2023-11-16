
class ManagerController {
    show(req, res, next) {
        // var user_id = req.user_data._id;
        res.render('./manager_view/manager')
    }
}

export default new ManagerController;
