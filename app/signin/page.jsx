'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import {useAuthState} from 'react-firebase-hooks/auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  
  const [user] = useAuthState(auth);

  if (user ){
    router.push('/')
  }


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes('@')) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignIn = async () => {
    if (emailError || passwordError || !email || !password) {
      return; // Prevent sign in if there are errors or empty fields
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      if (res) {
        router.push('/');
      }
      else {
        throw new Error('Failed to sign in');
      }
    } catch (error) {
      toast.error('Failed to sign in. Please check your credentials.', {
        autoClose: 3000,
      });
      console.error('Failed to sign in:', error);
    }
  };


  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-10 rounded-lg shadow-xl w-full max-w-md mx-auto bg-white">
        <h1 className="text-2xl mb-5 text-center">Welcome Back</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none placeholder-gray-500"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none placeholder-gray-500"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          onClick={handleSignIn}
          disabled={emailError || passwordError || !email || !password}
          className={`w-full p-3 rounded text-white ${
            emailError || passwordError || !email || !password
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          Sign In
        </button>

        <div className="text-center mt-4 text-gray-700">
          Don't have an account? <a className='text-indigo-700' href="/signup">Create One</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;