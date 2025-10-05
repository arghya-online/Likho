import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((result) => {
        if (result && result.documents) {
          setPosts(result.documents);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <Loader2 className="animate-spin w-10 h-10 text-teal-400" />
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gradient-to-b from-black to-gray-900 text-white">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">
            No posts available.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PostCard {...post} />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
