const mongoose = require('mongoose');


/*
const nameSchema = new mongoose.Schema ({},{timestamps: true})
*/

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters."]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function(value) {
                // Validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters."]
    }
}, { timestamps: true });


// User; module name
module.exports = mongoose.model('User', UserSchema);