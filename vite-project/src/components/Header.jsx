import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar className="border-b-2">
   <Link 
  to='/' 
  className='flex items-center space-x-3 p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 shadow-lg dark:shadow-2xl transform hover:scale-105 active:scale-95'
>
  <span className='px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-md md:text-lg font-extrabold transition-transform duration-300'>
    Roca
  </span>
  <span className='text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300 font-semibold text-xs md:text-sm'>
    Blog
  </span>
</Link>

      <div className="flex flex-1 items-center justify-center mx-4">
        <form className="flex items-center w-full max-w-md">
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
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
            <Navbar.Link active={pathname === '/'} as='div'>
              <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={pathname === '/about'} as='div'>
              <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={pathname === '/projects'} as='div'>
              <Link to='/projects'>Projects</Link>
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
        <Button className="w-10 h-10 mx-2" color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}
