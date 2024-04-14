import { envioDeEmails } from "../helpers/emails.js";

const postEnvioEmails = async (req, res) => {

    const { email, institucion, mensaje, asunto } = req.body;

    try {
        // Lógica para enviar el email
        await envioDeEmails({
            email,
            institucion,
            mensaje,
            asunto
        });

        // Enviar respuesta al cliente
        res.status(200).json({ message: 'Email enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el email:', error);
        res.status(500).json({ error: 'Error al enviar el email' });
    }

};

export default postEnvioEmails