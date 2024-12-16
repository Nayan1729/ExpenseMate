import React, { useEffect,useState } from 'react'
import {InviteInput,GoogleContacts,Navbar,Dashboard} from "./index"
import LeftPanel from './LeftPanel/LeftPanel'
import { useDispatch, useSelector } from 'react-redux'
import {Loader} from './index'

function Home() {
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