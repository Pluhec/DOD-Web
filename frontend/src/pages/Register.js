import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = () => {
    // Placeholder for submit logic
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("username:", username);
    navigate('/');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  return (  
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      <nav className="flex space-x-4">
              <Link to="/" className="text-blue-500">Home</Link>
              <Link to="/about" className="text-blue-500">About</Link>
              <Link to="/register" className="text-blue-500">Register</Link>
              <Link to="/login" className="text-blue-500">Login</Link>
            </nav>
      <div className='bg-secondaryBackground w-full max-w-sm p-8 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-textPrimary mb-6 font-nowharehouse'>UNDEATH</h1>

        <label htmlFor="username" className="block text-textPrimary mb-2">Username</label>
        <input
          className='w-full px-4 py-2 mb-4 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondaryBackground text-textSecondary'
          type="username"
          id="username"
          placeholder="Your username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          onKeyDown={handleKeyDown}
        />

        <label htmlFor="email" className="block text-textPrimary mb-2">Email adress</label>
        <input
          className='w-full px-4 py-2 mb-4 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondaryBackground text-textSecondary'
          type="email"
          id="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={handleKeyDown}
        />

        <label htmlFor="password" className="block text-textPrimary mb-2">Password</label>
        <div className="relative w-full">
          <input
            className='w-full px-4 py-2 mb-4 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-secondaryBackground text-textSecondary'
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyDown={handleKeyDown}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-textPrimary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash className="mb-2" /> : <FaEye className="mb-2" />}
          </span>
        </div>

        <button
          className='w-full py-3 mt-4 bg-accent text-textSecondary rounded-lg font-bold hover:bg-background transition-colors'
          onClick={submit}
        >
          Login
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="text-center mt-6 flex flex-col justify-center">
          <p className="text-textSecondary font-thin text-s">Not a member?</p> 
          <Link to="/registration" className="text-textPrimary font-bold hover:underline">Register</Link>
        </div> 
      </div>
    </div>
  );
};

export default Login;