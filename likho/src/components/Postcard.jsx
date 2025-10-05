import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import placeholderImage from '../assets/placeholder.png';
import { motion } from 'framer-motion';

function PostCard({ $id, title, FeaturedImage }) {
  const imageUrl = FeaturedImage
    ? appwriteService.getFilePreview(FeaturedImage).href
    : placeholderImage;

  return (
    <Link to={`/post/${$id}`} className="block max-w-sm m-4">
      <div className="group bg-slate-800 rounded-xl p-5 border-2 border-slate-700 transition-transform duration-300 ease-in-out hover:scale-105 hover:border-teal-500/60 flex flex-col h-full">
        <div className="w-full h-48 md:h-60 lg:h-64 rounded-lg overflow-hidden mb-4">
          <img
            src={placeholderImage}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-white">
          {title}
        </h2>

        <p className="text-sm text-gray-400 mt-auto">Read More &rarr;</p>
      </div>
    </Link>
  );
}

export default PostCard;
