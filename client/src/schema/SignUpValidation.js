import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    mobileNo: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
