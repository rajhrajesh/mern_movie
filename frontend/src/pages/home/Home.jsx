import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";

function Home() {
  const { user } = useAuthStore();
  console.log("hello", user)

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>
}

export default Home;
