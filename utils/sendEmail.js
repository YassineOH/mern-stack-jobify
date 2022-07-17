import nodemailer from "nodemailer"
import { nodemailerConfig } from "./nodemailerConfig.js"
import sgMail from "@sendgrid/mail"

const sendEmail = async ({ to, subject, html }) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    return await sgMail.send({
        from: `"JOBIFY" <yassine.yas98@gmail.com>`,
        to,
        subject,
        html
    })

}

export default sendEmail