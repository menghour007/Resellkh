"use client"; // Add this at the top

import './globals.css';
import { Poppins } from "next/font/google";
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import TokenStorage from '@/components/TokenStorage';
import ErrorBoundary from '@/components/ErrorBoundary';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <BookmarkProvider>
              <Toaster position="right-bottom" />
              <TokenStorage />
              {children}
            </BookmarkProvider>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}