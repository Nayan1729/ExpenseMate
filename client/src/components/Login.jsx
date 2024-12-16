// components/LoginForm.jsx
import React, { useEffect,useState } from 'react';
import { useFormik } from 'formik';
import { LoginValidationSchema } from '../schema/LoginValidation';
import InputField from './InputField';
import { loginApi,getCurrentUser } from '../apiEndPoints'; // Assume you have this API function
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from "../store/userSlice"
import Loader from './Loader';
const LoginForm = () => {
    const status = useSelector(state=>state.user?.status);
    const [loader,setLoader] = useState(true);
    // console.log("status in login Form"+status);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!status) {   
            ;(async () => {
                try {
                    setLoader(true)
                    console.log("inside the getCurrent user in login");
                    
                    const res = await getCurrentUser();
                    setLoader(false);
                    if (res.success) {
                        dispatch(loginUser(res.data));
                        
                        navigate('/home');
                    } else {
                        navigate('/login'); 
                    }
                } catch (error) {
                    navigate('/login'); // Navigate to login on error
                }
              })();
        } else {

            navigate('/home');
        }
    }, []);

    /*
    What onBlur Does

        Tracks User Interaction: When a user leaves the field, Formik sets that field as touched in the form’s state. 
        You can access this with formik.touched.username.

        Triggers Validation: When onBlur is called, Formik will validate the field if validateOnBlur is true (which it is by default).
         This validation can then display any errors tied to that field in formik.errors.
    */
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginValidationSchema,
        onSubmit: async (values) => {
            // Call your login API here
            const res = await loginApi(values);
            const userData = res.data;
            if(res.success){
                dispatch(loginUser(userData));
                navigate('/home');
            }
        },
    });
    if(loader) return (
       <Loader/>
    )
    if(!loader){
        return (
            <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Log In</h2>
                <form onSubmit={formik.handleSubmit}>
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
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-200 ease-in-out"
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{' '} 
                    <span 
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={()=>navigate('/register')}
                    >
                        Sign Up
                    </span>
                </p>
                <h3 className='text-center mt-4'>Or</h3>
                
            </div>
        );
    }
};
export default LoginForm;


