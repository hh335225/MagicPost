import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String},
    role: {type: String},
    email: {type: String},
    password: {type: String},
    username: {type: String},
})

export default mongoose.model('users', User)