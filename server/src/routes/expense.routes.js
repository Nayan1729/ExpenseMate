import { Router } from "express";
import { addExpense } from "../controllers/expense.controller.js";
import verifyJWT from "../middlewares/auth.middlewares.js"
const expenseRouter = Router();

expenseRouter.route("/addExpense").post(verifyJWT,addExpense);

export default expenseRouter;