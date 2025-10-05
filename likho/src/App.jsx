import React, { useState, useEffect } from 'react';
import './App.css';
import authService from "./appwrite/auth";
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice'; 
import Header from './components/Header/Header.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import { Outlet } from 'react-router-dom';
import HeroSection from './components/HeroSection/HeroSection';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      }
    })
    .catch(() => {
      // Log the action, not the error, for cleaner console
      // console.log("Dispatching logout after auth check failure.");
      dispatch(logout());
    })
    .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-teal-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.664-4.825A7.962 7.962 0 0120 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8c1.761 0 3.444.601 4.764 1.637" />
          </svg>
          <p className="text-xl text-gray-400">Loading application...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className='flex-grow'> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;