import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock } from "lucide-react";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-2xl p-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-400 hover:text-teal-300 transition-all duration-200 underline-offset-2 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-6 text-sm"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit(loginUser)} className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              icon={<Mail className="text-gray-400 w-5 h-5" />}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.email?.message}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              icon={<Lock className="text-gray-400 w-5 h-5" />}
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
