// components/PageLoader.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef();
  const logoRef = useRef();
  const percentageRef = useRef();

  useEffect(() => {
    // Add class to body to hide all content except loader
    document.body.classList.add('page-loading');
    document.body.classList.add('react-loaded');

    const isClientNavigation = sessionStorage.getItem('clientNavigation');

    if (isClientNavigation) {
      // Remove loading class and show page immediately
      document.body.classList.remove('page-loading');
      setLoading(false);
      sessionStorage.removeItem('clientNavigation');
      return;
    }

    // Show loader for page load/refresh
    startLoader();

  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('clientNavigation', 'true');
    };

    window.addEventListener('beforeunload', () => {
      sessionStorage.removeItem('clientNavigation');
    });

    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  const startLoader = () => {
    // Ensure DOM is ready
    requestAnimationFrame(() => {
      const tl = gsap.timeline();
      const progressObj = { value: 0 };

      // Set initial positions
      gsap.set([logoRef.current, percentageRef.current], {
        autoAlpha: 0
      });

      gsap.set(logoRef.current, { y: 30 });

      // Progress animation
      tl.to(progressObj, {
        value: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.floor(progressObj.value));
        }
      });

      // Percentage movement
      if (percentageRef.current) {
        tl.to(percentageRef.current, {
          bottom: `calc(100vh - 80px)`,
          duration: 3,
          ease: "power2.out"
        }, 0);
      }

      // Entrance animations
      tl.to(logoRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, 0.1);

      tl.to(percentageRef.current, {
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out"
      }, 0.6);

      // Handle completion
      tl.call(() => {
        setTimeout(() => {
          handleExit();
        }, 500);
      });
    });
  };

  const handleExit = () => {
    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          // Remove loading class to show page content
          document.body.classList.remove('page-loading');
          setLoading(false);
        }
      });
    }
  };

  if (!loading) return null;

  return (
    <div ref={loaderRef} className="page-loader">
      <div className="loader-content">
        <div ref={logoRef} className="logo-container">
          <Image
            src="/assets/navbar/loader.webp"
            alt="up&up group"
            width={500}
            height={120}
            priority
            className="logo-image"
          />
        </div>

        <div ref={percentageRef} className="progress-percentage">
          {progress}%
        </div>
      </div>

      <style jsx>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          max-width: 300px;
          height: auto;
          object-fit: contain;
        }

        .progress-percentage {
          position: fixed;
          right: 80px;
          bottom: 80px;
          font-size: 24px;
          font-weight: 300;
          color: white;
          font-family: 'Arial', sans-serif;
          letter-spacing: 1px;
          z-index: 10001;
        }

        @media (max-width: 768px) {
          .logo-image {
            max-width: 250px;
          }
          .progress-percentage {
            right: 60px;
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .logo-image {
            max-width: 200px;
          }
          .progress-percentage {
            right: 40px;
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default PageLoader;
