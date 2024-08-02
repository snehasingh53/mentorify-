/* schema : defines  the structure of the documents within a collection.
It specifies the fields , their types, and any additional consstraints validations */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // cannot be left empty
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified("password")) {
        try {
            const saltRound = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(user.password, saltRound);
            user.password = hash_password;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate JWT
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                id: this._id.toString(), // Ensure `id` is used if that's the expected key
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Error generating token');
    }
};



//define  the model of collection name 

const User = new mongoose.model("User", userSchema);
module.exports = User;


/* JWT : jSON web token is a open standard that defines a compact and self - contained way for securely 
transmitting information between parties as a JSON object 
used for (i) Authentication     (ii)Authorization  
*/
