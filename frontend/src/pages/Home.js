import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-blue-500">Home</Link>
        <Link to="/about" className="text-blue-500">About</Link>
        <Link to="/register" className="text-blue-500">Register</Link>
        <Link to="/login" className="text-blue-500">Login</Link>
      </nav>
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
