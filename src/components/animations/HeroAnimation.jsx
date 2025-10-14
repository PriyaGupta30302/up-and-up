// components/animations/HeroAnimation.jsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// Import your utility functions here
import { heroEntrance } from '@/components/utils/gsap-animations';

export default function HeroAnimation({ children }) {
    const containerRef = useRef();

    useGSAP(() => {
        // Use your utility function
        heroEntrance('.hero-container');

        // OR write animation directly here
        // const tl = gsap.timeline({ delay: 0.5 });
        // tl.from('.hero-title', {
        //     y: 100,
        //     opacity: 0,
        //     duration: 1,
        //     ease: 'power3.out'
        // });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="hero-container">
            {children}
        </div>
    );
}
