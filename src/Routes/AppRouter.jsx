

import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const AppRouter = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
         
      {/* <Route path="/" element={<Navbar />} /> */}


      {/* <Route path="/" element={<HomePage />} /> */}
      {/* <Route path="/tasks" element={<TasksPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> */}
    </Routes>
  </Router>
  )
}

export default AppRouter