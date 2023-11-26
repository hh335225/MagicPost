import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Parcel_bag = new Schema({
    send_postal_office : {type: Schema.Types.ObjectId},
    receives_postal_office : {type: Schema.Types.ObjectId},
    time: {type: Date},
    product_list : [{
                    product_id : {type: Schema.Types.ObjectId},
                    check: {type: Boolean}
                }],
    trang_thai: [{
        trang_thai: {type: String},
        time: {type: Date},
        vi_tri: {type: String},
        postal_office_code: {type: Schema.Types.ObjectId}
    }]
})

export default mongoose.model("parcel_bags", Parcel_bag);
