import {  Table,Modal,Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {  XCircle } from 'react-feather';
import {FaCheck,FaTimes} from 'react-icons/fa'
export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal,setShowModal]=useState(false)
  const [userIdToDelete,setUserIdToDelete]=useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id]);


  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]); // Spread the new posts
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser =()=>{

  }
 
  return (
    <div className="overflow-x-auto p-3 md:mx-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {currentUser?.isAdmin && users.length > 0 ? (
        <Table hoverable className="w-full shadow-md">
          <Table.Head className="bg-gray-100 dark:bg-gray-700 text-center ">
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell >Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 " >
            {users.map((user) => (
              <Table.Row key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                    <img 
                      src={user.profilePicture} 
                      alt={user.username} 
                      className="w-12 h-12 object-cover  border border-gray-300 dark:border-gray-600 rounded-full" 
                    />
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-gray-100">{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-600"/>) : (<FaTimes className='text-red-500'/>)} </Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setUserIdToDelete(user._id)
                  }}className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </Table.Cell>
               
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">You have no user yet!</p>
      )}
      {showMore && (
        <button 
          className="w-full text-teal-500 self-center text-sm py-7" 
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
       <Modal show={showModal} onClose={() => setShowModal(false)} size="md" className="transition-all duration-300 ease-in-out transform">
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h3 className="text-xl font-bold text-gray-900">User Deletion</h3>
      <button
        onClick={() => setShowModal(false)}
        className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
      >
        <XCircle size={24} />
      </button>
    </div>
    <div className="p-8">
      <div className="text-center">
        <XCircle size={48} className="mx-auto text-red-500 mb-6" />
        <h3 className="mb-5 text-lg text-gray-500">
          Are you sure you want to delete this user? This action cannot be undone.
        </h3>
      </div>
    </div>
    <div className="flex justify-center gap-4 p-6">
      <Button
        color="failure"
        onClick={handleDeleteUser}
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
    </div>
  );
}
