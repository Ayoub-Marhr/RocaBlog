import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields!');
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || `HTTP error! status: ${res.status}`;
        return setErrorMessage(errorMessage);
      }

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message || 'An error occurred during sign in');
      }

      setSuccessMessage('Sign in successful!');
      setFormData({ email: '', password: '' });
      navigate('/home'); // Redirect to a home page or dashboard
    } catch (error) {
      console.error('Sign in failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 p-6'>
      <div className='flex flex-col md:flex-row max-w-5xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
        {/* Navigation Link */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-800 rounded-l-xl space-y-6">
          <Link 
            className='header-logo flex flex-col items-center space-y-4 p-8 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 shadow-2xl dark:shadow-2xl transform hover:scale-110 active:scale-95 animate-fade-in'
          >
            <span className='px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full text-2xl md:text-3xl font-extrabold transition-transform duration-300 animate-fade-in border-2 border-transparent hover:border-blue-400'>
              Roca
            </span>
            <span className='text-black dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 font-semibold text-xl md:text-2xl animate-fade-in'>
              Blog
            </span>
          </Link>
          <div className='relative max-w-3xl mx-auto p-8 bg-gray-50 dark:bg-gray-900'>
            <p className='text-lg md:text-xl font-serif text-gray-800 dark:text-gray-200 text-justify leading-relaxed px-10 py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl relative overflow-hidden'
               style={{ 
                 boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.1), 0 20px 40px rgba(0, 0, 0, 0.1)' 
               }}>
              <span className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full'></span>
              <span className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 to-gray-100 rounded-full'></span>
              <span className='absolute inset-0 border-t border-dashed border-gray-300 dark:border-gray-700'></span>
              
              <span className='block text-gray-600 dark:text-gray-400 text-sm italic mb-4 absolute left-0 top-6 transform -translate-x-6'>
                “
              </span>
              <span className='block text-gray-600 dark:text-gray-400 text-sm italic mb-4 absolute right-0 top-6 transform translate-x-6'>
                ”
              </span>
              
              <span className='relative z-10'>
                Explicabo labore voluptatum! Cupiditate temporibus soluta ab magnam.
              </span>
            </p>
          </div>
        </div>
        {/* Sign In Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-gray-900 rounded-r-xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Label value="Your email" className="font-semibold text-gray-700 dark:text-gray-300"/>
              <TextInput 
                type="email" 
                placeholder="name@company.com" 
                id="email" 
                onChange={handleOnChange} 
                value={formData.email}
                className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              />
            </div>
            <div className="relative flex flex-col gap-3">
              <Label value="Your password" className="font-semibold text-gray-700 dark:text-gray-300"/>
              <TextInput 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                id="password"
                onChange={handleOnChange}
                value={formData.password}
                className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-xl text-gray-600 dark:text-gray-300"/>
                ) : (
                  <AiOutlineEye className="text-xl text-gray-600 dark:text-gray-300"/>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Button
                style={{ 
                  background: 'linear-gradient(to right, #1E3A8A, #6D28D9)', 
                  color: '#FFFFFF' 
                }}
                type="submit"
                disabled={loading}
                className="w-full md:w-auto py-2 text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2 justify-end w-full md:w-auto">
                <span> Don't have an account?</span>
                <Link to='/sign-up' className="text-blue-500 hover:underline"> Sign up</Link>
              </div>
            </div>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-5" color='success'>
              {successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
