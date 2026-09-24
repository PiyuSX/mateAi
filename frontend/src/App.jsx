import React from 'react'
import { auth, googleProvider } from '../utils/firebase' 
import { signInWithPopup } from 'firebase/auth'
import api from '../utils/axios'


const handleLogin = async (token) => {
  try {
    const {data} = await api.post("/auth/login", {token})
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

const googleLogin = async () => {
  const data = await signInWithPopup(auth , googleProvider)
  console.log(data)
  const token = await data.user.getIdToken()
  handleLogin(token)
  console.log(token)
}


const App = () => {
  return (
    <div>
      <button className='border-2 p-4' onClick={googleLogin}>
        Continue with Google
      </button>
    </div>
  )
}

export default App

