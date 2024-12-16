import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {AddExpenseModal,BalanceSum} from '../../index';
import { useDispatch } from 'react-redux';
import { setExpenses } from '../../../store/expenseSlice';
import { fetchExpenses } from '../../../apiEndPoints';
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    async function getExpense(){
      const res = await fetchExpenses();
      console.log(res.data.userExpenses);
      
      if(res.success){
        dispatch(setExpenses(res.data.userExpenses))
      }
    }
    getExpense();
  },[])
  return (
    <>
    
    <main className="flex-1 p-8 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} />
            Add Expense
          </button>
        </div>

        {isModalOpen && <AddExpenseModal onClose={closeModal} />}
        <BalanceSum/>
      </div>
    </main>
    
    </>
  );
};

export default Dashboard;
