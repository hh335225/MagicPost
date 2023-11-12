
import Users from '../models/User.js'

class HomeController {

    show(req, res, next) {
        res.render('./home')
    }

    post_office(req, res, next) {
        res.render('./find_post_office')
    }

    postal_items(req, res, next) {
        res.render('./find_postal_items')
    }

    costs(req, res, next) {
        res.render('./costs')
    }

}

export default new HomeController;
