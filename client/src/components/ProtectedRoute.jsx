import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function Protected({children,authentication=true}) {
	const navigate = useNavigate()
	const dispatch =useDispatch()
	const [loader, setLoader] = useState(true)
	const authStatus = useSelector(state=>state.user.status)
	useEffect(()=>{
		if(authentication && authStatus!== authentication ){
			console.log("Done have authentication in protected route");
			
			navigate("/login")
		}else if(!authentication && authStatus!==authentication ){
			console.log("Have authentication in Protected Route");
			navigate("/")
		}
		setLoader(false)
	},[authStatus,navigate,authentication])

  return loader ? <Loader/> : <>{children}</>
}
