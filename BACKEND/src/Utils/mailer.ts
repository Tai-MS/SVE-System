import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.EMAIL_PASS
    }
})

export default transport