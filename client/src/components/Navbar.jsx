import React, { useState } from 'react';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo-2.png';
import About from '../sections/About';
import Services from '../sections/Services';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {

  const {user, loginWithRedirect, isAuthenticated} = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleClick = (component) => {
    setCurrentComponent(component);
    setMenuOpen(false);

    // Scroll to the selected component
    const element = document.getElementById(component);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className='h-[15vh] flex justify-between md:px-8 px-2 items-center font-serif'>
        <div>
          <img src={logo} alt="" className='h-[10vh]'/>
        </div>
        <div>
          <div className='flex gap-8 items-center'>
            <div className='md:flex gap-8 items-center hidden'>
              <a href="/">Home</a>
              <a href="#" onClick={() => handleClick('about')}>About Us</a>
              <a href="#" onClick={() => handleClick('services')}>Services</a>
              <a href="/upload">Upload</a>
              {isAuthenticated ? 
              (
              <>
              <img src={user.picture} alt="" />
              <button onClick={()=> loginWithRedirect()}>Logout</button>
              </>
              ):(
                <button onClick={()=> loginWithRedirect()}>Login</button>
              )}
              
              
            </div>
            <button className='bg-primary px-2 py-1 md:hidden' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </div>
      <div className={`w-full h-[100vh] flex ${menuOpen ? 'fixed inset-0 z-10' : 'hidden'}`}>
        <div className='w-[20%] bg-primary h-full'>

        </div>
        <div className='w-[80%] bg-black h-[100vh] flex flex-col items-center gap-24'>
          <div className='flex w-full justify-between items-center px-4 h-[15vh]'>
            <img src={logo2} alt="" className='h-[10vh]'/>
            <button className='text-white' onClick={() => setMenuOpen(false)}>🗙</button>
            {currentComponent === 'about' && <About/>}
          {currentComponent === 'services' && <Services/>}
          </div>
          <div className='flex flex-col text-white items-start gap-4'>
            <div>
              <a href="/">Home</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="">About Us</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="">Services</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
            <div>
              <a href="/upload">Upload</a>
              <hr className="absolute left-[21vw] right-[1vw] border-white  my-2" />
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
}

export default Navbar;
