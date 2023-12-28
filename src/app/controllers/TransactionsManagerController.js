import Parcels from '../models/Parcels.js'
import Users from '../models/User.js'
import Postal_office from '../models/Postal_office.js';
import Parcel_bags from '../models/Parcel_bags.js';
import mongoose from 'mongoose';
import Validation from '../controllers/checkForm.js';
import jwt from 'jsonwebtoken';
import { response } from 'express';
// import { data } from 'jquery';
const ObjectId = mongoose.Types.ObjectId;


const transaction_manager_header = true;

class TransactionManagerController {

    show(req, res, next) {
        res.redirect('/transaction_staff');
    }

    showList(req, res, next) {
        var token = req.cookies.token;
        var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var user_id = user._id;
        var post_code = user.postal_office_code;
        var list = ["transaction_staff", "transaction_manager"];
        // let post_name = "Ahihi";
        Postal_office.find({ _id: post_code })
            .then(result => result.map(result => result.toObject()))
            .then((result) => {
                Users.find({ role: { $in: list }, postal_office_code: post_code }).then(data => {
                    data = data.map(data => data.toObject());
                    data.sort((a, b) => {
                        if (a.role == "transaction_manager") {
                            return -1;
                        }
                        if (b.role == "transaction_manager") {
                            return 1;
                        }
                        return 0;
                    })
                    res.render('./transaction_manager_view/list_staff', { result, data, transaction_manager_header, noFooter: true });

                });
            })
    }
    addEmployee(req, res, next) {
        // console.log(req.body);
        var data = req.body;
        var token = req.cookies.token;
        var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // data = data.map(data => data.toObject());
        var name = data.name.trim();
        var email = data.email.trim();
        var username = data.username.trim();
        var password = data.password;
        name = name.replace(/\s+/g, ' ').toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        username = username.toLowerCase();
        // console.log(name);  
        var log_name = Validation.checkName(name);
        var log_email = Validation.checkEmail(email);
        var log_username = Validation.checkUsername(username);
        var log_password = Validation.checkPassword(password);
        // console.log(username);
        // let isSuccess = false;
        if (log_name == '' && log_email == '' && log_username == '' && log_password == '') {
            Users.find({ username: username }).then(
                data => {
                    // console.log('Data: ' + data);
                    data = data.map(data => data.toObject());
                    // console.log('Data: ' + data.length);
                    if (data.length) {
                        // isSuccess = false;
                        // log_username = 'Tên đăng nhập đã tồn tại';
                        res.json({
                            status: false,
                            name: log_name,
                            email: log_email,
                            username: 'Tên đăng nhập đã tồn tại',
                            password: log_password
                        });
                    }
                    else {
                        // isSuccess = true;
                        // capitalizeWords(name).then(str => {
                        //     console.log(str);
                        // })
                        var account = {
                            name: name,
                            role: 'transaction_staff',
                            email: email,
                            password: password,
                            username: username,
                            postal_office_code: user.postal_office_code
                        }
                        Users.create(account).then(response => {
                            res.json({
                                status: true,
                                name: log_name,
                                email: log_email,
                                username: log_username,
                                password: log_password
                            });
                        }
                        ).catch(err => {
                            res.status(500).send(err);
                        });

                    }

                }
            )
        } else {
            res.json({
                status: false,
                name: log_name,
                email: log_email,
                username: log_username,
                password: log_password
            });
        }
        // console.log(log_username);

    }

    getAccount(req, res, next) {
        // console.log('Haha' + req.body);  
        var id = req.params.id;
        // console.log('Haha' + id); 
        var token = req.cookies.token;
        var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        Users.findById(id).then(data => {
            data = data.toObject();
            if (data && data.postal_office_code == user.postal_office_code) {
                res.json({
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password
                });
            } else {
                res.status(500).send("Not Found");
            }
        }).catch(err => {
            res.status(500).send(err);
        })
    }

    editEmployee(req, res, next) {
        // console.log(req.body);
        var data = req.body;
        var token = req.cookies.token;
        var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // data = data.map(data => data.toObject());
        var id = req.params.id;
        var name = data.name.trim();
        var email = data.email.trim();
        var username = data.username.trim();
        var password = data.password;
        name = name.replace(/\s+/g, ' ').toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        username = username.toLowerCase();
        // console.log(name);  
        var log_name = Validation.checkName(name);
        var log_email = Validation.checkEmail(email);
        var log_username = Validation.checkUsername(username);
        var log_password = Validation.checkPassword(password);
        // console.log(username);
        // let isSuccess = false;
        if (log_name == '' && log_email == '' && log_username == '' && log_password == '') {
            Users.find({ username: username }).then(
                data => {
                    // console.log('Data: ' + data);
                    data = data.map(data => data.toObject());
                    // console.log('Data: ' + data.length);
                    if (!data.length) {
                        // isSuccess = false;
                        // log_username = 'Tên đăng nhập đã tồn tại';
                        res.json({
                            status: false,
                            name: log_name,
                            email: log_email,
                            username: 'Tên đăng nhập không tồn tại',
                            password: log_password
                        });
                    }
                    else {
                        // isSuccess = true;
                        // capitalizeWords(name).then(str => {
                        //     console.log(str);
                        // })
                        var account = {
                            name: name,
                            role: 'transaction_staff',
                            email: email,
                            password: password,
                            username: username,
                            postal_office_code: user.postal_office_code
                        }
                        Users.updateOne({ username: username }, {
                            name: name,
                            password: password,
                            email: email
                        })
                            .then(response => {
                                res.json({
                                    status: true,
                                    name: log_name,
                                    email: log_email,
                                    username: log_username,
                                    password: log_password
                                });
                            }
                            ).catch(err => {
                                res.status(500).send(err);
                            });

                    }

                }
            )
        } else {
            res.json({
                status: false,
                name: log_name,
                email: log_email,
                username: log_username,
                password: log_password
            });
        }
        // console.log(log_username);

    }
    deleteAccount(req, res, next) {
        var token = req.cookies.token;
        var user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        var data = req.body.list;

        const indexToRemove = data.indexOf(user._id);

        if (indexToRemove !== -1) {
            data.splice(indexToRemove, 1);
            // console.log(`Phần tử ${elementToRemove} đã bị xóa.`);
        }
        // console.log(data);
        // console.log(user._id);
        Users.deleteMany({ _id: { $in: data } })
            .then(number => {
                res.json({
                    number: data.length,
                })
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
}

export default new TransactionManagerController;