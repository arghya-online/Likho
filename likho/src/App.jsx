import React,{ useState, useEffect } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
     if (userData) {
        dispatch(login({userData}))
     }
     else {
       dispatch(logout())
     }
    })
    .catch((error) => {
    console.error("Failed to fetch user:", error)
  })
    .finally (() => setLoading(false))
  }, [])

// This App component starts with a loading state set to true.
// useEffect runs only once when the component first loads.
// Inside it, we check if a user is already logged in using authService.getCurrentUser().
// If user data is found, we dispatch login() to save that user in the Redux store.
// If no user is found, we dispatch logout() to clear any old data.
// After this check finishes (whether success or not), loading is set to false.
// Finally, the component renders a heading "Likho" on the screen.

  return (
    <>
       <div className="min-h-screen flex flex-wrap content-between bg-black text-white">
        <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>          
       </div>
    </>
  )
}

export default App
