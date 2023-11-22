import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Parcel = new Schema({
    send_name: {type: String},
    recipient_name : {type: String},
    send_city: {type: String},
    send_district: {type: String},
    send_commune: {type: String},
    send_postal_code: {type: Schema.Types.ObjectId},
    // send_street: {type: String},
    send_phone_number: {type: String},
    send_email: {type: String},
    recipient_city: {type: String},
    recipient_district: {type: String},
    recipient_commune: {type: String},
    recipient_postal_code: {type: Schema.Types.ObjectId},
    // recipient_street: {type: String},
    recipient_phone_number: {type: String},
    recipient_email: {type: String},
    loai_hang: {type: String},
    weight: {type: String, default: Number('0')},
    chi_dan_gui: {type: String},
    chu_dan_nv: {type: String, default: String('#')},
    dich_vu: {type:String, default: String('#')},
    cuoc_chinh: {type: String},
    phu_thu: {type: String, default: Number('0')},
    thu_ho: {type: String, default: Number('0')},
    list_item: [
        {
            name: {type: String},
            so_luong: {type: Number},
            tri_gia: {type: String},
            giay_to: {type: String}
        }
    ],
    chim: {type: String, default: String("chim")},
    trang_thai: {
        type: [
            {
                trang_thai: {type: String},
                time: {type: Date},
                vi_tri: {type: String}
            }
        ], 
        default: [
            {
                trang_thai: 'Chấp nhận gửi',
                time: Date.now(),
                vi_tri: 'Bưu cục nhận đơn'
            }
        ]
    }


})

export default mongoose.model('parcels', Parcel)
