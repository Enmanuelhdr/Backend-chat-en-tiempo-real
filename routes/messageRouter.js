import express from "express";
import { getMessages, getMessageByIdAuthor, getRoomByName }from "../controllers/messageController.js";

const router = express.Router()

router.get("/mensajes/", getMessages)
router.get("/mensaje/:idUser", getMessageByIdAuthor )
router.get("/sala/:roomName", getRoomByName)


export default router