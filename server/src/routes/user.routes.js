import { Router } from "express";
import { registerUser,loginUser,getCurrentUser,inviteUsingEmail } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middlewares.js"

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getCurrentUser").post(verifyJWT,getCurrentUser);
router.route('/sendEmailInvite').post(verifyJWT,inviteUsingEmail);

export default router;