'use client';

import './globals.css';
import { Poppins } from "next/font/google";
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import TokenStorage from '@/components/TokenStorage';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        {/* Pass session prop for hydration */}
        <SessionProvider session={session}>
            <BookmarkProvider>
              <Toaster position="right-bottom" />
              <TokenStorage />
              {children}
            </BookmarkProvider>

        </SessionProvider>
      </body>
    </html>
  );
}
