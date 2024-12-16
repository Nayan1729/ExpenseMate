import React from 'react';
import { Utensils, Home, Car, ShoppingBag, Clock, Users, IndianRupeeIcon } from 'lucide-react';
// HOw each expense will look
const getCategoryIcon = (category) => {
    switch (category) {
      case 'food':
        return <Utensils className="text-orange-500" />;
      case 'rent':
        return <Home className="text-blue-500" />;
      case 'transport':
        return <Car className="text-green-500" />;
      default:
        return <ShoppingBag className="text-purple-500" />;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  export default function ExpenseCard({ expense, onSelect }) {
    const perPersonAmount = expense.amount / (expense.splitWith.length + 1);
  
    return (
      <div 
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
        onClick={() => onSelect(expense)}
      >
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
              {getCategoryIcon(expense.category)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{expense.description}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Paid by <span className="font-medium text-gray-700">{expense.paidBy}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ${perPersonAmount.toFixed(2)} / person
                  </p>
                </div>
              </div>
  
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{formatDate(expense.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span>{expense.splitWith.length + 1} people</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Split with:</span>
            <div className="flex -space-x-2">
              {expense.splitWith.map((person, index) => (
                <div
                  key={index}
                  className="h-6 w-6 rounded-full bg-teal-100 border border-white flex items-center justify-center"
                  title={person}
                >
                  <span className="text-xs font-medium text-teal-700">
                    {person.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }