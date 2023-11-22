import mongoose from "mongoose";

const Schema = mongoose.Schema;

const City = new Schema({
    name: {type: String},
    districts: [
        {
            name: {type: String},
            communes:[{
                name: {type: String},
                postal_code: [{type:Schema.Types.ObjectId}]
            }]
        }
    ]
});

export default mongoose.model('cities', City)
