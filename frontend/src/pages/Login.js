import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: ''
    },
    validationSchema: Yup.object({
    //   nickname: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required')
    }),
    onSubmit: async (values) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values), // `values` obsahuje email a password
            });
          
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Login failed');
            }
          
            const data = await response.json();
            console.log('Login successful:', data);
            
            // Store JWT token in localStorage
            localStorage.setItem('authToken', data.token);

            navigate('/Maps'); // Nebo jiná stránka po úspěchu
          } catch (error) {
            console.error('Login failed:', error.message);
          }
    }
  });

return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
        <nav className="flex space-x-4 bg-primary p-4 rounded-lg shadow-md fixed top-0 left-0 right-0 z-10">
            <Link to="/" className="flex items-center text-white hover:text-accent transition-colors">
                Home
            </Link>
            <Link to="/register" className="flex items-center text-white hover:text-accent transition-colors">
                Register
            </Link>
            <Link to="/login" className="flex items-center text-white hover:text-accent transition-colors">
                Login
            </Link>
        </nav>
        <div className='bg-secondaryBackground w-full max-w-sm p-8 rounded-lg shadow-lg'>
            <h1 className='text-4xl font-bold text-textPrimary mb-6 font-nowharehouse'>UNDEATH</h1>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nickname" className="block text-textPrimary mb-2">Nickname</label>
                <input
                    className='w-full px-4 py-2 mb-4 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondaryBackground text-textSecondary'
                    type="text"
                    id="nickname"
                    placeholder="Your nickname"
                    {...formik.getFieldProps('nickname')}
                />
                {formik.touched.nickname && formik.errors.nickname ? (
                    <div className="text-error">{formik.errors.nickname}</div>
                ) : null}

                <label htmlFor="password" className="block text-textPrimary mb-2">Password</label>
                <div className="relative w-full">
                    <input
                        className='w-full px-4 py-2 mb-4 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondaryBackground text-textSecondary'
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Your password"
                        {...formik.getFieldProps('password')}
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-textPrimary"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash className="mb-2" /> : <FaEye className="mb-2" />}
                    </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-error">{formik.errors.password}</div>
                ) : null}

                <button
                    className='w-full py-3 mt-4 bg-accent text-textSecondary rounded-lg font-bold hover:bg-background transition-colors'
                    type="submit"
                >
                    Login
                </button>
            </form>

            <div className="text-center mt-6 flex flex-col justify-center">
                <p className="text-textSecondary font-thin text-s">Not a member?</p> 
                <Link to="/register" className="text-textPrimary font-bold hover:underline">Register</Link>
            </div> 
        </div>
    </div>
);
};

export default Login;