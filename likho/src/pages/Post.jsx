import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  // Check if current user is the author
  const isAuthor = post && userData ? post.UserId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/"); // Post not found
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  // Delete post handler
  const deletePost = async () => {
    if (!post) return;
    try {
      await appwriteService.deletePost(post.$id);
      if (post.FeaturedImage) {
        await appwriteService.deleteFile(post.FeaturedImage);
      }
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  // Render loading state
  if (!post) {
    return (
      <div className="py-12 bg-slate-900 text-gray-100 min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-900 text-gray-100 min-h-screen">
      <Container>
        {/* Featured Image */}
        {post.FeaturedImage && (
          <div className="w-full flex justify-center mb-6 relative border border-slate-700 rounded-xl p-2 bg-slate-800 shadow-md">
            <img
              src={appwriteService.getFilePreview(post.FeaturedImage)}
              alt={post.title || "Post Image"}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-teal-600 hover:bg-teal-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-600 hover:bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-teal-400">{post.title || ""}</h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-full text-gray-100">
          {parse(typeof post.Content === "string" ? post.Content : "")}
        </div>
      </Container>
    </div>
  );
}
