import React from 'react'
import { Users, Receipt, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function SideBar() {
    const friends = useSelector(state=>state.friends.list)
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 py-12 flex flex-col ">
        <div className="flex items-center gap-2 mb-8">
            <nav className="flex-1">
            <div className="space-y-1">
            <Link to="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-4 py-3 rounded-lg">
                {/* <Receipt size={20} /> */}
                <span>Dashboard</span>
            </Link>
            <Link to="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                {<Receipt size={20} /> }
                <span>All expenses</span>
            </Link>
            <div className="pt-4">
                <h3 className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Friends
                </h3>
                {friends && friends.length>0 && friends.map((friend) => (
                    
                <Link
                    key={friend._id}
                    to="#"
                    className="flex items-center  px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    aria-label={`View expenses with ${friend.username}`}
                >
                    {<Users size={15} /> }
                    <span className='ml-2'>{friend.username}</span>
                    
                </Link>
                ))}
            </div>
            </div>
        </nav>
        </div>
    </div>
  )
}

export default SideBar