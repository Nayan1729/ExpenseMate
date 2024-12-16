import React from 'react'

function ExpenseList() {
    return (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select className="text-sm rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-full sm:w-auto">
                <option>All Categories</option>
                <option>Food</option>
                <option>Rent</option>
                <option>Transport</option>
                <option>Other</option>
              </select>
              <select className="text-sm rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-full sm:w-auto">
                <option>Most Recent</option>
                <option>Oldest</option>
                <option>Highest Amount</option>
                <option>Lowest Amount</option>
              </select>
            </div>
            
          </div>
        </div>
  );
}

export default ExpenseList