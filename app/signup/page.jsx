"use client"

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSignUp = async () => {
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return; // Prevent sign up if there are errors or empty fields
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');

      if (res) {
        router.push('/');
      }
      else {
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      toast.error('Failed to sign up. Please try again.', {
        autoClose: 3000,
      });
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="p-10 rounded-lg shadow-xl w-full max-w-md mx-auto bg-white">
        <h1 className="text-2xl mb-5">Join us now</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none placeholder-gray-500"
        />
        {confirmPasswordError && (
          <p className="text-red-500">{confirmPasswordError}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-100 rounded outline-none placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          disabled={
            emailError ||
            passwordError ||
            confirmPasswordError ||
            !email ||
            !password ||
            !confirmPassword
          }
          className={`w-full p-3 rounded text-white ${
            emailError ||
            passwordError ||
            confirmPasswordError ||
            !email ||
            !password ||
            !confirmPassword
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          Sign Up
        </button>

        <div className="text-center mt-4 text-gray-700">
          Already a member?{' '}
          <a className="text-indigo-700" href="/signin">
            Login now
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
