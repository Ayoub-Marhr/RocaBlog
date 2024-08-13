import { useEffect, useState } from "react";
import moment from 'moment';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUsers();
    }, [comment]);

    const isLiked = currentUser && comment.likes.includes(currentUser._id);

    return (
        <div className="flex p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4">
            <div className="flex-shrink-0 mr-4">
                <img
                    className="h-14 w-14 rounded-full object-cover shadow-lg ring-4 ring-blue-100 dark:ring-blue-900"
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-base text-gray-800 dark:text-gray-200">
                            {user ? `@${user.username}` : 'anonymous user'}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                        <span className="text-blue-600 dark:text-blue-300 text-xs font-semibold">
                            {comment.numberOfLikes} {comment.numberOfLikes === 1 ? "like" : "likes"}
                        </span>
                    </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
                    {comment.content}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                        className={`flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 ${
                            isLiked 
                                ? 'text-red-500 dark:text-red-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                        }`}
                        type="button"
                        onClick={() => onLike(comment._id)}
                    >
                        {isLiked ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
                        <span className="font-medium">{isLiked ? 'Liked' : 'Like'}</span>
                    </button>
                    <span className="text-gray-400 dark:text-gray-500 text-sm">
                        {moment(comment.createdAt).format('MMMM D, YYYY [at] h:mm A')}
                    </span>
                </div>
            </div>
        </div>
    );
}