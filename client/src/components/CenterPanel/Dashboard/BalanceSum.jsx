import React from 'react'
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';
function BalanceSum() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <MinusCircle className="h-6 w-6 lg:h-8 lg:w-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">total balance</p>
                {/* Write the total */}
                <p className="text-xl lg:text-2xl font-semibold text-gray-900"></p>
              </div>
            </div>
          </div>
    
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <ArrowUpCircle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">you owe</p>
                {/* Write the total */}
                <p className="text-xl lg:text-2xl font-semibold text-red-500"></p>
              </div>
            </div>
          </div>
    
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <ArrowDownCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">you are owed</p>
                {/* Write the total */}
                <p className="text-xl lg:text-2xl font-semibold text-green-500"></p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default BalanceSum