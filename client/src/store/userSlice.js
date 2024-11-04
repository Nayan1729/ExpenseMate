import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user : {},
    status : false
}
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers :{
        loginUser:(state,action)=>{
            state.status = true,
            state.user = action.payload
        },
        logoutUser:(state,action)=>{
            state.status = false,
            state.user = null
        }
    }   
})
export const {loginUser,logoutUser} = userSlice.actions
export default userSlice.reducer
