import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from './store/userSlice';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from './apiEndPoints';

const App = () => {
    console.log("inside app");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        ;(async () => {
            try {
                console.log("inside useEffect of app");
                
                const res = await getCurrentUser();
                console.log("After the getCurrentUser");
                
                if (res.success) {
                    console.log("inside the if of useEffect of app");
                    dispatch(loginUser(res.message.data));

                    navigate('/home');
                } else {
                    console.log("inside tthe else of useEffect of app");
                    
                    navigate('/login'); 
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Navigate to login on error
            }
          })();
    })
    return (
        <>
            
        </>
    );
};

export default App;
