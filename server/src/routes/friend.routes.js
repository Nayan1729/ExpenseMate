import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { createFriendship,getFriends } from "../controllers/friend.controller.js";
const router = Router();

router.route("/createFriendship").post(createFriendship);
router.route("/getFriends").get(verifyJWT,getFriends)
export default router;

