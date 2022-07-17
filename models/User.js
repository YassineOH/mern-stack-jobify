import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    lastName: {
        type: String,
        default: "last name",
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        validate: {
            validator: validator.isEmail,
            message: "please provide a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
        select: false
    },
    location: {
        type: String,
        trim: true,
        maxlength: 25,
        default: "my city"
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Date
    },
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date
    }
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10);
    console.log(this.password)
    this.password = await bcrypt.hash(this.password, salt)
})


export default mongoose.model("User", UserSchema)