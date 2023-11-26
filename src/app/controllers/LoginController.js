import Users from '../models/User.js'
import jwt from 'jsonwebtoken';



class LoginController {
    show(req, res, next) {
        res.render('./login')
    }

    post_login(req, res) {
        const data_user = {
            username: req.body.username,
            password: req.body.password
        }

        Users.findOne({
            // $or:[{email: data_user.email},
            //      {user_name: data_user.email}],
            username: data_user.username,
            password: data_user.password
        })
        .then(data => {
            if(data) {
                var token = jwt.sign({
                    _id: data._id,
                    role: data.role,
                    postal_office_code: data.postal_office_code
                }, process.env.ACCESS_TOKEN_SECRET)
                res.json({
                    message:'Thanh cong',
                    token: token,
                    role: data.role,
                    user_name: data.name
                })    
            } else {
                return res.send('Tai khoan khong ton tai')
            }
        })
        .catch(err => res.send('Loi ben sever'))
        
    }
}

export default new LoginController;
