import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { PostCard } from "../../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState(null); // null = still loading posts
  const [authResolved, setAuthResolved] = useState(false);
  const [actualLoggedIn, setActualLoggedIn] = useState(false);

  const { isLoggedIn, loading: authLoading } = useSelector((state) => state.auth || {});

  // Fetch posts (everyone can see)
  useEffect(() => {
    let mounted = true;
    appwriteService
      .getPosts()
      .then((res) => {
        if (!mounted) return;
        setPosts(res?.documents || []);
      })
      .catch(() => {
        if (!mounted) return;
        setPosts([]);
      });
    return () => (mounted = false);
  }, []);

  // Resolve auth: prefer Redux, otherwise double-check with Appwrite to avoid timing issues
  useEffect(() => {
    let mounted = true;

    if (isLoggedIn) {
      setActualLoggedIn(true);
      setAuthResolved(true);
      return () => (mounted = false);
    }

    // if Redux says not logged in (or undefined), verify with Appwrite directly
    appwriteService
      .getCurrentUserId()
      .then((user) => {
        if (!mounted) return;
        setActualLoggedIn(!!user);
      })
      .catch(() => {
        if (!mounted) return;
        setActualLoggedIn(false);
      })
      .finally(() => {
        if (!mounted) return;
        setAuthResolved(true);
      });

    return () => (mounted = false);
  }, [isLoggedIn]);

  // show spinner only while posts are loading
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

  const showWelcome = authResolved ? !actualLoggedIn : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white rounded-lg overflow-hidden mt-10 px-4 md:px-12">
      {/* background blobs */}
      <motion.div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-teal-300 mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ scale: [1, 1.15, 1], rotate: [360, 0, 360] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} />

      {/* Welcome (guests only and only after auth resolved) */}
      {showWelcome && (
        <motion.div className="text-center pt-24 pb-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">Welcome to Likho</h1>
          <motion.p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            A space where compelling narratives and big ideas come to life. Connect with fellow creators and inspire the world.
          </motion.p>
          <motion.div className="mt-8 flex flex-col sm:flex-row justify-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
            <Link to="/login" className="px-8 py-3 text-lg font-semibold rounded-full bg-teal-500 text-black hover:bg-teal-400 transition-all duration-300 transform hover:scale-105">Log In</Link>
            <Link to="/signup" className="px-8 py-3 text-lg font-semibold rounded-full border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-all duration-300 transform hover:scale-105">Sign Up</Link>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className={`text-center ${showWelcome ? "" : "pt-24"} mb-8 px-2`}>
        <motion.h2 className="font-extrabold text-4xl md:text-3xl text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          Read Other Blogs
        </motion.h2>
        <motion.h2 className="mt-8 text-white text-xl md:text-base" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}>
          Explore what others are writing, get inspired, and discover fresh ideas.
        </motion.h2>
      </div>

      {/* Posts grid (everyone sees posts) */}
      {posts.length > 0 ? (
        <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-24" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {posts.map((post) => (
            <motion.div key={post.$id} variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <PostCard {...post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 text-lg pb-24">No posts yet.</p>
      )}
    </div>
  );
}

export default Home;

/**
 * ISSUE:
 * - Logged-in users were still seeing the "Welcome to Likho" section with login/signup buttons.
 * - This happened because the UI relied only on Redux's `isLoggedIn` value,
 *   which was often `false` before the auth check finished (causing a temporary or constant mismatch).
 * - In short: the logic was showing the welcome screen before authentication was fully resolved.
 *
 * FIX:
 * - Introduced two new states: `authResolved` and `actualLoggedIn`.
 *   - `authResolved` ensures we only render the welcome once the auth state is completely known.
 *   - `actualLoggedIn` reflects the *real* login status after verifying with Appwrite (fallback check).
 * - We now conditionally render the welcome section only when:
 *     `authResolved` is true AND `actualLoggedIn` is false.
 * - This prevents flicker, ensures consistency, and makes the homepage behavior reliable for all users.
 *
 * RESULT:
 * - Everyone can now view posts, logged-in users never see the welcome section,
 *   and guests still see it normally — no more login confusion or visual bugs.
 */

