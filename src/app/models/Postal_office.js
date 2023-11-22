import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Postal_office = new Schema({
    name: {type: String},
    street: {type: String},
    phone_number: {type: String}
})

export default mongoose.model('postal_offices', Postal_office)