import { Router } from "express";
import { registerUser,loginUser,getCurrentUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middlewares.js"

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getCurrentUser").post(verifyJWT,getCurrentUser);

export default router;