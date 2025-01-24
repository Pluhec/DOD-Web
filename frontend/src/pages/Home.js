import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../Photos/heroimage.png';

const Home = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-background min-h-screen flex flex-col'>
      {/* Navigation */}
      <nav className="flex space-x-4 bg-background p-4 shadow-md fixed top-0 left-0 right-0 z-10">
        <Link to="/" className="flex items-center text-textPrimary hover:text-accent transition-colors">
          Home
        </Link>
        <Link to="/about" className="flex items-center text-textPrimary hover:text-accent transition-colors">
          About
        </Link>
        <Link to="/register" className="flex items-center text-textPrimary hover:text-accent transition-colors">
          Register
        </Link>
        <Link to="/login" className="flex items-center text-textPrimary hover:text-accent transition-colors">
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow relative h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-8xl font-bold text-textSecondary font-nowharehouse">UNDEATH</h1>
        </div>
        <div className="absolute bottom-10 w-full flex justify-center">
          <button 
            onClick={scrollToContent} 
            className="text-textSecondary bg-accent rounded-full p-4 hover:bg-secondaryBackground transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div id="content-section" className="p-8 flex-grow">
        <h2 className="text-4xl font-bold mb-6 text-center text-textPrimary">Download "Undeath"</h2>
        <p className="text-lg text-center text-textPrimary mb-8">
          Dive into the dark and mysterious world of "Undeath." Select your platform below to begin your adventure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/path-to-windows" className="bg-secondaryBackground text-textSecondary px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-accent transition-transform transform hover:-translate-y-1 text-center">
            <h3 className="text-2xl font-semibold">Windows</h3>
            <p className="mt-2 text-sm text-textPrimary">Optimized for Windows 10+</p>
          </a>
          <a href="/path-to-mac" className="bg-secondaryBackground text-textSecondary px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-accent transition-transform transform hover:-translate-y-1 text-center">
            <h3 className="text-2xl font-semibold">MacOS</h3>
            <p className="mt-2 text-sm text-textPrimary">Designed for MacOS 11+</p>
          </a>
          <a href="/path-to-linux" className="bg-secondaryBackground text-textSecondary px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-accent transition-transform transform hover:-translate-y-1 text-center">
            <h3 className="text-2xl font-semibold">Linux</h3>
            <p className="mt-2 text-sm text-textPrimary">Compatible with major Linux distributions</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;