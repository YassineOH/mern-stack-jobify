import sendEmail from "./sendEmail.js";

export const sendVerificationEmail = async ({ name, email, origin, verificationToken }) => {


    const href = `${origin}/verify-email?email=${email}&token=${verificationToken}`

    const message = `<p>Please confirm your email by clicking on the following link : <a href="${href}" target="_blank">Verify Email </a></p>`

    return sendEmail({
        to: email,
        subject: "JOBIFY mail verification",
        html: `
            hello ${name}, <br/>
            ${message}
        `
    })
}