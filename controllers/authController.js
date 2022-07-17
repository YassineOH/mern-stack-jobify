import User from "../models/User.js"
import crypto from 'crypto'
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"

import { sendVerificationEmail, sendResetPasswordEmail } from "../utils/index.js"

const register = async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError("please provide all the values")
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
        throw new BadRequestError("this email is already in use")
    }
    const verificationToken = crypto.randomBytes(40).toString("hex")

    const protocol = req.protocol
    const host = req.get("x-forwarded-host")
    // console.log({ protocol, host })

    const origin = `${protocol}://${host}`
    const user = await User.create({ ...req.body, verificationToken })

    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken,
        origin
    })

    res.status(StatusCodes.CREATED).json({
        msg: "Success, please check your email to verify your account",
        verificationToken
    })
}


const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body

    const user = await User.findOne({ email })

    if (!user || verificationToken !== user.verificationToken) {
        throw new UnauthenticatedError("please register first")
    }

    user.isVerified = true
    user.verificationToken = ""
    user.verified = Date.now()

    await user.save()
    res.status(StatusCodes.OK).json({ msg: "email verified" })
}


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("please provide all the values")
    }

    const candidateUser = await User.findOne({ email }).select("+password")

    if (!candidateUser) {
        throw new UnauthenticatedError("invalid credentials")
    }

    const isPasswordMatch = await candidateUser.comparePassword(password)
    if (!isPasswordMatch) {
        throw new UnauthenticatedError("invalid credentials")
    }

    if (!candidateUser.isVerified) {
        throw new UnauthenticatedError("please verify your email")
    }

    const token = candidateUser.createJWT()
    candidateUser.password = undefined
    res.status(StatusCodes.OK).json({ user: candidateUser, token, location: candidateUser.location })

}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError("please provide all values")
    }

    const user = await User.findById(req.user.userId)

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save()

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        user,
        token,
        location: user.location
    })
}

const resetPassword = async (req, res) => {
    const { email, token, password } = req.body

    if (!email | !token | !password) {
        throw new BadRequestError("Please provide all values")
    }

    const user = await User.findOne({ email })

    if (user) {
        const currentDate = new Date()

        if (user.passwordToken === token &&
            user.passwordTokenExpirationDate > currentDate
        ) {
            user.password = password
            user.passwordToken = null
            user.passwordTokenExpirationDate = null

            await user.save()
        }
    }
    res.status(StatusCodes.OK).json({ msg: "password reset, please login..." })
}

const forgerPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new BadRequestError("please provide your email")
    }

    const user = await User.findOne({ email })

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString("hex")

        const protocol = req.protocol
        const host = req.get("x-forwarded-host")
        const origin = `${protocol}://${host}`

        sendResetPasswordEmail({
            name: user.name,
            email,
            verificationToken: passwordToken,
            origin
        })

        const tenMinutes = 1000 * 60 * 10
        const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

        user.passwordToken = passwordToken
        user.passwordTokenExpirationDate = passwordTokenExpirationDate

        await user.save()
    }

    res.status(StatusCodes.OK).json({ msg: "Please check your email for reset password link" })
}



export { register, login, updateUser, verifyEmail, resetPassword, forgerPassword }