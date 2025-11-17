'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Team from '@/components/home/Team'
import GalleryGrid from './GalleryGrid'


gsap.registerPlugin(ScrollTrigger)

function Brand() {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const brandListRef = useRef(null)
  const mobileLogoRef = useRef(null)
  const [hoveredBrand, setHoveredBrand] = useState(null)

  const brands = [
    {
      name: 'MTN',
      description: "AFRICA'S MOST VALUABLE BRAND",
      logo: '/assets/home/brand/brand-logo/mtn.webp'
    },
    {
      name: 'Standard Bank',
      description: "AFRICA'S MOST VALUABLE BANKING BRAND",
      logo: '/assets/home/brand/brand-logo/standard.webp'
    },
    {
      name: 'The Street Store',
      description: 'OVER 1M HOMELESS CLOTHED',
      logo: '/assets/home/brand/brand-logo/street.webp'
    },
    {
      name: 'Heineken Beverages',
      description: '19 AFRICAN MARKETS, 10 BRANDS',
      logo: '/assets/home/brand/brand-logo/heineken.webp'
    },
    {
      name: 'Pepsi Co',
      description: '5 LEADING BRANDS',
      logo: '/assets/home/brand/brand-logo/pepsi.webp'
    },
    {
      name: 'FAO',
      description: 'GLOBAL SUSTAINABILITY CAMPAIGNS',
      logo: '/assets/home/brand/brand-logo/fao.webp'
    },
    {
      name: 'Astron Energy',
      description: '2ND BIGGEST FUEL BRAND',
      logo: '/assets/home/brand/brand-logo/astron.webp'
    },
    {
      name: 'Woolworths',
      description: 'BRAND FINANCE: TOP 10 MOST VALUABLE SA BRAND',
      logo: '/assets/home/brand/brand-logo/woolworths.webp'
    }
  ]

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current
    const brandList = brandListRef.current
    const mobileLogo = mobileLogoRef.current

    if (!container || !logo || !brandList) return

    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function() {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress
            const containerHeight = container.offsetHeight
            const viewportHeight = window.innerHeight
            const startY = 50
            const endY = containerHeight - viewportHeight + 200
            const currentY = startY + (progress * (endY - startY))
            gsap.set(logo, { y: currentY, force3D: true })
          }
        })
      },
      "(max-width: 1023px)": function() {
        ScrollTrigger.create({
          trigger: "#video-section",
          start: "top top",
          endTrigger: container,
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const videoSection = document.getElementById('video-section')
            if (!videoSection || !mobileLogo) return
            const videoRect = videoSection.getBoundingClientRect()
            const brandRect = container.getBoundingClientRect()
            // Scroll progress maps between video and brand section
            const totalDistance = brandRect.top - videoRect.top
            const translateY = self.progress * totalDistance
            gsap.set(mobileLogo, { y: translateY, force3D: true })
          }
        })
      }
    })
  }, [])

  const handleBrandHover = (brand, index) => {
    setHoveredBrand(brand)
    gsap.to(logoRef.current, {
      scale: 0.9,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        })
      }
    })
    const brandElements = brandListRef.current.children
    Array.from(brandElements).forEach((element, i) => {
      if (i !== index) {
        gsap.to(element, {
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        gsap.to(element, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
  }

  const handleBrandLeave = () => {
    setHoveredBrand(null)
    const brandElements = brandListRef.current.children
    Array.from(brandElements).forEach((element) => {
      gsap.to(element, {
        opacity: 0.6,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    })
  }

  return (
    <>
      
      {/* Mobile/Tablet logo - absolutely centered on video, scrolls down */}
      <div
        ref={mobileLogoRef}
        className="fixed left-1/2 top-[65vh] z-30 transform -translate-x-1/2 lg:hidden block transition-all"
        style={{
          width: '140px',
          height: '140px',
          pointerEvents: 'none',
        }}
      >
        <img
          src={hoveredBrand ? hoveredBrand.logo : "/assets/home/brand-logo.webp"}
          alt={hoveredBrand ? hoveredBrand.name : "Default Logo"}
          className="w-full h-full object-contain"
        />
      </div>
      <div ref={containerRef} className="w-full min-h-[300vh] bg-[#f5f5f5] relative overflow-hidden pt-[160px] lg:pt-20 xl:pt-0">
        {/* Top Description */}
        <div className="absolute top-8 px-4 lg:px-0 lg:right-2 2xl:right-8 w-full lg:max-w-[450px] xl:max-w-[650px] 2xl:max-w-[850px] z-10">
          <h1 className="text-gray-800 text-[36px] leading-tight font-medium pt-16 lg:pt-0 xl:pt-24">
            Since <span className="text-[#e5634c]">2010</span> we have used creativity to elevate some of the world's most ambitious brands, organisations and causes on the African continent and beyond.
          </h1>
        </div>
        {/* Desktop Logo */}
        <div className="absolute z-20 left-[35%] lg:left-[35%] lg:transform-none hidden lg:block">
          <div ref={logoRef} className="w-[240px] h-[256px] flex items-center justify-center mr-[300px]">
            {hoveredBrand ? (
              <img
                src={hoveredBrand.logo}
                alt={hoveredBrand.name}
                className="max-w-full max-h-full object-contain transition-all duration-300"
              />
            ) : (
              <img
                src="/assets/home/brand-logo.webp"
                alt="Default Logo"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
        {/* Brand List */}
        <div className="w-full pt-[150px] lg:pt-[350px] pb-[40vh]">
          <div ref={brandListRef} className="w-full mx-auto px-0 xl:pt-20">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className="flex items-center justify-between py-6 border-t border-b border-gray-400 cursor-pointer group transition-all duration-300"
                onMouseEnter={() => handleBrandHover(brand, index)}
                onMouseLeave={handleBrandLeave}
              >
                <div className="flex-1 pl-4">
                  <h1
                    className={`font-light transition-all duration-300 ${
                      hoveredBrand?.name === brand.name
                        ? 'text-black text-5xl font-medium py-5'
                        : 'text-[#343434] text-[22px]'
                    }`}
                  >
                    {brand.name}
                  </h1>
                </div>
                <div className="flex-1 text-left ml-[110px]">
                  <p
                    className={`text-sm font-medium tracking-wider transition-all duration-300 ${
                      hoveredBrand?.name === brand.name
                        ? 'text-black text-[20px]'
                        : 'text-[#343434] text-[16px]'
                    }`}
                  >
                    {brand.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Team Section */}
        <div className="relative z-30 bg-[#343434]">
          <Team />
          <GalleryGrid />
        </div>
      </div>
    </>
  )
}

export default Brand
