import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import { SignUpValidationSchema } from '../schema/SignUpValidation';
import { signUpApi } from '../apiEndPoints';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import { loginUser } from '../store/userSlice';
import { getCurrentUser } from '../apiEndPoints';
const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state=>state.user.status);
    if(loginStatus)navigate('home');
    useEffect(()=>{
        ;(async () => {
            try {
                console.log("inside useEffect of app");
                
                const res = await getCurrentUser();
                console.log("After the getCurrentUser");
                
                if (res?.success) {
                    console.log("inside the if of useEffect of app");
                    dispatch(loginUser(res.data));

                    navigate('/home');
                } else {
                    console.log("inside tthe else of useEffect of app");
                    
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/register'); // Navigate to login on error
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
            console.log(res.message);
            const userData = res.message.data;
            if(res.success){
                dispatch(loginUser(userData))
                console.log("Hello");
                
                navigate("/home");
            }
        },
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
            <p className="text-center mt-4">
                Already have an account?{' '}
                <span
                    onClick={() => navigate('/login')}
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    Log In
                </span>
            </p>
        </div>
    );
};

export default SignUpForm;