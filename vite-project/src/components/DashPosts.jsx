import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { XCircle } from 'react-feather';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
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
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPost((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto p-3 md:mx-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {loading ? (
        <div className="text-center py-10">
          <svg className="animate-spin h-10 w-10 mx-auto text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0"></path>
          </svg>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      ) : (
        <>
          {currentUser?.isAdmin && userPost.length > 0 ? (
            <Table hoverable className="w-full shadow-lg rounded-lg bg-gray-100 dark:bg-gray-900">
              <Table.Head className=" text-black text-center bg-gray-600">
                <Table.HeadCell className="bg-gray-300">Date Updated</Table.HeadCell>
                <Table.HeadCell  className="bg-gray-300">Post Image</Table.HeadCell>
                <Table.HeadCell  className="bg-gray-300">Post Title</Table.HeadCell>
                <Table.HeadCell  className="bg-gray-300">Category</Table.HeadCell>
                <Table.HeadCell  className="bg-gray-300">Delete</Table.HeadCell>
                <Table.HeadCell  className="bg-gray-300">Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
                {userPost.map((post) => (
                  <Table.Row key={post._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Table.Cell className="text-sm md:text-base">{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${formatTitleForURL(post.slug)}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-24 h-16 object-cover rounded-md border border-gray-300 dark:border-gray-600 shadow-md"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-gray-100">{post.title}</Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/update-post/${post._id}`}
                        className="text-teal-500 hover:text-teal-700 cursor-pointer transition-colors"
                      >
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
            className="text-teal-500 text-lg hover:underline p-7 w-full"
            onClick={handleShowMore}
            >
              Show more
            </button>
          )}
          <Modal show={showModal} onClose={() => setShowModal(false)} size="md" className="transition-all duration-300 ease-in-out transform">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Post Deletion</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="p-8 text-center">
                <XCircle size={48} className="mx-auto text-red-500 mb-6" />
                <h3 className="text-lg text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this post? This action cannot be undone.
                </h3>
              </div>
              <div className="flex justify-center gap-4 p-6">
                <Button
                  color="failure"
                  onClick={handleDeletePost}
                >
                  Yes, I'm sure
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  color="gray"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}