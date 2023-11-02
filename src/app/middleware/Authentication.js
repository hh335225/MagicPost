import dotenv from 'dotenv';
dotenv.config(); // de su dung file .env (lay ma khoa jwt)
import jwt from 'jsonwebtoken'
import Users from '../models/User.js'

class CheckAuthentication {
    checkManager(req, res, next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            role = user.role;
            if(role === 'manager') {
                req.user_data = {_id : user._id}
                next()
            } else {
                return res.redirect('./');
            }        
        } else {
            return res.redirect('./');
        }
    }
    checkTransactionPointManagement(req, res,next) {

    }
}

export default new CheckAuthentication;
