import Mensaje from "../models/Messages.js"
import { Server } from 'socket.io'


const getMessages = async (req, res) => {
    const mensajes = await Mensaje.findAll()
    res.json({
        mensajes
    })
}

const getMessageByIdAuthor = async (req, res) => {
    try {
        const { idUser } = req.params;

        // Busca todos los mensajes donde el id_author coincida con el idUser
        const mensajes = await Mensaje.findAll({
            where: {
                id_author: idUser
            }
        });

        if (!mensajes || mensajes.length === 0) {
            return res.status(404).json({ error: "No se encontraron mensajes para el id_author proporcionado" });
        }


        return res.json({ mensajes });
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

const getRoomByName = async (req, res) => {
    try {
        const { roomName } = req.params;

        // Busca todos los mensajes donde el id_author coincida con el idUser
        const mensajes = await Mensaje.findAll({
            where: {
                room: roomName
            }
        });

        if (!mensajes || mensajes.length === 0) {
            return res.status(404).json({ error: "No se encontraron mensajes para el id_author proporcionado" });
        }


        return res.json({ mensajes });
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};


const initializeSocket = (server) => {
    // Crea una nueva instancia del servidor Socket.io
    const io = new Server(server, {
        // Configura CORS para permitir conexiones desde el frontend.
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Escucha el evento "connection" para cada nuevo cliente que se conecta.
    io.on("connection", (socket) => {
        // Imprime el ID del cliente conectado a la consola.
        console.log(`Usuario actual: ${socket.id}`);

        // Escucha el evento "join_room" para el cliente actual.
        socket.on("join__room", (data) => {
            console.log(`Usuario con id: ${socket.id} se unio a la sala: ${data + "holanda"}`);
            socket.join(data);
        });

        // Escucha el evento "send_message" para el cliente actual y envía el mensaje a una sala específica.
        socket.on("send_message", async (data) => {
            socket.to(data.room).emit("recieve_message", data);
            console.log(data);

            const { room, author, message, time, userId } = data
            try {
                await Mensaje.create({
                    room,
                    author,
                    time,
                    message,
                    id_author: userId

                });

            } catch (error) {
                console.log(error);
            }
        });

        // Escucha el evento "disconnect" para el cliente actual.
        socket.on("disconnect", () => {
            // Imprime un mensaje a la consola indicando que el usuario se ha desconectado.
            console.log("Usuario desconectado", socket.id);
        });
    });
}



export {
    initializeSocket,
    getMessages,
    getMessageByIdAuthor,
    getRoomByName
}
