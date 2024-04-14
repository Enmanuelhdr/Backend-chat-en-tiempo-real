import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })



const envioDeEmails = async (datos) => {

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "181809a1b1193b",
            pass: "b8d420255e0b1d"
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