import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
      list: [],  // Stores list of expenses
    },
    reducers: {
      // Action to set the list of expenses
      setExpenses: (state, action) => {
        state.list = action.payload;
      },
      // Action to add a new expense
      addExpense: (state, action) => {
        state.list.push(action.payload);
      },
    }
})
export const{setExpenses,addExpense} = expenseSlice.actions
export default expenseSlice.reducer
 