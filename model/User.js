const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },

    email: {
        type: String,
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },

    mobile: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'hold', 'blocked'],
        default: 'active'
    },

    role: {
        type: String,
        enum: ['admin', 'student', 'mentor', 'teacher'],
        default: 'admin'
    }
})

const User = Mongoose.model("User_Collection", UserSchema);
module.exports = User;

