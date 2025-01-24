import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <nav className="flex space-x-4 bg-primary p-4 rounded-lg shadow-md fixed top-0 left-0 right-0 z-10">
                  <Link to="/" className="flex items-center text-white hover:text-accent transition-colors">
                      Home
                  </Link>
                  <Link to="/about" className="flex items-center text-white hover:text-accent transition-colors">
                      About
                  </Link>
                  <Link to="/register" className="flex items-center text-white hover:text-accent transition-colors">
                      Register
                  </Link>
                  <Link to="/login" className="flex items-center text-white hover:text-accent transition-colors">
                      Login
                  </Link>
              </nav>
      <h1 className="text-3xl font-bold">About Page</h1>
      <p>This is the about page.</p>
    </div>
  );
}

export default About;
