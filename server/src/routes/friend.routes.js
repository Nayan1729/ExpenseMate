import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { createFriendship } from "../controllers/friend.controller.js";
const router = Router();

router.route("/createFriendship").post(createFriendship);

export default router;

