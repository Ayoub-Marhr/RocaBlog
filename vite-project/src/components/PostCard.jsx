import { Link } from 'react-router-dom';
import { FaRegClock, FaRegComment } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostCard({ post }) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/api/comment/getPostComments/${post._id}`);
        setCommentCount(response.data.length);
      } catch (error) {
        console.error('Error fetching comment count:', error);
      }
    };

    fetchCommentCount();
  }, [post._id]);

  return (
    <div className='group relative w-full sm:w-[430px] h-[420px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl'>
      <Link to={`/post/${post.slug}`} className="block relative h-[260px] overflow-hidden">
        <img
          src={post.image}
          alt='post cover'
          className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      <div className='p-5 flex flex-col h-[160px]'>
        <div className='flex justify-between items-center mb-2'>
          <Link 
            to={`/category/${post.category.toLowerCase()}`} 
            className='text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800/50 transition-colors duration-200'
          >
            {post.category}
          </Link>
          <span className='text-xs text-gray-500 dark:text-gray-400'>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <Link to={`/post/${post.slug}`}>
          <h2 className='text-xl font-bold line-clamp-2 text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200'>
            {post.title}
          </h2>
        </Link>
        <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1'>
          {post.excerpt}
        </p>
        <div className='flex justify-between items-center mt-auto'>
          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            <span className='flex items-center gap-1'>
              <FaRegClock className='text-teal-500' />
              {Math.ceil(post.content.length / 1000)} min read
            </span>
            <span className='flex items-center gap-1'>
              <FaRegComment className='text-teal-500' />
              {commentCount} comments
            </span>
          </div>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className='absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-all duration-300 py-2 px-4 rounded-full text-sm font-medium tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
          aria-label={`Read article: ${post.title}`}
        >
          Read article
        </Link>
      </div>
    </div>
  );
}