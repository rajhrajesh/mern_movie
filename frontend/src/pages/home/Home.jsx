import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

function Home() {
  const user = null;
  return (
    <div className=''>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default Home