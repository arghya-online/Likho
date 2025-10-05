import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

// ✅ 1. Import your local placeholder image
import placeholderImage from '../assets/placeholder.png' 

function Postcard({$id, title, FeaturedImage }) {
    return (
        <Link to={`/post/${$id}`} className="block max-w-sm m-4">
            <div className='group w-full bg-slate-800 rounded-xl p-5 border-2 border-slate-700 transition-all duration-300 ease-in-out hover:scale-105 hover:border-teal-500/60'>
                <div className='w-full overflow-hidden rounded-lg mb-5'>
                    <img 
                        // ✅ 2. Use the imported image as the fallback
                        src={FeaturedImage ? appwriteService.getFilePreview(FeaturedImage) : placeholderImage} 
                        alt={title}
                        className='rounded-lg w-full h-full object-cover' 
                    />
                </div>
                <h2 className='relative inline-block text-xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-white'>
                    {title}
                    <span className="absolute bottom-[-4px] left-0 block h-0.5 w-full bg-teal-500 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 origin-left"></span>
                </h2>
                <p className="mt-4 text-sm text-gray-400">
                    This is a brief summary of the blog post. It gives the reader a glimpse into the content and encourages them to click to read more.
                </p>
            </div>
        </Link>
    )
}

export default Postcard