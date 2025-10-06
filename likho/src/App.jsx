import React, { useState, useEffect } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home"

// ✅ Framer Motion & Lucide
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false));
  }, [dispatch]);

 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <Loader2 className="animate-spin w-10 h-10 text-teal-400 mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-medium text-gray-300"
          >
            Loading Likho...
          </motion.p>
        </motion.div>
      </div>
    );
  }

 
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
