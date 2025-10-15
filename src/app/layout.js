// app/layout.js
'use client';
import { useEffect } from 'react';
import { initSmoothScroll } from '../components/utils/smooth-scroll';
import "./globals.css";
import Navigation from '@/components/ui/Navigation';
import PageLoader from '@/components/ui/PageLoader';
import Footer from '@/components/ui/Footer';

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lenis = initSmoothScroll();
      return () => lenis?.destroy();
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <PageLoader/>
        <Navigation/>
        <Footer/>
      </body>
    </html>
  );
}
