import React from 'react'
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import {useSelector} from "react-redux"
function BalanceList({ title, type }) {
    // This is interesting
    //type===owe
    /*
        if true then return ArrowUp else arrow down
        Similar with the color
    */
   const friends = useSelector(state=>state.friends.list)
   const expenses = useSelector(state=>state.expenses.list);
    const Icon = type === 'owe' ? ArrowUpCircle : ArrowDownCircle;
    const colorClass = type === 'owe' ? 'text-red-500' : 'text-green-500';
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${colorClass}`} />
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
          </div>
    
          <div className="divide-y divide-gray-100">
            {friends.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No balances to show
              </div>
            ) : (
              friends.map((friend) => (
                <div key={friend.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {friend.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-500">
                          {type === 'owe' ? 'you owe' : 'owes you'}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${colorClass}`}>
                      ${Math.abs(friend.balance)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
}

export default BalanceList