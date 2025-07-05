import express from 'express';
import { sendMessage } from '../controller/message.controller.js';
import secureRoute from '../middleware/secureRoute.js';
import { getMessages } from '../controller/message.controller.js'; // Assuming getMessages is defined in the controller
const router = express.Router();
router.post("/send/:id", secureRoute,sendMessage);
router.get("/get/:id", secureRoute, getMessages); // Assuming getMessages is defined in the controller

export default router;