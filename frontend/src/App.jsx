import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";
import Watch from "./pages/Watch";
import SearchIn from "./pages/SearchIn";
import HistoryIn from "./pages/HistoryIn";
import NotFound from "./pages/NotFound";

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
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <Watch /> : <Navigate to={"/login"} />}
        />
        <Route path="/search" element={user ? <SearchIn /> : <Navigate to={"/login"} />}/>
        <Route path="/history" element={user ? <HistoryIn /> : <Navigate to={"/login"} />}/>
        <Route path='/*' element={<NotFound />} />

      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
