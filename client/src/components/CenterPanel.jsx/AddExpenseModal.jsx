import React, { useState } from 'react';
import { X } from 'lucide-react';
import ExpenseForm from './ExpenseForm';

const AddExpenseModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Expense</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <ExpenseForm onClose={onClose} />
      </div>
    </div>
  );
};

export default AddExpenseModal;
