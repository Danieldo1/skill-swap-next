import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { signup } from '@/app/(auth)/register/actions';
import { useRouter } from 'next/navigation';

export default function EmailSignUpForm({ onSubmit, onGoogleSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      await signup(formData);
      // If successful, the action will handle the redirect
      router.push("/confirm-email");
    } catch (error) {
      setError('An error occurred during sign up. Please try again.');
      console.error('Sign up error:', error);
    }
  };



  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
      <p className="text-gray-600 mb-6 text-center">Let's get started with your 30 days free trial</p>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
      </p>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">or</span>
      </div>
      
      <button 
        onClick={onGoogleSignUp}
      className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50">
        <FcGoogle className="mr-2" size={20} />
        Sign up with Google
      </button>
      
      <p className="mt-4 text-xs text-center text-gray-500">
        By signing up to create an account I accept Company's{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Use and Privacy Policy</a>.
      </p>
    </div>
  );
}