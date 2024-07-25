import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username : {
        type :String,
        required: true,
        unique : ture
    },
    email : {
        type :String,
        required: true,
        unique : ture
    },
    password : {
        type :String,
        required: true
    },
    department : {
        type :String,
        required: true
    },
    job : {
        type :String,
        required: true
    }
},{timestamps : true})
const User = mongoose.model('User' , userShema)
export default User