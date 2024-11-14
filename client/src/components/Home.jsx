import React, { useEffect,useState } from 'react'
import {InviteInput,GoogleContacts,Navbar,Dashboard} from "./index"
import LeftPanel from './LeftPanel.jsx/LeftPanel'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../apiEndPoints'
import { setFriends } from '../store/friendSlice'
import {Loader} from './index'
function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

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

  
  if(loading){
    return <Loader/>
  }
  return (
    <>

    <Navbar/>
    <div className="flex min-h-screen bg-gray-50">
    <LeftPanel/>
    <Dashboard /> 
    </div>
    </>
  )
}

export default Home