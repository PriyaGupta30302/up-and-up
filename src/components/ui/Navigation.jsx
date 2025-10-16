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
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const menuRef = useRef();
  const navItemsRef = useRef([]);
  const borderRef = useRef();
  const closeButtonRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Set scrolled state when user scrolls, for content switching NOT position changing
      setIsScrolledNav(scrollPercent >= 5);

      // Check if footer is visible
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isFooterVisible = footerRect.top < (windowHeight - 100);
        setIsNavVisible(!isFooterVisible);
      }
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isTabletOrMobile = windowWidth < 1024;

  useGSAP(() => {
    if (isMenuOpen) {
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

      gsap.fromTo('.nav-item',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: isTabletOrMobile ? 0.1 : 0.05,
          delay: isTabletOrMobile ? 0.2 : 0.1,
          ease: 'power3.out'
        }
      );
    } else {
      const closeTl = gsap.timeline();
      closeTl
        .to(menuRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.in'
        }, '-=0.2');
    }
  }, [isMenuOpen, isTabletOrMobile]);

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

  const navItems = [
    { name: 'About Us', image: '/assets/navbar/about-hover.webp', shortName: 'About' },
    { name: 'Our Solutions', image: '/assets/navbar/solution-hover.webp', shortName: 'Solutions' },
    { name: 'Our Work', image: '/assets/navbar/work-hover.webp', shortName: 'Work' },
    { name: 'Thought', image: '/assets/navbar/thought-hover.webp', shortName: 'Thought' },
    { name: 'Join Us', image: '/assets/navbar/join-hover.webp', shortName: 'Join Us' },
    { name: 'Contact Us', image: '/assets/navbar/contact-hover.webp', shortName: 'Contact' }
  ];

  const defaultImage = '/assets/navbar/contact-hover.webp';
  const currentImage = hoveredItem ? navItems.find(item => item.name === hoveredItem)?.image : defaultImage;

  return (
    <>
      <style jsx>{`
        .btn-line-effect {
          position: relative;
          overflow: hidden;
          border: none;
          transition: 0.3s;
        }
        .btn-line-effect::before,
        .btn-line-effect::after {
          position: absolute;
          content: "";
          left: 0;
          width: 100%;
          height: 1px;
          background: #374151;
          opacity: 0;
          transform: scaleX(0);
          transition: 0.4s ease-in-out;
        }
        .btn-line-effect::before {
          top: 0;
        }
        .btn-line-effect::after {
          bottom: 0;
        }
        .btn-line-effect:hover {
          letter-spacing: 2px;
          color: #374151;
          background: transparent;
        }
        .btn-line-effect:hover::before,
        .btn-line-effect:hover::after {
          opacity: 1;
          transform: scaleX(1.2);
        }
      `}</style>

      {/* Main Navigation Bar - ALWAYS AT BOTTOM */}
      <nav className={`fixed bottom-8 z-50 transition-all duration-700 ease-in-out ${
        !isNavVisible ? 'opacity-0 pointer-events-none translate-y-full' : 'opacity-100 translate-y-0'
      } ${
        isTabletOrMobile
          ? 'left-4 right-4'
          : 'left-1/2 transform -translate-x-1/2'
      }`}>
        <div className={`bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 transition-all duration-500 rounded-[8px] px-6 py-3 ${
          isTabletOrMobile ? 'w-full' : (isScrolledNav ? 'w-[400px]' : 'w-auto min-w-[500px]')
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isScrolledNav ? (
                // When scrolled: Show logo
                <div className={`flex items-center transition-all duration-300 ease-in-out ${
                isScrolledNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <Image
                  src="/assets/navbar/navbar-logo.webp"
                  alt="up&up Logo"
                  width={25}
                  height={25}
                  className="object-contain"
                  priority
                />
              </div>
              ) : (
                // When at top: Show navigation items or "Menu" text
                <>
                  {isTabletOrMobile ? (
                    <div className="text-lg font-medium text-gray-800">
                      Menu
                    </div>
                  ) : (
                    // Desktop: Show navigation items
                    <div className="flex items-center space-x-6">
                      {navItems.slice(0, 4).map((item, index) => (
                        <button
                          key={index}
                          className="text-gray-800 hover:text-black transition-colors duration-300 text-sm font-medium whitespace-nowrap"
                        >
                          {item.shortName}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Hamburger Menu Button - Always visible */}
            <button
              onClick={toggleMenu}
              className={`flex flex-col items-center justify-center w-8 h-8 space-y-1 group cursor-pointer ${isScrolledNav || isTabletOrMobile ? '' : 'ml-6'}`}
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
            {/* Top Row: LinkedIn and Newsletter with Line Animation */}
            <div className="flex items-center px-4 mb-8 gap-2">
              <div className="btn-line-effect text-sm w-full font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer transition-colors text-center rounded-[4px]">
                LINKEDIN
              </div>
              <div className="btn-line-effect text-sm w-full font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer transition-colors text-center rounded-[4px]">
                NEWSLETTER
              </div>
            </div>
            {/* Mobile Navigation Items - Centered - Show FULL names */}
            <div className="text-center space-y-2 flex flex-col px-8 -mt-20">
              {navItems.map((item, index) => (
                <div key={index} className="nav-item relative inline-block">
                  <h1 className="text-[32px] lg:text-[30px] xl:text-[35px] font-medium text-gray-900 cursor-pointer transition-all duration-300 py-2">
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
                className={`inline-flex items-center justify-center w-12 h-12 text-gray-500 transition-all duration-500 text-2xl font-light ${isCloseHovered ? 'rotate-180 text-gray-700' : 'rotate-0'}`}
              >
                ×
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Layout - Original Design with Image (1440px+) */}
        <div className={`w-full h-full ${isTabletOrMobile ? 'hidden' : 'hidden lg:flex'} flex-col`}>
          <div className="bg-[#f5f5f5] flex-1 flex flex-col">
            <div className="flex flex-col justify-center px-8 py-0 mt-5">
              <div className="flex justify-between items-center">
                <div className="btn-line-effect text-sm font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer transition-colors">
                  LINKEDIN
                </div>
                <div className="btn-line-effect text-sm font-semibold bg-white px-4 py-2 text-gray-800 cursor-pointer transition-colors">
                  NEWSLETTER
                </div>
              </div>
              <div className="text-center space-y-0 flex flex-col max-w-4xl mx-auto -mt-5 relative">
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
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    ref={el => navItemsRef.current[index] = el}
                    className="nav-item relative inline-block"
                    onMouseEnter={() => handleMouseEnter(item, index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h1 className={`lg:text-[30px] xl:text-[35px] font-medium text-gray-900 cursor-pointer transition-all duration-300 px-8 py-2 relative z-20 ${
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
          <div className="relative lg:h-[300px] xl:h-[400px] w-full overflow-hidden">
            <Image
              src={currentImage || defaultImage}
              alt="Background design"
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              priority
              key={currentImage}
            />
            <div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white w-[400px] rounded-[8px] py-0 flex items-center justify-center z-10 cursor-pointer"
              onClick={closeMenu}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
            >
              <div
                ref={closeButtonRef}
                className={`inline-flex items-center justify-center w-12 h-12 text-gray-500 transition-all duration-500 text-2xl font-light ${isCloseHovered ? 'rotate-180 text-gray-700' : 'rotate-0'}`}
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
