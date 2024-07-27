import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
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

    if (!formData.username || !formData.email || !formData.password || !formData.department || !formData.job) {
      return setErrorMessage('Please fill out all fields!');
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/auth/signup', {
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
        return setErrorMessage(data.message || 'An error occurred during signup');
      }

      setSuccessMessage('Signup successful!');
      setFormData({});
      navigate('/sign-in');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username"/>
              <TextInput type="text" placeholder="username" id="username" onChange={handleOnChange}/>
            </div>
            <div>
              <Label value="Your email"/>
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleOnChange}/>
            </div>
            <div className="relative">
              <Label value="Your password"/>
              <TextInput 
                type={showPassword ? "text" : "password"} 
                placeholder="password" 
                id="password"
                onChange={handleOnChange}
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
            <div>
              <Label value="Your department"/>
              <TextInput type="text" placeholder="department" id="department" onChange={handleOnChange}/>
            </div>
            <div>
              <Label value="Your job"/>
              <TextInput type="text" placeholder="job" id="job" onChange={handleOnChange}/>
            </div>
            <Button
              style={{ 
                background: 'linear-gradient(to right, #1E3A8A, #6D28D9)', 
                color: '#FFFFFF' 
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className="gap-3 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500"> Sign in</Link>
          </div>
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
