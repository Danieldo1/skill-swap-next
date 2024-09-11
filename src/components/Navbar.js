"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Squeeze as Hamburger } from "hamburger-react";
import { Recycle } from "lucide-react";
import { Button } from "./ui/button";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        
        const { data: { user }, error } = await supabase.auth.getUser()

        console.log('Fetched user:', user)
        if (error) throw error
        if (user) {
          let profile
          try {
            const { data, error: profileError } = await supabase
              .from('profiles')
              .select('name')
              .eq('id', user.id)
              .single()
            
            if (profileError) throw profileError
            profile = data
          } catch (profileError) {
           
            const { data, error: insertError } = await supabase
              .from('profiles')
              .insert({ id: user.id, name: user.user_metadata.full_name || user.email, email: user.email })
              .single()
            
            if (insertError) throw insertError
            profile = data
          }

          setUser({ ...user, name: profile?.name || user.user_metadata.full_name || user.email })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()


    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
     
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
     
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    // Apply blur to main content when menu is open
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      if (isOpen) {
        mainContent.classList.add("blur-sm");
      } else {
        mainContent.classList.remove("blur-sm");
      }
    }

    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  
  useEffect(() => {
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
      setIsOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>  // Or any loading indicator you prefer
  }


 
  const NavLinks = ({ mobile = false }) => (
    <div className={mobile ? 'flex flex-col justify-between h-full space-y-4' : 'flex space-x-4'}>
      <div className={mobile ? '' : 'flex space-x-4 justify-center items-center'}>
        <Link href="/" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>Home</Link>
        {user && <Link href="/profile" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>Profile</Link>}
        {user && user.email && (
          <>
            <span className="text-gray-700">{user.name || user.email}</span>
            <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900">Logout</button>
          </>
        )}
      </div>
      {!user && mobile && (
        <div className="flex flex-col w-full space-y-4">
          <Button variant='default' className="" onClick={() => setIsOpen(false)}><Link href="/login">Login</Link></Button>
          <Button variant='outline' onClick={() => setIsOpen(false)}><Link href="/register">Register</Link></Button>
        </div>
      )}
      {!user && !mobile && (
        <>
          <Button variant='default' className="" onClick={() => setIsOpen(false)}><Link href="/login">Login</Link></Button>
          <Button variant='outline' onClick={() => setIsOpen(false)}><Link href="/register">Register</Link></Button>
        </>
      )}
    </div>
  );
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center text-3xl font-bold md:text-xl">
              <Recycle className="size-8 md:size-6 mr-1 " />
              SkillSwap
            </Link>
          </div>
  
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="z-50 fixed top-2 right-4">
              <Hamburger 
                toggled={isOpen} 
                toggle={() => setIsOpen(!isOpen)} 
                color="black" 
                size={24} 
                hideOutline 
                className="cursor-pointer"
              />
            </div>
          </div>
  
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <NavLinks />
          </div>
        </div>
      </div>
  
      {/* Custom sliding menu */}
      <div 
        className={`fixed inset-y-0 right-0 w-[70%] sm:w-[385px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-between h-full p-6 pt-20">
          <NavLinks mobile />
        </div>
      </div>
  
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
