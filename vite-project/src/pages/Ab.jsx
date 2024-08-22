import React from 'react';
import { FaPinterestP, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Ab() {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-black dark:text-white py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 opacity-0 translate-y-4 animate-[fadeIn_1s_ease-out_forwards]">
            About Roca Blog
          </h1>
          <p className="text-2xl text-gray-700 dark:text-indigo-400 max-w-3xl mx-auto opacity-0 translate-y-4 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            Exploring the frontiers of technology, one post at a time.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8 text-lg">
            {[
              "Welcome to Roca Blog! This platform is a nexus for tech enthusiasts, developers, financiers, and all curious minds alike.",
              "Here, we dive into the forefront of various fields, exploring the latest advancements, innovations, and evolving landscapes across different professions. Whether you're in technology, finance, or any other industry, we provide insights and updates that keep you at the cutting edge of your career.",
              'Our mission? To inspire, educate, and foster a vibrant community of learners and innovators.'
            ].map((text, index) => (
              <p
                key={index}
                className="bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-20 p-6 rounded-xl shadow-lg hover:bg-opacity-95 dark:hover:bg-opacity-30 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-8 rounded-2xl shadow-2xl transform hover:rotate-2 hover:scale-105 transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Some Products</h2>
            <ul className="space-y-4">
              {[
                'Washbasins & Furniture',
                'Toilets & Bidets',
                'Lavabos',
                'Accessoires'
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center bg-gray-200 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-40 p-4 rounded-lg hover:bg-opacity-95 dark:hover:bg-opacity-50 transition duration-300 ease-in-out"
                >
                  <svg
                    className="h-6 w-6 mr-3 text-green-400 dark:text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-lg text-gray-900 dark:text-white">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">Our Location</h2>
          <div className="relative  h-0 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 hover:rotate-1 transition duration-300 ease-in-out">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2037.6793960643904!2d-7.625955821556109!3d32.97653978027982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda6059cbaaaaaab%3A0x4dcad9062e24c73e!2sUsine%20Roca%20Maroc%20S.A.!5e0!3m2!1sfr!2sma!4v1723899037877!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>

        <footer className="text-center">
          <h3 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">Connect With Us</h3>
          <div className='flex justify-center mt-10 space-x-8'>
            <a 
              href='https://www.pinterest.com/rocalife/' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='social-icon text-4xl text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
              aria-label='Pinterest'
            >
              <FaPinterestP />
            </a>
            <a 
              href='https://www.instagram.com/roca_morocco/' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='social-icon text-4xl text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300'
              aria-label='Instagram'
            >
              <FaInstagram />
            </a>
            <a 
              href='https://web.facebook.com/RocaMorocco/?brand_redir=127341427337867&_rdc=1&_rdr' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='social-icon text-4xl text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
              aria-label='Facebook'
            >
              <FaFacebookF />
            </a>
            <a 
              href='https://www.youtube.com/roca' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='social-icon text-4xl text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
              aria-label='YouTube'
            >
              <FaYoutube />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
