import React from 'react'
import {Link}from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-2 text-white">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="text-xl font-bold">Task </Link>
      <div>
        
            <Link to="/tasks" className="mr-4">Tasks</Link>
            <button >Logout</button>
        
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
         
      </div>
    </div>
  </nav>
  )
}

export default Navbar;