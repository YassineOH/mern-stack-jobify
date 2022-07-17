import sendEmail from "./sendEmail.js";

export const sendResetPasswordEmail = async ({ name, email, origin, verificationToken }) => {


    const href = `${origin}/reset-password?email=${email}&token=${verificationToken}`

    const message = `<p>Please reset your password by clicking on the following link : <a href="${href}" target="_blank">Reset password</a></p>`

    return sendEmail({
        to: email,
        subject: "Reset Password JOBIFY",
        html: `
           <h4> hello ${name}</h4>, <br/>
            ${message}
        `
    })
}