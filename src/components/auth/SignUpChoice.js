import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpChoice({ onEmailChoice, onGoogleSignUp }) {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
      <p className="text-gray-600 mb-6 text-center">Let's get started with your 30 days free trial</p>
      
      <button 
        onClick={onGoogleSignUp}
      className="w-full mb-4 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 hover:bg-gray-50">
        <FcGoogle className="mr-2" size={20} />
        Sign up with Google
      </button>
      
      <button 
        onClick={onEmailChoice}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Sign up with Email
      </button>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
      </p>
      
      <p className="mt-4 text-xs text-center text-gray-500">
        By signing up to create an account I accept Company's{' '}
        <a href="#" className="text-blue-600 hover:underline">Terms of Use and Privacy Policy</a>.
      </p>
    </div>
  );
}