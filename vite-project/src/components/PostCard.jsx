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
    <div className='group relative w-full border border-gray-200 hover:border-teal-500 h-[420px] overflow-hidden rounded-lg sm:w-[430px] transition-all duration-300 shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'>
      <Link to={`/post/${post.slug}`} className="block relative h-[260px] overflow-hidden">
        <img
          src={post.image}
          alt='post cover'
          className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 z-20'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      <div className='p-5 flex flex-col h-[160px]'>
        <div className='flex justify-between items-center mb-2'>
          <Link to={`/category/${post.category.toLowerCase()}`} className='text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900 px-2 py-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-200'>
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
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
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
          className=' absolute right-4 bottom-4 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white hover:from-blue-800 hover:via-blue-700 hover:to-blue-500 transition-all duration-300 py-2 px-4 rounded-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-100 active:scale-95 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          aria-label={`Read article: ${post.title}`}
        >
          <span className='flex items-center justify-center gap-1'>
            Read articale
          </span>
        </Link>
      </div>
    </div>
  );
}
