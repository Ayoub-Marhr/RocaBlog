import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Fixed typo from 'ture' to 'true'
    },
    email: {
        type: String,
        required: true,
        unique: true // Fixed typo from 'ture' to 'true'
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
