import mongoose from 'mongoose';

const userShema = new mongoose.Shema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cartId: Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const userModel = mongoose.model("users", userShema);

export default userModel;