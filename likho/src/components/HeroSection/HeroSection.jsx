import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, User, Lock, Mail } from "lucide-react";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

export default function HeroSection() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.signUp({ email, password, name });
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 overflow-hidden flex items-center justify-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">

        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 leading-tight"
          >
            Share Your Stories, Inspire the World
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0"
          >
            Join Likho today and explore a universe of knowledge, ideas, and creative storytelling.
          </motion.p>

          {!authStatus ? (
            <>
              {error && <p className="text-red-500 mt-2">{error}</p>}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6"
              >
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-teal-500 outline-none w-full sm:w-64"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-teal-500 outline-none w-full sm:w-64"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-teal-500 outline-none w-full sm:w-64"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  className="px-8 py-4 font-bold text-lg rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                  <ArrowRight size={18} />
                </button>

                <a
                  href="/all-posts"
                  className="px-8 py-4 font-bold text-lg rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300"
                >
                  Explore Posts
                  <BookOpen size={18} />
                </a>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">
                Welcome Back!
              </h2>
              <a
                href="/all-posts"
                className="px-8 py-4 font-bold text-lg rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300"
              >
                Explore Posts
                <BookOpen size={18} />
              </a>
            </motion.div>
          )}
        </div>

        <div className="flex-1 relative w-full max-w-lg">
          {/* Right graphic / background shapes can go here */}
        </div>
      </div>

      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ rotate: [360, 0] }}
        transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
      />
    </section>
  );
}
