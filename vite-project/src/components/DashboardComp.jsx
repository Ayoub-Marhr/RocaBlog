import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch('/api/user/getusers?limit=5'),
        fetch('/api/post/getposts?limit=5'),
        fetch('/api/comment/getcomments?limit=5'),
      ]);
      const [usersData, postsData, commentsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
        commentsRes.json(),
      ]);
      if (usersRes.ok && postsRes.ok && commentsRes.ok) {
        setUsers(usersData.users);
        setPosts(postsData.posts);
        setComments(commentsData.comments);
        setTotalUsers(usersData.totalUsers);
        setLastMonthUsers(usersData.lastMonthUsers);
        setTotalPosts(postsData.totalPosts);
        setLastMonthPosts(postsData.lastMonthPosts);
        setTotalComments(commentsData.totalComments);
        setLastMonthComments(commentsData.lastMonthComments);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser, fetchData]);

  return (
    <div className='p-6 md:mx-auto bg-gray-100 dark:bg-gray-900 min-h-screen'>
      {/* Grid Layout for Cards */}
      <div className='grid gap-6 md:grid-cols-3 grid-cols-1'>
        {/* Total Users Card */}
        <div className='flex flex-col p-6 bg-gradient-to-br from-blue-700 to-blue-900 text-white gap-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-xs uppercase font-semibold tracking-wide'>Total Users</h3>
              <p className='text-4xl font-extrabold'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='text-5xl p-3 bg-white text-blue-700 rounded-full shadow-md' />
          </div>
          <div className='flex items-center text-sm'>
            <span className='text-green-400 flex items-center font-semibold'>
              <HiArrowNarrowUp className='mr-1' />
              {lastMonthUsers}
            </span>
            <span className='text-gray-400 ml-2'>Last month</span>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className='flex flex-col p-6 bg-gradient-to-br from-teal-700 to-teal-900 text-white gap-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-xs uppercase font-semibold tracking-wide'>Total Comments</h3>
              <p className='text-4xl font-extrabold'>{totalComments}</p>
            </div>
            <HiAnnotation className='text-5xl p-3 bg-white text-teal-700 rounded-full shadow-md' />
          </div>
          <div className='flex items-center text-sm'>
            <span className='text-green-400 flex items-center font-semibold'>
              <HiArrowNarrowUp className='mr-1' />
              {lastMonthComments}
            </span>
            <span className='text-gray-400 ml-2'>Last month</span>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className='flex flex-col p-6 bg-gradient-to-br from-green-700 to-green-900 text-white gap-4 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-xs uppercase font-semibold tracking-wide'>Total Posts</h3>
              <p className='text-4xl font-extrabold'>{totalPosts}</p>
            </div>
            <HiDocumentText className='text-5xl p-3 bg-white text-green-700 rounded-full shadow-md' />
          </div>
          <div className='flex items-center text-sm'>
            <span className='text-green-400 flex items-center font-semibold'>
              <HiArrowNarrowUp className='mr-1' />
              {lastMonthPosts}
            </span>
            <span className='text-gray-400 ml-2'>Last month</span>
          </div>
        </div>
      </div>

      {/* Grid Layout for Tables */}
      <div className='grid gap-6 py-8 md:grid-cols-3 grid-cols-1'>
        {loading ? (
          <div className='flex justify-center items-center col-span-3'>
            <Spinner color='blue' size='lg' />
          </div>
        ) : (
          <>
            {/* Recent Users Table */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Recent Users</h2>
                <Button
                  gradientDuoTone="greenToBlue"
                  className="rounded-lg transition-transform duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-green-500 to-blue-500 border-none shadow-sm px-4 py-2">
                  <Link to='/dashboard?tab=users' className='text-sm font-semibold'>
                    All users
                  </Link>
                </Button>
              </div>
              <Table hoverable className='divide-y divide-gray-200 dark:divide-gray-700'>
                <Table.Head>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt='user'
                          className='w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover'
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Recent Comments Table */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Recent Comments</h2>
                <Button
                  gradientDuoTone="greenToBlue"
                  className="rounded-lg transition-transform duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-green-500 to-blue-500 border-none shadow-sm px-4 py-2">
                  <Link to='/dashboard?tab=comments' className='text-sm font-semibold'>
                    All comments
                  </Link>
                </Button>
              </div>
              <Table hoverable className='divide-y divide-gray-200 dark:divide-gray-700'>
                <Table.Head>
                  <Table.HeadCell>Comment Content</Table.HeadCell>
                  <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {comments.map((comment) => (
                    <Table.Row key={comment._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <Table.Cell className='line-clamp-2'>{comment.content}</Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Recent Posts Table */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Recent Posts</h2>
                <Button
                  gradientDuoTone="greenToBlue"
                  className="rounded-lg transition-transform duration-300 transform hover:scale-105 text-white bg-gradient-to-r from-green-500 to-blue-500 border-none shadow-sm px-4 py-2">
                  <Link to='/dashboard?tab=posts' className='text-sm font-semibold'>
                    All Posts
                  </Link>
                </Button>
              </div>
              <Table hoverable className='divide-y divide-gray-200 dark:divide-gray-700'>
                <Table.Head>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>Post Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {posts.map((post) => (
                    <Table.Row key={post._id} className='hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt='post'
                          className='w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700 object-cover'
                        />
                      </Table.Cell>
                      <Table.Cell>{post.title}</Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
