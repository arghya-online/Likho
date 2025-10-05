import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      } else {
        setPosts([]);
      }
    }).catch(error => {
        console.error("Error fetching posts:", error);
        setPosts([]);
    });
  }, []);

  if (posts === null) {
    return (
      <div className="w-full py-40 bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-teal-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.664-4.825A7.962 7.962 0 0120 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8c1.761 0 3.444.601 4.764 1.637" />
          </svg>
          <p className="text-xl text-gray-400">Loading content...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-40 bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center px-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-6 leading-snug">
              Welcome to likho. Share your stories.
            </h1>
            <p className="mt-4 text-xl text-gray-400 mb-10 leading-relaxed">
              Dive into a world of knowledge and compelling stories. To unlock all articles and begin contributing, please **Log In** or **Sign Up**.
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                to="/login"
                className="px-8 py-3 font-bold text-xl rounded-full shadow-xl bg-teal-600 text-gray-900 hover:bg-teal-500 transform hover:scale-105 transition-all duration-300 ring-2 ring-teal-600"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 font-bold text-xl rounded-full border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-16 bg-gray-900 text-gray-100 min-h-screen">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-400 border-b-4 border-teal-500 inline-block pb-1">
            Latest Discoveries
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Explore the newest articles and ideas shared by our community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="col-span-1">
              <PostCard
                {...post}
                className="h-full bg-gray-800 text-gray-100 border border-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-teal-500 transform hover:-translate-y-1 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;