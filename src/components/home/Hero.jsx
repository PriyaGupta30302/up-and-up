'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const containerRef = useRef(null)
  const thirdTitleRef = useRef(null)

  useEffect(() => {
    const thirdTitle = thirdTitleRef.current

    // Create animation for the third title transformation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrolling animation
        pin: false,
        onUpdate: (self) => {
          // Calculate progress (0 to 1)
          const progress = self.progress

          // Transform "EVERYTHING" to "IMPACT" and then "GROWTH"
          if (progress < 0.5) {
            // First half: EVERYTHING -> IMPACT
            const chars = "EVERYTHING".split('')
            const targetChars = "IMPACT    ".split('') // Padded to match length

            let transformedText = chars.map((char, index) => {
              if (index < targetChars.length && targetChars[index] !== ' ') {
                // Interpolate between original and target character
                const lerpProgress = progress * 2 // 0 to 1 for first half
                return lerpProgress > 0.5 ? targetChars[index] : char
              }
              return progress > 0.3 ? '' : char
            }).join('')

            if (progress > 0.3) {
              transformedText = "IMPACT"
            }

            thirdTitle.textContent = transformedText
          } else {
            // Second half: IMPACT -> GROWTH
            const lerpProgress = (progress - 0.5) * 2 // 0 to 1 for second half
            thirdTitle.textContent = lerpProgress > 0.5 ? "GROWTH" : "IMPACT"
          }
        }
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full py-10 bg-gray-50 flex flex-col items-center justify-center relative"
    >
      {/* Logo at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <Image
          src="/assets/logo.webp"
          alt="up&up logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Main content container */}
      <div className="text-center space-y-4 px-4 pt-36">
        {/* First title (h2) */}
        <div>
          <h2 className="tracking-wide text-6xl md:text-8xl lg:text-[144px] font-medium text-[#343434] leading-none">
            CREATIVITY
          </h2>
          <h2 className="tracking-wide text-6xl md:text-8xl lg:text-[144px] font-medium text-[#343434] leading-none -mt-5">
            ELEVATES
          </h2>
        </div>

        {/* Third title (h1) - This will transform on scroll */}
        <div className='-mt-8'>
          <h1
            ref={thirdTitleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-wide text-[#343434] leading-none"
          >
            EVERYTHING
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div> */}
    </div>
  )
}

export default Hero
