import mongoose from "mongoose";

async function connect() {
    mongoose.connect('mongodb+srv://magic_post_web:chimchim@cluster0.jqc7bod.mongodb.net/magic_post_web')
    .then(() => console.log('Database connect successfully!!!'))
    .catch((err) => console.log('Database connect failure'));
}

export default {connect};

