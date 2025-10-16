'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Brand() {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const brandListRef = useRef(null)
  const [hoveredBrand, setHoveredBrand] = useState(null)

  const brands = [
    {
      name: 'MTN',
      description: "AFRICA'S MOST VALUABLE BRAND",
      logo: '/assets/home/brand/mtn.webp'
    },
    {
      name: 'Standard Bank',
      description: "AFRICA'S MOST VALUABLE BANKING BRAND",
      logo: '/assets/home/brand/standard.webp'
    },
    {
      name: 'The Street Store',
      description: 'OVER 1M HOMELESS CLOTHED',
      logo: '/assets/home/brand/street.webp'
    },
    {
      name: 'Heineken Beverages',
      description: '19 AFRICAN MARKETS, 10 BRANDS',
      logo: '/assets/home/brand/heineken.webp'
    },
    {
      name: 'Pepsi Co',
      description: '5 LEADING BRANDS',
      logo: '/assets/home/brand/pepsi.webp'
    },
    {
      name: 'FAO',
      description: 'GLOBAL SUSTAINABILITY CAMPAIGNS',
      logo: '/assets/home/brand/fao.webp'
    },
    {
      name: 'Astron Energy',
      description: '2ND BIGGEST FUEL BRAND',
      logo: '/assets/home/brand/astron.webp'
    },
    {
      name: 'Woolworths',
      description: 'BRAND FINANCE: TOP 10 MOST VALUABLE SA BRAND',
      logo: '/assets/home/brand/woolworths.webp'
    }
  ]

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current
    const brandList = brandListRef.current

    if (!container || !logo || !brandList) return

    // Logo scroll animation - moves from top of container to center of viewport
    const logoScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          // Calculate movement from top of container to center of viewport
          const viewportHeight = window.innerHeight
          const startY = 100 // Start position from top of container
          const centerY = (viewportHeight / 2) - 80 // Target: center of viewport
          const moveDistance = centerY - startY

          gsap.to(logo, {
            y: self.progress * moveDistance,
            duration: 0.1,
            ease: "none"
          })
        }
      }
    })

    // Animate brand items on scroll
    gsap.fromTo(
      brandList.children,
      {
        opacity: 0.3,
        y: 50
      },
      {
        opacity: 0.6,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: brandList,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleBrandHover = (brand, index) => {
    setHoveredBrand(brand)

    // Animate logo change with smooth transition
    gsap.to(logoRef.current, {
      scale: 0.9,
    //   rotation: 180,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(logoRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.2,
          ease: "power2.out"
        })
      }
    })

    // Animate hovered brand
    const brandElements = brandListRef.current.children
    gsap.to(brandElements[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })

    // Fade other brands
    Array.from(brandElements).forEach((element, i) => {
      if (i !== index) {
        gsap.to(element, {
        //   opacity: 0.3,
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

  const handleBrandLeave = (index) => {
    setHoveredBrand(null)

    // Reset all brands
    const brandElements = brandListRef.current.children
    Array.from(brandElements).forEach((element, i) => {
      gsap.to(element, {
        opacity: 0.6,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    // Reset logo
    gsap.to(logoRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#f5f5f5] relative overflow-hidden">
      {/* Top Description */}
      <div className="absolute top-8 right-8 w-full lg:max-w-[850px] z-10">
        <h1 className="text-gray-800 text-[36px] leading-tight font-medium pt-16">
          Since   <span className="text-[#e5634c]">2010</span> we have used creativity to elevate some of the world’s most ambitious brands, organisations and causes on the African continent and beyond.
        </h1>
      </div>

      {/* Logo - starts at top, moves to center of viewport */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
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
      <div className="w-full pt-[350px]">
        <div ref={brandListRef} className="w-full mx-auto px-0">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="flex items-center justify-between py-3 border-t border-b border-gray-400 cursor-pointer group transition-all duration-300"
              onMouseEnter={() => handleBrandHover(brand, index)}
              onMouseLeave={() => handleBrandLeave(index)}
            >
              {/* Brand Name */}
              <div className="flex-1 pl-4">
                <h1
                  className={` font-light transition-all duration-300 ${
                    hoveredBrand?.name === brand.name
                      ? 'text-black text-5xl font-medium py-5'
                      : 'text-[#343434] text-[22px]'
                  }`}
                >
                  {brand.name}
                </h1>
              </div>

              {/* Brand Description */}
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

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div> */}
    </div>
  )
}

export default Brand
