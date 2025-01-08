import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import Home from './pages/home/Home'
import Footer from './components/Footer'

function App() {
  return <>
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    <Footer/>
    </>
}

export default App