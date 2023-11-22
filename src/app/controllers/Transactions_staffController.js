import Parcels from '../models/Parcels.js'
import Users from '../models/User.js'
import Postal_office from '../models/Postal_office.js';


class Transaction_staffController {
    show(req, res, next) {
        // var user_id = req.user_data._id;
        res.render('./transaction_staff_view/transaction_staff', {transaction_staff_header: true})
        
    }

    show_hoa_don(req, res, next) {
        var code_tracking = req.params.code_tracking;

        var number_format = function(number) {
            if(number.toString().length < 2){
                return `0${number.toString()}`;
            } else {
                return number;
            }
        }

        Parcels.findById(code_tracking)
        .then(parcel => {
            if(parcel) {
                parcel = parcel.toObject();

                
                var thoi_gian = `${number_format(parcel.trang_thai[0].time.getHours())}h${number_format(parcel.trang_thai[0].time.getMinutes())}/${number_format(parcel.trang_thai[0].time.getDate())}/${number_format(parcel.trang_thai[0].time.getMonth() + 1)}/${parcel.trang_thai[0].time.getFullYear()}`;
                
                var noi_gui = "";
                var noi_nhan = "";
                var promiseList = [
                    Postal_office.findById(parcel.send_postal_code)
                    .then(res => {
                        if(res) {
                            noi_gui = `${res.street}, ${parcel.send_commune}, ${parcel.send_district}, ${parcel.send_city}`;
                        }
                    }),
                    Postal_office.findById(parcel.recipient_postal_code)
                    .then(res => {
                        if(res) {
                            noi_nhan = `${res.street}, ${parcel.recipient_commune}, ${parcel.recipient_district}, ${parcel.recipient_city}`;
                        }
                    })
                ]
                Promise.all(promiseList)
                .then(tmp => {
                    parcel.send_address = noi_gui;
                    parcel.recipient_address = noi_nhan;
                    parcel.thoi_gian = thoi_gian;
                    var loai_hang = ["Tài liệu", "Hàng hóa"];
                    var chi_dan_gui = ["Chuyển hoàn ngay", "Gọi điện cho người gửi/BC gửi", "Hủy", "Chuyển hoàn trước ngày", "Chuyển hoàn khi hết thời gian lưu trữ"]
                    parcel.loai_hang = loai_hang.indexOf(parcel.loai_hang);
                    parcel.chi_dan_gui = chi_dan_gui.indexOf(parcel.chi_dan_gui);
                    console.log(parcel.chi_dan_gui, parcel.loai_hang);
                    res.render('./transaction_staff_view/hoadon', {parcel, none_header: true })
                })


                
            }
            else {
                res.status(500).send("Khong tim thay buu gui")
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).send("loi ben sv");
        })
        // console.log(code_tracking)
        // res.render('./transaction_staff_view/hoadon',{none_header: true })
    }

    tao_don_hang(req, res, next) {
        var newParcel = req.body;
        // newParcel = newParcel.toObject();
        newParcel.trang_thai = [
            {
                trang_thai: `Chấp nhận gửi`,
                time: Date.now(),
                vi_tri: `${newParcel.send_commune}, ${newParcel.send_district}, ${newParcel.send_city}`,
            }
        ]

        Parcels.create(newParcel)
        .then(new_parcel => {
            res.json({
                message: true,
                code_tracking: new_parcel._id
            })
        })
        .catch(err => {
            res.status(500).send("Loi ben DB");
        })

        
    }
}

export default new Transaction_staffController;