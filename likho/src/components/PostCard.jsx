import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PostCard({ $id, title, Content }) {
  const plainText = Content?.replace(/<[^>]+>/g, '');
  const words = plainText.split(/\s+/).slice(0, 20).join(' ');
  const shortContent = words + (plainText.split(/\s+/).length > 20 ? '...' : '');

  return (
    <Link to={`/post/${$id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.03,
          y: -4,
          boxShadow: '0 10px 25px rgba(20, 184, 166, 0.25)',
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 12,
        }}
        className="bg-slate-800 border border-slate-700 hover:border-teal-500/60 
                   rounded-xl p-6 m-4 flex flex-col items-start justify-between 
                   shadow-md hover:shadow-lg transition-all duration-300
                   min-h-[230px] max-h-[230px]"
      >
        <h2 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {shortContent}
        </p>

        <motion.p
          animate={{ opacity: [1, 0.7, 1], y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-teal-400 font-medium mt-auto"
        >
          Read More →
        </motion.p>
      </motion.div>
    </Link>
  );
}

export default PostCard;
