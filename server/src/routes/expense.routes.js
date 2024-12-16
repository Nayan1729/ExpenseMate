import { Router } from "express";
import { addExpense, fetchExpenses } from "../controllers/expense.controller.js";
import verifyJWT from "../middlewares/auth.middlewares.js"
const expenseRouter = Router();

expenseRouter.route("/addExpense").post(verifyJWT,addExpense);
expenseRouter.route("/fetchExpenses").get(verifyJWT,fetchExpenses)
export default expenseRouter;