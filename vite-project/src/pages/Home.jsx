import { Link } from 'react-router-dom';
import { getRandomCallToAction } from './PostPage';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
    const RandomCallToAction = getRandomCallToAction();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getPosts');
                const data = await res.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-6 lg:gap-8 px-3 max-w-6xl mx-auto pt-10 lg:pt-16 mb-16">
                <h1 className="text-4xl font-bold lg:text-6xl dark:text-gray-200">Welcome to Roca-Blog</h1>
                <p className="text-gray-600 text-base lg:text-lg dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo delectus eos assumenda numquam quidem laboriosam aliquid doloremque consequatur non totam, odit sapiente porro velit ducimus.
                </p>
                <Link to='/search' className='text-base text-teal-600 font-bold hover:underline'>
                    View all posts
                </Link>
            </div>
            <div className='max-w-4xl mx-auto w-full mb-16'>
            <div className="mt-20 max-w-4xl mx-auto w-full mb-16 p-8 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-3xl">
        <div className="flex flex-col items-center">
         
          <div className="w-full flex justify-center">
            <RandomCallToAction />
          </div>
        </div>
      </div>            </div>
            <div className='max-w-6xl mx-auto py-6 lg:py-12'>
                {posts && posts.length > 0 && (
                    <div>
                        <h2 className='text-3xl font-semibold text-center mb-8 lg:mb-12 dark:text-gray-300'>Recent Posts</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                            {posts.map((post) => (
                                <div key={post._id} className='flex justify-center'>
                                    <PostCard post={post} />
                                </div>
                            ))}
                        </div>
                        <div className='text-center mt-8'>
                            <Link 
                                to='/search' 
                                className='text-lg text-teal-600 font-semibold hover:underline'
                            >
                                View all posts
                            </Link>
                        </div>
                    </div>
                    
                )}
            </div>
        </div>
    );
}
