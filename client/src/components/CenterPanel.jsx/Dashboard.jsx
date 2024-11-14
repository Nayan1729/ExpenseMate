import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddExpenseModal from './AddExpenseModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex-1 p-8 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add Expense
          </button>
        </div>

        {isModalOpen && <AddExpenseModal onClose={closeModal} />}
      </div>
    </main>
  );
};

export default Dashboard;
