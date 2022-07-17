import express from "express"

import { register, login, updateUser, verifyEmail, forgerPassword, resetPassword } from "../controllers/authController.js";

import authenticateUser from "../middleware/auth.js"

import rateLimiter from "express-rate-limit"

const apiLimiter = rateLimiter({
    windowMs: 1000 * 60 * 5,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes"
})


const router = express.Router();


router.route("/register").post(apiLimiter, register)
router.route("/login").post(apiLimiter, login)
router.route("/updateUser").patch(authenticateUser, updateUser)
router.route("/verify-email").post(verifyEmail)
router.route("/reset-password").post(resetPassword)
router.route("/forget-password").post(forgerPassword)

export default router




