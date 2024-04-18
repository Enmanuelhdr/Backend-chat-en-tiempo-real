import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })



const envioDeEmails = async (datos) => {

    const transport = nodemailer.createTransport({
        host: smtp.office365.com,
        port: 587,
        secure: false,
        auth: {
            user: "eduasynchub@outlook.com",
            pass: "asynchub.123.pruebas"
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