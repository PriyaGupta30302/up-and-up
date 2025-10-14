// components/animations/ScrollAnimations.jsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations({ children, className }) {
    const containerRef = useRef();

    useGSAP(() => {
        const elements = containerRef.current.children;

        gsap.from(elements, {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
