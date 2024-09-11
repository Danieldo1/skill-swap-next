'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EmailSignUpForm from '@/components/auth/EmailSignUp';
import SignUpChoice from '@/components/auth/SignUpChoice';

export default function Register() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleEmailChoice = () => {
    setShowEmailForm(true);
  };

  const handleSignUp = async ({ name, email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      // If signup is successful, create a profile for the user
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: data.user.id, name, email });

        if (profileError) throw profileError;
      }

      alert('Check your email for the confirmation link!');
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      alert('Error with Google sign up: ' + error.message);
    }
  };

  return (
    <div>
      {showEmailForm ? (
        <EmailSignUpForm onSubmit={handleSignUp} onGoogleSignUp={handleGoogleSignUp} />
      ) : (
        <SignUpChoice onEmailChoice={handleEmailChoice} onGoogleSignUp={handleGoogleSignUp} />
      )}
    </div>
  );
}