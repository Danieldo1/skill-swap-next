import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SkillSwap",
  description: "Swap your skills with others!",
};

export default async function RootLayout({ children }) {
  // const supabase = createServerComponentClient({ cookies })

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen bg-gray-100">
          <NavBar />
          {/* <header>{user ? 'Logged in' : 'Not logged in'}</header> */}
          <main className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
