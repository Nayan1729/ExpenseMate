import React,{useEffect,useState} from 'react';
import { useFormik } from 'formik';
import InputField from './InputField';
import { SignUpValidationSchema } from '../schema/SignUpValidation';
import { acceptInvitaion, signUpApi } from '../apiEndPoints';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import { useLocation } from 'react-router-dom';
import { loginUser } from '../store/userSlice';

import { getCurrentUser,createFriendship } from '../apiEndPoints';
const SignUpForm = () => {
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const token = query.get('token')
    let navigateTo;
  
    const loginStatus = useSelector(state=>state?.user?.status);
    let navigateToRegister , navigateToLogin;
    useEffect(()=>{
        if(token){
             navigateToRegister = `/register?token=${token}`;
             navigateToLogin = `/login?token=${token}`;
        }else{
            navigateToRegister = `/register`; 
            navigateToLogin    = `/login`;
        }
        if(loginStatus)navigate('/home');
        ;(async () => {
            try {
                console.log("inside useEffect of signUp component");
                
                const res = await getCurrentUser();
                console.log(res);
                
                
                if (res?.success) {
                    
                    dispatch(loginUser(res.data));
                    
                    if(token){
                        console.log(token);
                        
                        console.log("Inside the signup's token if");
                        await createFriendship();
                    }
                    navigate('/home');
                } else {
                    console.log("inside the else of useEffect of app");
                    
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate(navigateToRegister); // Navigate to login on error
            }
          })();
    },[navigate,dispatch])
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            mobileNo: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignUpValidationSchema,
        onSubmit: async (values) => {
            // API call for signing up

            const res = await signUpApi(values);
            setError(res.message)
            console.log("res:",res);
            
            const userData = res.message.data;
            if (res.success) {
                // Login user
                setError("");
                dispatch(loginUser(userData));
                
                console.log("Hello in the onSubmit of signUp form");
        
                // If there's a token, handle invitation acceptance and friendship creation
                if (token) {
                    console.log("Token found:", token);
                    
                    // Accept invitation
                    const invitationResponse = await acceptInvitaion(token);
                    if (invitationResponse.success) {
                        console.log(invitationResponse);
                        
                        const senderId = invitationResponse.data.senderId;
                        console.log("Invitation accepted from sender:", senderId);
        
                        // Create friendship
                        const userId = userData._id;
                        console.log(userId , senderId );
                        
                        const friendshipResponse = await createFriendship(userId, senderId);
                        console.log("Friendship created:", friendshipResponse);
                    } else {
                        console.log("Failed to accept invitation");
                    }
                }
                
                // Only navigate after all actions are complete
                navigate("/home");
            }
        }
            });

        
    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    label="Username"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.username}
                    touched={formik.touched.username}
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />
                <InputField
                    label="Mobile No"
                    name="mobileNo"
                    type="text"
                    value={formik.values.mobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.mobileNo}
                    touched={formik.touched.mobileNo}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />
                <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.confirmPassword}
                    touched={formik.touched.confirmPassword}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-200 ease-in-out"
                >
                    {formik.isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
            <p className='text-center text-red-600'>{error}</p>
            <p className="text-center mt-4">
                Already have an account?{' '}
                <span
                    onClick={() => {
                        navigate(navigateToLogin)
                    }}

                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    Log In
                </span>
            </p>
            
        </div>
    );
};

export default SignUpForm;