import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar className="border-b-2">
      <Link to='/' className="self-center whitespace-nowrap text-sm sm:xl font-semibold dark:text-white">
        <span className='px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg text-lg font-bold'>
          Roca
        </span>
        Blog
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
      <div className="flex items-center gap-2 md:order-2">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
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
        <Button className="w-12 h-10" color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue'>
            Sign In
          </Button>
        </Link>
      </div>
    </Navbar>
  );
}
