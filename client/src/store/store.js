import {configureStore} from "@reduxjs/toolkit"
import { useReducer } from "react"
import userReducer from "./userSlice"
import friendReducer from "./friendSlice"
import expenseReducer from "./expenseSlice"
 const store = configureStore({
    reducer:{
        user : userReducer,
        friends:friendReducer,
        expenses:expenseReducer
    }
})
export default store;