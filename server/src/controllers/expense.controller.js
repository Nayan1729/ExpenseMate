import ApiError from "../utilities/ApiError.js";
import ApiResponse from "../utilities/ApiResponse.js"
import asyncHandler from "../utilities/asyncHandler.js"
import {Expense} from "../models/expenses.models.js"
import { User } from "../models/users.models.js";
/*

      selectedFriends: [],
      payer: ''
*/
const addExpense = asyncHandler(async (req,res)=>{
    try {
        const { description, amount, category, payer,  selectedFriends, splitType } = req.body;
        if ([description, category,splitType].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }
        if(selectedFriends.length==0){
            throw new ApiError(400,"At least one participant is required");
        }
        const users = await User.aggregate([
            {
                $match : {
                    username: {
                        $in:selectedFriends
                    }
                }
            },
            {
                $project : { _id : 1 , username : 1  }
            }
        ]);
        const participants = users.map((user)=>({
             userId : user._id,
            amountOwed : Number(0) 
        }))
        let paidBy;
        if(payer=='You'){
            paidBy = req.user._id;
        }
        else{
             paidBy =await User.findOne({username:payer}).select("_id")
        }
       
        const expense = new Expense({
            description,
            amount,
            category,
            participants,
            paidBy,
            splitType
        })

        const newExpense = await expense.calculateSplit();
        
        return res.status(201).json(new ApiResponse(201,newExpense,"Expense added successfully"))
    } catch (error) {
        console.log(error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json(new ApiError(statusCode ,error || "Something went wrong will adding expense"));
    }
})

export {addExpense}