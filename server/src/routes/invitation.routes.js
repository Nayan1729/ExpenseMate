import { Router } from "express";
import { acceptInvitation, inviteUsingEmail,verifyToken } from "../controllers/invitations.controller.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router =  Router();

router.route('/sendInviteEmail').post(verifyJWT,inviteUsingEmail);
router.route('/verifyInvitationToken/:token').get(verifyToken);
router.route('/acceptInvitation').post(acceptInvitation);
export default router;  