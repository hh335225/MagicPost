
import Users from '../models/User.js'
import Cities from '../models/Cities.js'
import Postal_office from '../models/Postal_office.js'
import Parcels from '../models/Parcels.js'

class HomeController {

    test(req, res, next) {
        res.render('./test')
    }

    show(req, res, next) {
        res.render('./home')
    }

    post_office(req, res, next) {
        res.render('./find_post_office')
    }

    
    list_post_office(req, res, next) {
        var city_name = req.body.city;
        var district_name = req.body.district;

        Cities.findOne({name: city_name})
            .then(data => {
                if(data) {
                    
                    var district_list = data.districts;
                    district_list.forEach(district => {
                        if(district.name === district_name) {
                            var communes = district.communes;
                            // console.log(communes);
                            var list_postal_code = communes.map(commune => commune.postal_code);
                            list_postal_code = list_postal_code.flat();
                            // console.log(list_postal_code)
                            var data_res = Promise.all(list_postal_code.map((postal_code) => {
                                return Postal_office.findById(postal_code);
                            }))
                            data_res.then(data => {
                                res.json({
                                    data: data,
                                })
                            })

                        }
                    })
                }
            })

    }


    postal_items(req, res, next) {
        var tracking_code = req.query.code_tracking;
        console.log(tracking_code);


        var number_format = function(number) {
            if(number.toString().length < 2){
                return `0${number.toString()}`;
            } else {
                return number;
            }
        }
        var found_parcel = false;
        Parcels.findOne({_id: tracking_code})
        .then(data => {
            if(data) {
                found_parcel = true;
                data = data.toObject();
                var noi_gui = "";
                var noi_nhan = "";
                var promiseList = [
                    Postal_office.findById(data.send_postal_code)
                    .then(res => {
                        if(res) {
                            noi_gui = res.name;
                        }
                    }),
                    Postal_office.findById(data.recipient_postal_code)
                    .then(res => {
                        if(res) {
                            noi_nhan = res.name;
                        }
                    })
                ]
                var trang_thai = data.trang_thai[data.trang_thai.length-1].trang_thai;
                var list_trang_thai = data.trang_thai.map(trang_thai => {
                    var ngay = `${number_format(trang_thai.time.getDate())}/${number_format(trang_thai.time.getMonth() + 1)}/${trang_thai.time.getFullYear()}`;
                    var gio = `${number_format(trang_thai.time.getHours())}:${number_format(trang_thai.time.getMinutes())}:${number_format(trang_thai.time.getSeconds())    }`;
                    return {
                        ngay: ngay,
                        gio: gio,
                        trang_thai: trang_thai.trang_thai,
                        vi_tri : trang_thai.vi_tri
                    }
                })
                
                Promise.all(promiseList)
                .then(tmp => {
                    res.render('./find_postal_items', {found_parcel,tracking_code,noi_gui, noi_nhan,trang_thai,list_trang_thai, data})
                })
                
            }else {
                res.render('./find_postal_items', {found_parcel, tracking_code})
            }
        })
        .catch(err => {
            
            res.render('./find_postal_items', {found_parcel, tracking_code})
        });
        
    }

    find_postal_items(req, res, next) {
        var tracking_code = req.body.code_tracking;
        // console.log(tracking_code);
        Parcels.findById(tracking_code) 
        .then(data => {
            if(data) {
                // console.log(data)
                res.json({
                    message: true,
                    data: data
                })
            } else {
                res.json({
                    message: false,
                })
            }
        })
        .catch(err => res.status(500).send("Loi ben DB"));

    }

    costs(req, res, next) {
        res.render('./costs')
    }

    logout(req, res, next) {
        console.log(req.session.user_name)
        res.clearCookie('token');
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                //res.render('./home')
                res.redirect('/')
            }
        })
    }

}

export default new HomeController;
