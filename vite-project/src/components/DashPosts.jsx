import {  Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPost();
    }
  }, [currentUser?._id]);

  const formatTitleForURL = (title) => {
    return title
      .toLowerCase()           
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/^-+|-+$/g, '');   
  };

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]); // Spread the new posts
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overflow-x-auto p-3 md:mx-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {currentUser?.isAdmin && userPost.length > 0 ? (
        <Table hoverable className="w-full shadow-md">
          <Table.Head className="bg-gray-100 dark:bg-gray-700 text-center">
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell >Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ">
            {userPost.map((post) => (
              <Table.Row key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${formatTitleForURL(post.title)}`}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-20 h-10 object-cover rounded-sm border border-gray-300 dark:border-gray-600" 
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-gray-100">{post.title}</Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post.id}`} className="text-teal-500 hover:underline cursor-pointer">
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">You have no posts yet!</p>
      )}
      {showMore && (
        <button 
          className="w-full text-teal-500 self-center text-sm py-7" 
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
}
