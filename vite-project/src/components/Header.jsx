import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import './Header.css'; 
import { useSelector } from "react-redux";
export default function Header() {
  const { pathname } = useLocation();
  const {currentUser} = useSelector(state=>state.user)

  return (
<Navbar className="border-b-2 bg-gradient-to-r from-blue-700 to-purple-700 text-gray-200 dark:text-gray-200 shadow-md rounded-b-xl">
<Link 
        to='/' 
        className='header-logo flex items-center space-x-3 p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 shadow-lg dark:shadow-2xl transform hover:scale-105 active:scale-95 animate-fade-in'
      >
        <span className='px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-md md:text-lg font-extrabold transition-transform duration-300 animate-fade-in'>
          Roca
        </span>
        <span className='text-black dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 font-semibold text-xs md:text-sm animate-fade-in'>
          Blog
        </span>
      </Link>

      <div className="flex flex-1 items-center justify-center mx-4">
        <form className="flex items-center w-full max-w-md animate-fade-in">
          <TextInput
            type="text"
            placeholder="Search..."
            className="w-full hidden lg:inline-block"
          />
          <Button className="w-12 h-10 ml-2 lg:hidden" color="gray">
            <AiOutlineSearch />
          </Button>
        </form>
      </div>

      <div className="flex items-center gap-4 md:gap-6 md:order-2">
        <Navbar.Toggle className="navbar-toggle animate-fade-in" />
        <Navbar.Collapse className="animate-fade-in">
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
            <Navbar.Link active={pathname === '/'} as='div'>
              <Link to='/' className='nav-link animate-fade-in text-white hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={pathname === '/about'} as='div'>
              <Link to='/about' className='nav-link animate-fade-in text-white hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={pathname === '/projects'} as='div'>
              <Link to='/projects' className='nav-link animate-fade-in text-white hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300'>Projects</Link>
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
        <Button className="w-10 h-10 mx-2 animate-fade-in bg-gradient-to-r from-blue-600 to-purple-600 text-white" color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser?(
          <Dropdown 
          arrowIcon={false}
          inline
          label={
            <Avatar
            alt="user"
            img={currentUser.profilePicture}
            rounded/>
          }>
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown.Header>

          </Dropdown>
        ):(
           <Link to='/sign-in'>
           <Button gradientDuoTone='purpleToBlue' outline className='animate-fade-in'>
             Sign In
           </Button>
         </Link>
        )}
       
      </div>
    </Navbar>
  );
}
