import {configureStore} from "@reduxjs/toolkit"
import { useReducer } from "react"
import userReducer from "./userSlice"
import friendReducer from "./friendSlice"
 const store = configureStore({
    reducer:{
        user : userReducer,
        friends:friendReducer
    }
})
export default store;