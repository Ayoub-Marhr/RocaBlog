import { Footer } from 'flowbite-react';
import { FaPinterestP, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function FooterComp() {
  return (
    <Footer className='bg-gray-900 dark:bg-gray-900 text-gray-200 dark:text-gray-200 border-t-4 border-gradient-to-r from-blue-700 to-purple-700 rounded-t-xl'>
      <div className='container mx-auto px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          <div className='flex flex-col items-center animate-fade-in'>
            <Footer.Title title='About Us' className='text-xl font-semibold mb-5 text-blue-500 dark:text-blue-400' />
            <Footer.LinkGroup col className='flex flex-col items-center'>
              <Footer.Link 
                href='https://www.roca.co.ma/' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Our Web Site'
              >
                Our Web Site
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/a-propos-de-roca/les-filiales-de-roca-dans-le-monde/les-bureaux-roca-en-marroc' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Location'
              >
                Location
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/produits' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Products'
              >
                Products
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/collections' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Collections'
              >
                Collections
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/produits/telechargements' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Brochures Downloads'
              >
                Brochures Downloads
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/zone-professionelle/catalogue-pieces-de-rechange' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Spare Parts Catalogue'
              >
                Spare Parts Catalogue
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          
          <div className='flex flex-col items-center animate-fade-in'>
            <Footer.Title title='Customer Service' className='text-xl font-semibold mb-5 text-blue-500 dark:text-blue-400' />
            <Footer.LinkGroup col className='flex flex-col items-center'>
              <Footer.Link 
                href='https://www.roca.co.ma/service-client' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Customer Service'
              >
                Customer Service
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/service-client/contact' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Contact Form'
              >
                Contact Form
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className='flex flex-col items-center animate-fade-in'>
            <Footer.Title title='Roca' className='text-xl font-semibold mb-5 text-blue-500 dark:text-blue-400' />
            <Footer.LinkGroup col className='flex flex-col items-center'>
              <Footer.Link 
                href='https://www.roca.co.ma/rocalife' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Roca Life'
              >
                Roca Life
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/zone-professionnelle' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Professional Zone'
              >
                Professional Zone
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/galeries' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Galleries'
              >
                Galleries
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/points-de-vente' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Sales Points'
              >
                Sales Points
              </Footer.Link>
              <Footer.Link 
                href='https://www.roca.co.ma/fournisseurs' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='footer-link mb-2'
                aria-label='Suppliers'
              >
                Suppliers
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        
        <div className='flex justify-center mt-10 space-x-8'>
          <a 
            href='https://www.pinterest.com/rocalife/' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='social-icon text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
            aria-label='Pinterest'
          >
            <FaPinterestP />
          </a>
          <a 
            href='https://www.instagram.com/roca_morocco/' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='social-icon text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300'
            aria-label='Instagram'
          >
            <FaInstagram />
          </a>
          <a 
            href='https://web.facebook.com/RocaMorocco/?brand_redir=127341427337867&_rdc=1&_rdr' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='social-icon text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
            aria-label='Facebook'
          >
            <FaFacebookF />
          </a>
          <a 
            href='https://www.youtube.com/roca' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='social-icon text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
            aria-label='YouTube'
          >
            <FaYoutube />
          </a>
        </div>

        <div className='text-center mt-8 text-sm text-gray-400 dark:text-gray-400'>
          &copy; {new Date().getFullYear()} Roca. All rights reserved.
        </div>
      </div>
    </Footer>
  );
}
