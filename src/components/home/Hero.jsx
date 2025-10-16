'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // CRITICAL: Responsive logic based on screen size
    const getResponsiveValues = () => {
      const screenWidth = window.innerWidth

      if (screenWidth >= 1024) {
        // Desktop and large tablets (1024px and above)
        return {
          MAX_TRANSLATE: -(4 - 1) * 25, // -75%
          END_VALUE: "+=600"
        }
      } else {
        // Tablets and mobile (below 1024px)
        return {
          MAX_TRANSLATE: -(4 - 1) * 30, // -90%
          END_VALUE: "+=400"
        }
      }
    }

    const { MAX_TRANSLATE, END_VALUE } = getResponsiveValues()

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: END_VALUE, // Responsive end value
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress // 0 to 1

        // Calculate translateY with strict boundaries
        let translateY = progress * MAX_TRANSLATE // Responsive translate value

        // CRITICAL: Clamp to prevent going beyond last word
        translateY = Math.max(MAX_TRANSLATE, Math.min(0, translateY))

        // Apply transform
        gsap.set(scrollContainer, {
          y: `${translateY}%`,
          ease: "none"
        })

        // DEBUG: Log values to see what's happening
        console.log(`Screen: ${window.innerWidth}px, Progress: ${progress.toFixed(2)}, TranslateY: ${translateY}%`)
      },
      // CRITICAL: Force stop when animation completes
      onComplete: () => {
        gsap.set(scrollContainer, { y: `${MAX_TRANSLATE}%` })
        console.log("Animation stopped at:", MAX_TRANSLATE + "%")
      }
    })

    // Handle window resize to refresh ScrollTrigger with new values
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-[350px] md:h-[500px] lg:h-[700px] bg-gray-50 flex flex-col items-center justify-center relative"
    >
      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src="/assets/logo.webp"
          alt="up&up logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="text-center px-4 pt-[200px] md:pt-[180px] lg:pt-[220px] w-full">
        {/* Static titles */}
        <div>
          <h2 className="tracking-wide text-[45px] md:text-[100px] lg:text-[144px] font-medium text-[#343434] leading-none">
            CREATIVITY
          </h2>
          <h2 className="tracking-wide text-[45px] md:text-[100px] lg:text-[144px] font-medium text-[#343434] leading-none md:-mt-3">
            ELEVATES
          </h2>
        </div>

        {/* Controlled third block */}
        <div className="">
          {/* CRITICAL: Mask height = exactly one word height */}
          <div className="overflow-hidden h-[50px] md:h-[105px] lg:h-[120px] relative">
            {/* CRITICAL: Container with exactly 4 word sections - Responsive height */}
            <div
              ref={scrollContainerRef}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[200px] md:h-[420px] lg:h-[480px]"
            >
              {/* Word 1: EVERYTHING */}
              <div className="h-[50px] md:h-[105px] lg:h-[120px] flex items-center justify-center">
                <h1 className="text-[45px] md:text-[100px] lg:text-9xl font-medium tracking-wide text-[#343434] leading-none -mt-3">
                  EVERYTHING
                </h1>
              </div>

              {/* Word 2: IMPACT */}
              <div className="h-[50px] md:h-[105px] lg:h-[120px] flex items-center justify-center">
                <h1 className="text-[45px] md:text-[100px] lg:text-9xl font-medium tracking-wide text-[#343434] leading-none whitespace-nowrap">
                  IMPACT
                </h1>
              </div>

              {/* Word 3: GROWTH */}
              <div className="h-[50px] md:h-[105px] lg:h-[120px] flex items-center justify-center">
                <h1 className="text-[45px] md:text-[100px] lg:text-9xl font-medium tracking-wide text-[#343434] leading-none whitespace-nowrap">
                  GROWTH
                </h1>
              </div>

              {/* Word 4: RELEVANT - FINAL STOP */}
              <div className="h-[50px] md:h-[105px] lg:h-[120px] flex items-center justify-center">
                <h1 className="text-[45px] md:text-[100px] lg:text-9xl font-medium tracking-wide text-[#343434] leading-none whitespace-nowrap">
                  RELEVANT
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
