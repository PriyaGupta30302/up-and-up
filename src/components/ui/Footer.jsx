import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo
      gsap.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });

      // Animate description
      gsap.from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });

      // Animate button
      gsap.from(btnRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });

      // Animate grid sections
      gsap.from('.grid-section', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <footer ref={footerRef} className="w-full bg-white  overflow-hidden">
        {/* Top Section */}
        <div className="px-8 py-16 md:px-16 md:py-24 text-center">
          {/* Logo */}
          <div ref={logoRef} className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight">
              up<span className="inline-block">&</span>up
            </h1>
          </div>

          {/* Description */}
          <p ref={descRef} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We're a creative solutions Group. But much more than that: we're in the business of up.
          </p>

          {/* CTA Button */}
          <button
            ref={btnRef}
            className="px-12 py-4 gap-10 border-t-2 border-b-2 border-gray-300 text-gray-800 font-medium tracking-wider hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 rounded-[8px] text-[13px] uppercase"
          >
            LET'S CHAT
          </button>
        </div>

        {/* Bottom Grid Section with Gradient */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 px-1 py-1 gap-[1px] ">
          {/* Index Section - Darkest Orange */}
          <div className="grid-section bg-[#f5714b] px-3 py-3 border-r border-white/20 rounded-tr-xl rounded-tl-xl lg:rounded-bl-xl lg:rounded-tr-none flex flex-col justify-between min-h-[300px]">
            <h1 className="text-white text-[16px] font-medium tracking-wide">Index</h1>
            <nav className="space-y-0">
              <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] ">
                HOME
              </a>
              <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] ">
                ABOUT US
              </a>
              <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] ">
                OUR SOLUTIONS
              </a>
              <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] ">
                OUR WORK
              </a>
              <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] ">
                THOUGHT
              </a>
            </nav>
          </div>

          {/* Stay Connected Section - Medium Orange */}
          {/* Stay Connected Section - Medium Orange */}
          <div className="grid-section bg-[#f87c5a]  px-3 py-3 border-r border-white/20 flex flex-col justify-between min-h-[300px]">
            <h1 className="text-white text-[16px] font-light tracking-wide">Stay Connected</h1>
            <div className="flex items-end justify-between">
              <nav className="space-y-0">
                <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] tracking-wider ">
                  CONTACT US
                </a>
                <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] tracking-wider">
                  JOIN US
                </a>
                <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] tracking-wider">
                  LINKEDIN
                </a>
              </nav>
              <div>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/30 text-white font-medium transition-all duration-300 backdrop-blur-sm uppercase text-[13px] tracking-wider  border border-white/30 rounded-[2px]">
                  NEWSLETTER
                </button>
              </div>
            </div>
          </div>

          {/* Legal Section - Lightest Orange */}
          <div className="grid-section bg-[#fe9275] px-3 py-3 rounded-bl-xl rounded-br-xl lg:rounded-tr-xl lg:rounded-bl-none flex flex-col justify-between min-h-[300px]">
            <h1 className="text-white text-[16px] font-medium tracking-wide">Legal</h1>
            <div>
              <nav className="space-y-3 mb-0">
                <a href="#" className="block text-white/90 hover:text-white font-medium transition-colors duration-200 uppercase text-[13px] tracking-wider">
                  PRIVACY POLICY
                </a>
              </nav>
              <p className="text-white/70 text-xs uppercase tracking-wider font-light mt-1">
                ALL RIGHTS RESERVED. THE UP&UP GROUP®️2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
