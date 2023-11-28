import jwt from 'jsonwebtoken'
import Users from '../models/User.js'
import route from '../../routes/index.js';

let role_transaction_staff = ["transaction_staff" ,"transaction_manager","manager"]
let role_transaction_manager = ["transaction_manager","manager"]
let role_warehouse_staff = ["warehouse_staff" ,"warehouse_manager","manager"]
let role_warehouse_manager = ["warehouse_manager","manager"]

class CheckAuthentication {
    checkManager(req, res, next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
            console.log(user)
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            var role = user.role;
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


    checkTransactionStaff(req, res, next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
            console.log(user)
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            var role = user.role;
            if(role_transaction_staff.includes(role)) {
                req.user_data = {_id : user._id,
                                postal_office_code: user.postal_office_code}
                next()
            } else {
                return res.redirect('./');
            }        
        } else {
            return res.redirect('./');
        }
    }

    checkTransactionManager(req, res,next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
            console.log(user)
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            var role = user.role;
            if(role_transaction_manager.includes(role)) {
                req.user_data = {_id : user._id,
                                postal_office_code: user.postal_office_code}
                next()
            } else {
                return res.redirect('./');
            }        
        } else {
            return res.redirect('./');
        }
    }

    checkWarehouseManager(req, res,next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
            console.log(user)
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            var role = user.role;
            if(role_warehouse_manager.includes(role)) {
                req.user_data = {_id : user._id,
                                postal_office_code: user.postal_office_code}
                next()
            } else {
                return res.redirect('./');
            }        
        } else {
            return res.redirect('./');
        }
    }

    checkWarehouseStaff(req, res,next) {
        try {
            var token = req.cookies.token;
            var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
            console.log(user)
        } catch (error) {
            return res.redirect('./');
        }
        if(user) {
            var role = user.role;
            if(role_warehouse_staff.includes(role)) {
                req.user_data = {_id : user._id,
                                postal_office_code: user.postal_office_code}
                next()
            } else {
                return res.redirect('./');
            }        
        } else {
            return res.redirect('./');
        }
    }
}

export default new CheckAuthentication;
