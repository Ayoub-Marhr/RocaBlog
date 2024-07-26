import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* Navigation Link */}
        <div className="flex-1">
          <Link 
            to='/' 
            className='flex items-center space-x-4 p-3 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 shadow-lg dark:shadow-2xl transform hover:scale-105 active:scale-95 text-4xl'
          >
            <span className='px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-lg md:text-xl font-extrabold transition-transform duration-300'>
              Roca
            </span>
            <span className='text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300 font-semibold text-sm md:text-base'>
              Blog 
            </span>
          </Link>
          <p className='text-sm mt-5 px-4'>
            Explicabo labore voluptatum! Cupiditate temporibus soluta ab magnam.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username"/>
              <TextInput type="text" placeholder="username" id="username"/>
            </div>
            <div>
              <Label value="Your email"/>
              <TextInput type="email" placeholder="name@company.com" id="email"/>
            </div>
            <div>
              <Label value="Your password"/>
              <TextInput type="password" placeholder="password" id="password"/>
            </div>
            <div>
              <Label value="Your department"/>
              <TextInput type="text" placeholder="department" id="department"/>
            </div>
            <div>
              <Label value="Your job"/>
              <TextInput type="text" placeholder="job" id="job"/>
            </div>
            <Button
  style={{ 
    background: 'linear-gradient(to right, #1E3A8A, #6D28D9)', 
    color: '#FFFFFF' 
  }}
  type="submit"
>
  Sign Up
</Button>
          </form>
          <div className="gap-3 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500"> Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
