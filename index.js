import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io'
import menssageRoutes from "./routes/messageRouter.js"
import emailRoutes from "./routes/emailRouter.js"
import { initializeSocket } from './controllers/messageController.js';
import db from './config/db.js';


// Creacion de la app
const app = express()

// Habilitando cors
app.use(cors())

// Habliditar lectura de datos de usuario
app.use(express.urlencoded({ extended: true }))

// Creando un servirdor
const server = http.createServer(app)


try {
    await db.authenticate();
    db.sync();
    console.log('Conexion correcta a la db');
} catch (error) {
    console.log(error);
}

initializeSocket(server);


// Routing
app.use("/", menssageRoutes)
app.use("/", emailRoutes)

// Definir puerto y aarrancar el proyecto
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`El servidor esta en el puerto http://localhost:${port}`);
});