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
        if(selectedFriends.length==1){
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
             username: user.username,
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
/*
After the first stage i.e match
[
{
    "_id": "expense1",
    "description": "Dinner",
    "amount": 50,
    "paidBy": "user1",
    "participants": [
        { "userId": "user1", "userName": "User1", "amountOwed": 0 },
        { "userId": "user2", "userName": "User2", "amountOwed": 25 },
        { "userId": "user3", "userName": "User3", "amountOwed": 25 }
    ]
    }
]

2)After the unwind // Neccessary as this is a individual expense for an individual user
[
  {
    "_id": "expense1",
    "description": "Dinner",
    "amount": 50,
    "paidBy": "user1",
    "participants": { "userId": "user1", "userName": "User1", "amountOwed": 0 }
  },
  {
    "_id": "expense1",
    "description": "Dinner",
    "amount": 50,
    "paidBy": "user1",
    "participants": { "userId": "user2", "userName": "User2", "amountOwed": 25 }
  },
  {
    "_id": "expense1",
    "description": "Dinner",
    "amount": 50,
    "paidBy": "user1",
    "participants": { "userId": "user3", "userName": "User3", "amountOwed": 25 }
  }
]

3)After the match

[
  {
    "_id": "expense1",
    "description": "Dinner",
    "amount": 50,
    "paidBy": "user1",
    "participants": { "userId": "user2", "userName": "User2", "amountOwed": 25 }
  }
]
Assuming user2 is the currentUser

*/
const fetchExpenses = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all expenses where the user is present and exclude them from participants
    const userExpenses = await Expense.aggregate([
      {
        $match: {
          $or: [
            { "participants.userId": userId }, // User is a participant
            { paidBy: userId }                // User paid the expense
          ],
        },
      },
      {
        $addFields: {
          participants: {
            $filter: {
              input: "$participants",
              as: "participant",
              cond: { $ne: ["$$participant.userId", userId] }, // Exclude the user
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort expenses by newest first
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        { userExpenses },
        "Expenses where the user is involved fetched successfully"
      )
    );
  } catch (error) {
    const statusCode = error.status || 500;
    return res
      .status(statusCode)
      .json(
        new ApiError(
          statusCode,
          error.message || "Something went wrong while fetching expenses"
        )
      );
  }
});

  

export {addExpense,fetchExpenses}