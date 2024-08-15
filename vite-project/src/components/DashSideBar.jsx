import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex ${isSidebarOpen ? 'flex-row' : 'flex-col'}`}>
      <Sidebar className={`transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-gray-800 to-gray-900 text-white`}>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-2 p-4'>
            <Link to='/dashboard?tab=profile'>
              <div className={`flex items-center p-3 rounded-lg transition-transform duration-300 ease-in-out transform ${tab === 'profile' ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-blue-700 dark:text-white'} hover:scale-110`}>
                <HiUser className={`w-6 h-6 ${tab === 'profile' ? 'text-white' : 'text-black dark:text-white'}`} />
                <div className="ml-3 flex items-center justify-between w-full">
                  <span className={`text-lg font-medium ${tab === 'profile' ? 'text-white' : 'text-black dark:text-white'}`}>Profile</span>
                  <label className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full border ${tab === 'profile' ? 'bg-yellow-400 text-gray-800 border-yellow-500' : 'bg-gray-200 text-gray-600 border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600'}`}>
                    {currentUser.isAdmin ? 'RocaUser' : 'User'}
                  </label>
                </div>
              </div>
            </Link>

            {currentUser.isAdmin && (
              <>
                <Link to='/dashboard?tab=dashboard'>
                  <div className={`flex items-center p-3 rounded-lg transition-transform duration-300 ease-in-out transform ${tab === 'dashboard' || !tab ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-blue-700 dark:text-white'} hover:scale-110`}>
                    <HiChartPie className={`w-6 h-6 ${tab === 'dashboard' || !tab ? 'text-blue-400' : 'text-blue-700  dark:text-blue-400'}`} />
                    <span className={`ml-3 ${tab === 'dashboard' || !tab ? 'text-white' : 'text-black dark:text-white'}`}>Dashboard</span>
                  </div>
                </Link>

                <Link to='/dashboard?tab=posts'>
                  <div className={`flex items-center p-3 rounded-lg transition-transform duration-300 ease-in-out transform ${tab === 'posts' ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-blue-700 dark:text-white'} hover:scale-110`}>
                    <HiDocumentText className={`w-6 h-6 ${tab === 'posts' ? 'text-green-400' : 'text-green-700 dark:text-green-400'}`} />
                    <span className={`ml-3 ${tab === 'posts' ? 'text-white' : 'text-black dark:text-white'}`}>Posts</span>
                  </div>
                </Link>

                <Link to='/dashboard?tab=users'>
                  <div className={`flex items-center p-3 rounded-lg transition-transform duration-300 ease-in-out transform ${tab === 'users' ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-blue-700 dark:text-white'} hover:scale-110`}>
                    <HiOutlineUserGroup className={`w-6 h-6 ${tab === 'users' ? 'text-white' : 'text-black dark:text-white'}`} />
                    <span className={`ml-3 ${tab === 'users' ? 'text-white' : 'text-black dark:text-white'}`}>Users</span>
                  </div>
                </Link>

                <Link to='/dashboard?tab=comments'>
                  <div className={`flex items-center p-3 rounded-lg transition-transform duration-300 ease-in-out transform ${tab === 'comments' ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-blue-700 dark:text-white'} hover:scale-110`}>
                    <HiAnnotation className={`w-6 h-6 ${tab === 'comments' ? 'text-gray-400' : 'text-gray-700 dark:text-white'}`} />
                    <span className={`ml-3 ${tab === 'comments' ? 'text-white' : 'text-black dark:text-white'}`}>Comments</span>
                  </div>
                </Link>
              </>
            )}

            <div
              className="flex items-center p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-red-600 text-black hover:text-white dark:text-white"
              onClick={handleSignout}
            >
              <HiArrowSmRight className="w-6 h-6 text-black hover:text-white dark:text-white" />
              <span className="ml-3 dark:text-white">Sign Out</span>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <button
        onClick={toggleSidebar}
        className={`md:hidden p-4 bg-gray-700 text-white flex items-center justify-center transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}
      >
        {isSidebarOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
