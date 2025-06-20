// 'use client';
// import { useEffect, useState } from 'react';
// import AuthNavbar from '@/components/layout/AuthNavbar';
// import GuestNavbar from '@/components/layout/GuestNavbar';
// import Footer from '@/components/layout/Footer';

// export default function ClientLayout({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   if (isLoggedIn === null) return null;

//   return (
//     <>
//       {/* {isLoggedIn ? <AuthNavbar /> : <GuestNavbar />  } */}
//       {children}<Footer />
//     </>
//   );
// }
