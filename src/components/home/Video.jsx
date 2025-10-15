'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Video() {
  const videoRef = useRef(null)
  const leftImageRef = useRef(null)
  const rightImageRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use GSAP matchMedia for responsive control
      ScrollTrigger.matchMedia({
        // Desktop only - 1024px and above (parallax effects enabled)
        "(min-width: 1024px)": function() {
          // LEFT IMAGE - ULTRA HIGH SENSITIVITY (desktop only)
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
            animation: gsap.to(leftImageRef.current, {
              y: -600,
              x: -60,
              scale: 0.8,
              ease: "none",
            })
          })

          // RIGHT IMAGE - SAME sensitivity (desktop only)
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
            animation: gsap.to(rightImageRef.current, {
              y: 350,
              x: 50,
              scale: 1.1,
              ease: "none",
            })
          })
        },

        // Tablet and Mobile - 1023px and below (no parallax effects)
        "(max-width: 1023px)": function() {
          // Reset any transforms for mobile/tablet
          gsap.set([leftImageRef.current, rightImageRef.current], {
            y: 0,
            x: 0,
            scale: 1,
            clearProps: "all"
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden
                 h-[70vh]                          /* Mobile: 70vh height */
                 sm:h-[70vh]                       /* Small screens: 70vh */
                 md:h-[75vh]                       /* Medium screens: 75vh */
                 lg:h-[calc(100vh+500px)]          /* Desktop: Full height + extra space */
                 lg:min-h-[900px]"                 /* Desktop: Minimum 900px */
    >
      <div className="absolute inset-0 bg-white z-0"></div>

      {/* Video container - RESPONSIVE HEIGHT */}
      <div className="relative w-full z-10
                      h-[70vh]               /* Mobile: 70% viewport height */
                      sm:h-[70vh]           /* Small screens: 70% viewport height */
                      md:h-[75vh]           /* Medium screens: 75% viewport height */
                      lg:h-screen           /* Large screens: Full viewport height */">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/home/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Left Image - Hidden on mobile/tablet (768px and below) */}
      <div
        ref={leftImageRef}
        className="absolute left-4 md:left-8 lg:left-[100px] 2xl:left-[250px] z-20
                   hidden lg:block"
        style={{
          top: '75%',
          width: '461px',
          height: '490px',
          willChange: 'transform',
        }}
      >
        <img
          src="/assets/home/video-img-1.webp"
          alt="Floating left image"
          className="w-full h-full object-cover rounded-[4px] shadow-2xl"
        />
      </div>

      {/* Right Image - Hidden on mobile/tablet (768px and below) */}
      <div
        ref={rightImageRef}
        className="absolute right-4 md:right-8 lg:right-[100px] 2xl:right-[250px] z-20
                   hidden lg:block"
        style={{
          top: 'calc(100vh - 180px)',
          width: '270px',
          height: '285px',
          willChange: 'transform',
        }}
      >
        <img
          src="/assets/home/video-img-2.webp"
          alt="Floating right image"
          className="w-full h-full object-cover rounded-[4px] shadow-2xl"
        />
      </div>
    </div>
  )
}

export default Video
