import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Postal_office = new Schema({
    name: {type: String},
    city: {type: String},
    district: {type: String},
    commune: {type: String},
    street: {type: String},
    phone_number: {type: String},
    to_warehouse: {type: Schema.Types.ObjectId},
    role: {type: String}
})

export default mongoose.model('postal_offices', Postal_office)