import dotenv from 'dotenv';
dotenv.config();
import Users from '../models/User.js'

class HomeController {

    show(req, res, next) {
        // Users.find({})
        //     .then(user => {
        //         res.json(user)
        //     })
        //     .catch(err => {
        //         res.status(400).json({err})
        //     })
        res.render('./home')
    }

    post_login(req, res) {
        const data_user = {
            email: req.body.email,
            password: req.body.password
        }

        Users.findOne({
            $or:[{email: data_user.email},
                 {user_name: data_user.email}],
            password: data_user.password
        })
        .then(data => {
            if(data) {
                var token = jwt.sign({
                    _id: data._id,
                    role: data.role
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

export default new HomeController;
