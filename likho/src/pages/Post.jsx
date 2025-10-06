import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.UserId === userData.$id : false;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/"); // Post not found
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleDelete = async () => {
    if (!post) return;
    try {
      await appwriteService.deletePost(post.$id);
      //if (post.FeaturedImage) await appwriteService.deleteFile(post.FeaturedImage);
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (!post) {
    return (
      <div className="py-12 bg-slate-900 text-gray-100 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-12 py-12 bg-slate-900 text-gray-100 min-h-screen relative">
      <Container>
        {/* Featured Image */}
        {/* {post.FeaturedImage && (
          <div className="w-full flex justify-center mb-6 relative">
            <img
              src={appwriteService.getFilePreview(post.FeaturedImage)}
              alt={post.title || "Post Image"}
              className="rounded-xl"
            />
          </div>
        )} */}

        {/* Title */}
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-teal-400">{post.title || ""}</h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-full text-gray-100">
          {parse(typeof post.Content === "string" ? post.Content : "")}
        </div>

        {/* Edit/Delete Buttons at the bottom */}
        {isAuthor && (
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="w-full sm:w-auto px-6 py-3 text-base bg-teal-600 hover:bg-teal-500">
                Edit
              </Button>
            </Link>
            <Button
              className="w-full sm:w-auto px-6 py-3 text-base bg-red-600 hover:bg-red-500 flex items-center justify-center gap-2"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} /> Delete
            </Button>
          </motion.div>
        )}
      </Container>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-lg border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-teal-400">
                Are you sure you want to delete this post?
              </h2>
              <button onClick={() => setShowDeleteModal(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
