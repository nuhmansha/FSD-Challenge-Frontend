

import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import SignupPage from '../Pages/SignupPage';
import LoginPage from '../Pages/LoginPage';

const AppRouter = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
         
      {/* <Route path="/" element={<Navbar />} /> */}


      {/* <Route path="/" element={<HomePage />} /> */}
      {/* <Route path="/tasks" element={<TasksPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  </Router>
  )
}

export default AppRouter