import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ExpenseFormSchema } from '../../schema/ExpenseFormValidation';
import { InputField, FriendSelector, PayerDialog } from '../index';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense } from '../../apiEndPoints';

const ExpenseForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends.list);

  // State for "Paid by you and split equally" and opening the dialog
  const [isSplitEqually, setIsSplitEqually] = useState(false);
  const [isPayerDialogOpen, setIsPayerDialogOpen] = useState(false);
  const currentUsername = useSelector(state=>state.user.user.username)
  const formik = useFormik({
    initialValues: {
      description: '',
      amount: '',
      category: 'food',
      selectedFriends: [currentUsername],
      payer: 'You', // New field for selected payer
      splitType:'equally',
      
    },
    validationSchema: ExpenseFormSchema,
    onSubmit: async (values) => {
      console.log('Form Data:', values);
      const res = await addExpense(values);
      const newExpense = res.data;
      
      onClose();
    },
  });

 

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <InputField
        label="Description"
        name="description"
        type="text"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        touched={formik.touched.description}
      />

      <InputField
        label="Amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.amount}
        touched={formik.touched.amount}
        min="0"
        step="0.01"
      />

      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="transport">Transport</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
        ) : null}
      </div>

      <FriendSelector formik={formik} />

      <div className="flex items-center gap-2 mt-4">
        
        <label htmlFor="split-equally" className="text-gray-700">
          Paid by <span className="text-blue-500 cursor-pointer" onClick={() => setIsPayerDialogOpen(true)}> {formik.values.payer || "You"}</span> and split equally
        </label>
      </div>

      {/* Payer Dialog */}
      {isPayerDialogOpen && <PayerDialog setIsPayerDialogOpen={setIsPayerDialogOpen} formik={formik} /> }

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
