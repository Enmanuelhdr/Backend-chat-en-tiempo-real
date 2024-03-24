import express from "express";
import { getMessages, getMessageByIdAuthor }from "../controllers/messageController.js";

const router = express.Router()

router.get("/mensajes/", getMessages)
router.get("/mensaje/:idUser", getMessageByIdAuthor )

//Todo: Agregar nuevas rutas para las salas

export default router