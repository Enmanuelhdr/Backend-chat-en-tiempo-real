import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })



const envioDeEmails = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const { email, institucion, mensaje, asunto } = datos;

    await transport.sendMail({
        from: institucion,
        to: email,
        subject: asunto,
        text: asunto,
        html: `
            ${mensaje}
        `
    })
}

export {
    envioDeEmails
}