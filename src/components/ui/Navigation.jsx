// components/ui/Navigation.jsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledNav, setIsScrolledNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const menuRef = useRef();
  const navItemsRef = useRef([]);
  const borderRef = useRef();
  const closeButtonRef = useRef();

  // Window resize and scroll detection effect
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(scrollPercent);
      setIsScrolledNav(scrollPercent >= 30);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP animations for menu
  useGSAP(() => {
    if (isMenuOpen) {
      // Slide up animation
      gsap.fromTo(menuRef.current,
        {
          y: '100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        }
      );

      // Stagger animation for nav items
      gsap.fromTo('.nav-item',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power3.out'
        }
      );
    } else {
      // Enhanced closing animation - Fast and smooth
      const closeTl = gsap.timeline();

      closeTl
        .to(menuRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.in'
        }, '-=0.2');
    }
  }, [isMenuOpen]);

  // Smooth border animation with extended width
  useEffect(() => {
    if (hoveredIndex >= 0 && navItemsRef.current[hoveredIndex] && borderRef.current) {
      const targetElement = navItemsRef.current[hoveredIndex];
      const rect = targetElement.getBoundingClientRect();
      const containerRect = targetElement.parentElement.getBoundingClientRect();

      gsap.to(borderRef.current, {
        top: rect.top - containerRect.top,
        left: (rect.left - containerRect.left) - 40,
        width: rect.width + 80,
        height: rect.height,
        duration: 0.4,
        ease: 'power3.out',
        opacity: 1
      });
    } else {
      gsap.to(borderRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [hoveredIndex]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (item, index) => {
    setHoveredItem(item.name);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredIndex(-1);
  };

  // Full navigation items for the menu
  const navItems = [
    { name: 'About Us', image: '/assets/navbar/about-hover.webp' },
    { name: 'Our Solutions', image: '/assets/navbar/solution-hover.webp' },
    { name: 'Our Work', image: '/assets/navbar/work-hover.webp' },
    { name: 'Thought', image: '/assets/navbar/thought-hover.webp' },
    { name: 'Join Us', image: '/assets/navbar/join-hover.webp' },
    { name: 'Contact Us', image: '/assets/navbar/contact-hover.webp' }
  ];

  // Shortened navigation items for the top bar
  const shortNavItems = [
    { name: 'About', fullName: 'About Us' },
    { name: 'Solutions', fullName: 'Our Solutions' },
    { name: 'Work', fullName: 'Our Work' },
    { name: 'Thought', fullName: 'Thought' }
  ];

  // Default image when no item is hovered
  const defaultImage = '/assets/hero-banner.webp';
  const currentImage = hoveredItem ? navItems.find(item => item.name === hoveredItem)?.image : defaultImage;

  // Check if it's tablet/mobile (below 1440px)
  const isTabletOrMobile = windowWidth < 1024;

  return (
    <>
      {/* Main Navigation Bar - Two Different States */}
      <nav className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isScrolledNav
          ? (isTabletOrMobile ? 'top-4 left-4 right-4' : 'top-8 left-8 right-8') // Scrolled state
          : (isTabletOrMobile ? 'bottom-4 left-4 right-4' : 'bottom-8 left-1/2 transform -translate-x-1/2') // Default state
      }`}>
        <div className={`bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 transition-all duration-500 rounded-[8px] px-6 py-3 ${
          isTabletOrMobile ? 'w-full' : (isScrolledNav ? 'w-full' : 'w-auto')
        }`}>
          <div className="flex items-center justify-between">

            {/* Left Side Content */}
            <div className="flex items-center">
              {isTabletOrMobile ? (
                // Tablet/Mobile: Show "Menu" text
                <div className="text-lg font-medium text-gray-800">
                  Menu
                </div>
              ) : (
                // Desktop: Show logo only when scrolled
                isScrolledNav && (
                  <div className="text-xl font-bold text-gray-800">
                    up&up
                  </div>
                )
              )}
            </div>

            {/* Desktop Navigation Items - Only show on desktop */}
            {!isTabletOrMobile && (
              <div className="hidden lg:flex items-center space-x-4">
                {isScrolledNav ? (
                  // Scrolled state - show short nav items
                  shortNavItems.map((item, index) => (
                    <button
                      key={index}
                      className="text-gray-800 hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  // Default state - show original 4 items
                  navItems.slice(0, 4).map((item, index) => (
                    <button
                      key={index}
                      className="text-gray-800 hover:text-black transition-colors duration-300 text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center w-8 h-8 space-y-1 group cursor-pointer lg:mx-6"
            >
              <span className={`block w-10 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-10 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-10 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu - Mobile and Desktop Layout */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ transform: 'translateY(100%)' }}
      >
        {/* Mobile/Tablet Layout - Full Height Navigation Only */}
        <div className={`w-full h-full flex flex-col ${isTabletOrMobile ? 'flex' : 'lg:hidden'}`}>
          {/* Mobile Navigation - Full Height */}
          <div className="bg-[#f5f5f5] flex-1 flex flex-col justify-between py-8">
            {/* Top Row: LinkedIn and Newsletter */}
            <div className="flex items-center px-4 mb-8 gap-2">
              <div className="text-sm w-full font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer hover:text-black transition-colors text-center rounded-[4px]">
                LINKEDIN
              </div>
              <div className="text-sm w-full font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer hover:text-black transition-colors text-center rounded-[4px]">
                NEWSLETTER
              </div>
            </div>

            {/* Mobile Navigation Items - Centered */}
            <div className="text-center space-y-2 flex flex-col px-8 -mt-20">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="nav-item relative inline-block"
                >
                  <h1 className="text-[32px] lg:text-[35px] font-medium text-gray-900 cursor-pointer transition-all duration-300 py-2">
                    {item.name}
                  </h1>
                </div>
              ))}
            </div>

            {/* Mobile Close Button - Bottom */}
            <div
              className="mt-8 mx-8 bg-white rounded-[8px] py-0 flex items-center justify-center cursor-pointer"
              onClick={closeMenu}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 text-gray-500 transition-all duration-500 text-2xl font-light ${
                  isCloseHovered ? 'rotate-180 text-gray-700' : 'rotate-0'
                }`}
              >
                ×
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Design with Image (1440px+) */}
        <div className={`w-full h-full ${isTabletOrMobile ? 'hidden' : 'hidden lg:flex'} flex-col`}>
          {/* Top Section - White Background with Navigation */}
          <div className="bg-[#f5f5f5] flex-1 flex flex-col">
            {/* LinkedIn and Newsletter + Navigation Items */}
            <div className="flex flex-col justify-center px-8 py-0 mt-5">
              {/* Top Row: LinkedIn and Newsletter - No Hover Animation */}
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer hover:text-black transition-colors">
                  LINKEDIN
                </div>
                <div className="text-sm font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer hover:text-black transition-colors">
                  NEWSLETTER
                </div>
              </div>

              {/* Navigation Items Container - With Animated Border */}
              <div className="text-center space-y-0 flex flex-col max-w-4xl mx-auto -mt-5 relative">
                {/* Animated Border Element - Extended */}
                <div
                  ref={borderRef}
                  className="absolute border-t-2 border-b-2 border-gray-300 rounded-xl pointer-events-none z-10"
                  style={{
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                  }}
                />

                {/* Navigation Items with Opacity Control */}
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    ref={el => navItemsRef.current[index] = el}
                    className="nav-item relative inline-block"
                    onMouseEnter={() => handleMouseEnter(item, index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h1 className={`text-[35px] font-medium text-gray-900 cursor-pointer transition-all duration-300 px-8 py-2 relative z-20 ${
                      hoveredIndex >= 0
                        ? (hoveredIndex === index ? 'opacity-100' : 'opacity-40')
                        : 'opacity-100'
                    }`}>
                      {item.name}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Dynamic Background Image (Desktop Only) */}
          <div className="relative h-[400px] w-full overflow-hidden">
            <Image
              src={currentImage || defaultImage}
              alt="Background design"
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              priority
              key={currentImage}
            />

            {/* Desktop Close Button */}
            <div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white w-[400px] rounded-[8px] py-0 flex items-center justify-center z-10 cursor-pointer"
              onClick={closeMenu}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
            >
              <div
                ref={closeButtonRef}
                className={`inline-flex items-center justify-center w-12 h-12 text-gray-500 transition-all duration-500 text-2xl font-light ${
                  isCloseHovered ? 'rotate-180 text-gray-700' : 'rotate-0'
                }`}
              >
                ×
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
