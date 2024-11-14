import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
      list: [],  // Stores list of expenses
      error: null,  // Stores error if there's any
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
 