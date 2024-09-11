'use client'

import { useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { login, signup } from './actions'

export default function Login() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      alert('Error with Google sign in: ' + error.message);
    }
  };


  const LoginChoice = () => (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Log In</h2>
      <p className="text-gray-600 mb-6 text-center">Welcome back! Please login to your account.</p>
      
      <button 
        onClick={handleGoogleLogin}
      className="w-full mb-4 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50">
        <FcGoogle className="mr-2" size={20} />
        Log in with Google
      </button>
      
      <button 
        onClick={() => setShowEmailForm(true)}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Log in with Email
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  );

  const EmailLoginForm = () => (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Log In</h2>
      <p className="text-gray-600 mb-6 text-center">Welcome back! Please login to your account.</p>
      
      <form 
      // onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
        formAction={login}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">or</span>
      </div>
      
      <button 
        onClick={handleGoogleLogin}
      className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50">
        <FcGoogle className="mr-2" size={20} />
        Log in with Google
      </button>
    </div>
  );

  return (
    <div>
      {showEmailForm ? <EmailLoginForm /> : <LoginChoice />}
    </div>
  );
}