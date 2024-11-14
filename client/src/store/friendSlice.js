import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    list:[]
}
const friendSlice = createSlice({
    name:"friends",
    initialState,
    reducers:{
        setFriends: (state, action) => {
            
            state.list = action.payload;

        },
        addFriend:(state,action)=>{
            state.list.push = action.payload
        },
        removeFriend:(state,action)=>{
            state.list = state.list.filter((friend)=>friend._id != action.payload )
        },
    }
})

export const {setFriends,addFriend,removeFriend} =friendSlice.actions

export default friendSlice.reducer;