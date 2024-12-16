import React,{useEffect,useState} from 'react'
import { Users, Receipt, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { getFriends } from '../../apiEndPoints/index'
import { setFriends } from '../../store/friendSlice'
import Loader from '../Loader';
function SideBar() {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
    async function fetchFriends (){
      setLoading(true);
      const res = await getFriends();
      console.log(res.data);
      if(res.success){
        dispatch(setFriends(res.data))
        setLoading(false)
      }
    }
    console.log("inside the home components fetchfriends useEffect");
    
    fetchFriends();
},[])
    const friends = useSelector(state=>state.friends.list)
    if(loading){
        return <Loader/>
    }
  return (
    <div className="w-[280px] bg-white border-r border-gray-200 p-4 flex flex-col h-screen pt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
        <div className="space-y-1">
            <Link to="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-2 py-3 rounded-lg">
                <Receipt size={15} />
                <span>Dashboard</span>
            </Link>
            <Link to="#" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 pl-2 py-2 rounded-lg">
                {<Receipt size={15} /> }
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
                    {/* Add the balance */}
                </Link>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SideBar