import express from "express";
import postEnvioEmails from "../controllers/emailsController.js";

const router = express.Router()

router.post("/email/", postEnvioEmails)


export default router