import { useEffect, useState } from "react";
import moment from 'moment'
export default function Comment({ comment }) {
    const [user, setUser] = useState({});
    console.log(user);

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

        getUsers(); // Call the function inside the useEffect
    }, [comment]); // Dependency array

    return (
        <div className="flex p-4 border-b dark:gray-600 dark:border-gray-700 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img  className="h-10 w-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username}/> 
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate dark:text-gray-400">{user ? `@${user.username}` : 'anonymous user'}</span>
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                <div>
                    <p className="text-gray-500 mb-2 dark:text-gray-200">{comment.content}</p>
                </div>
            </div>
        </div>
    );
}
