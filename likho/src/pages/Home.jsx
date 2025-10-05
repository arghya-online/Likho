import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((result) => setPosts(result?.documents || []))
      .catch(() => setPosts([]));
  }, []);

  if (posts === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-400 text-lg">Loading content...</p>
        </motion.div>
      </div>
    );
  }

  // ✅ Proper if-else logic
  if (!isLoggedIn) {
    // Non-logged-in users: show hero + posts
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">

        {/* Animated background blobs */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ scale: [1, 1.15, 1], rotate: [360, 0, 360] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center pt-24 pb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">
              Welcome to Likho
            </h1>
            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Dive into inspiring stories, fresh ideas, and creative storytelling. 
              Join the community, explore posts, and share your own!
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <Link
                to="/login"
                className="px-8 py-3 text-lg font-semibold rounded-full bg-teal-500 text-black hover:bg-teal-400 transition-all duration-300 transform hover:scale-105"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 text-lg font-semibold rounded-full border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 && (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-24 px-4 md:px-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.$id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  } else {
    // Logged-in users: show only posts
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white relative overflow-hidden px-4 md:px-12">
        {posts.length > 0 && (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-24"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.$id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  }
}

export default Home;
