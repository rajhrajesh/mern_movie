import React, { useEffect } from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import Home from './pages/home/Home';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { Loader } from 'lucide-react';

function App() {
  const { user, isCheckIn, myprofile } = useAuthStore();

  useEffect(() => {
    myprofile();
  }, [myprofile]);
  

  if (isCheckIn) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"}/> }
        />
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to={"/"}/>}
        />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
