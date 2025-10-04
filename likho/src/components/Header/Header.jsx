import React from 'react'
import {Container, Logoutbtn} from '../index.js'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


// --- Main Header Component ---
function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

  const navItems = [
    { 
        name: 'Home', 
        slug: "/", 
        active: true 
    }, 
    { 
        name: "Login", 
        slug: "/login", 
        active: !authStatus 
    },
    { 
        name: "Signup", 
        slug: "/signup", 
        active: !authStatus 
    },
    { 
        name: "All Posts", 
        slug: "/all-posts", 
        active: authStatus 
    },
    { 
        name: "Add Post", 
        slug: "/add-post", 
        active: authStatus 
    },
  ];

  return (
    <header className='py-4 shadow-lg bg-slate-900 border-b-2 border-b-teal-500/40 sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            {/* The link component is commented out to avoid errors without a Router */}
            {/* <Link to='/'> */}
              <img src={Logo} alt='Likho Logo' className='h-10 w-auto cursor-pointer' onClick={() => navigate('/')} />
            {}
          </div>
          <ul className='flex items-center ml-auto gap-x-2'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-5 py-2 transition-colors duration-300 ease-in-out text-gray-300 font-medium hover:bg-teal-500/10 hover:text-white rounded-full'
                  >
                    {item.name}
                  </button> 
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}


// Default export of the main App component for rendering.
export default function App() {
    return (
        <div className="bg-slate-800 h-screen">
             <Header />
        </div>
    );
}
