import { Router } from "express";
import { validateToken } from "../middleware/validateTokenHandler.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/messageController.js";

const router = Router();

router.get("/users", validateToken, getUsersForSidebar);
router.get("/:id", validateToken, getMessages);
router.post("/send/:id", validateToken, sendMessage);

export default router;
