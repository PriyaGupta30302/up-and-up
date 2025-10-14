// utils/gsap-animations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// ====== ENTRANCE ANIMATIONS ======

// Fade in from bottom
export const fadeInUp = (element, options = {}) => {
    const defaults = {
        duration: 1,
        y: 60,
        opacity: 0,
        ease: 'power3.out',
        delay: 0
    };

    const config = { ...defaults, ...options };

    return gsap.from(element, config);
};

// Fade in from left
export const fadeInLeft = (element, options = {}) => {
    const defaults = {
        duration: 1,
        x: -60,
        opacity: 0,
        ease: 'power3.out',
        delay: 0
    };

    const config = { ...defaults, ...options };

    return gsap.from(element, config);
};

// Scale in animation
export const scaleIn = (element, options = {}) => {
    const defaults = {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0
    };

    const config = { ...defaults, ...options };

    return gsap.from(element, config);
};

// ====== HERO ANIMATIONS ======

// Complete hero entrance sequence
export const heroEntrance = (container) => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(`${container} .hero-title`, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from(`${container} .hero-subtitle`, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from(`${container} .hero-cta`, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.3');

    return tl;
};

// ====== SCROLL ANIMATIONS ======

// Stagger animation on scroll
export const staggerOnScroll = (elements, options = {}) => {
    const defaults = {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: elements,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    };

    const config = { ...defaults, ...options };

    return gsap.from(elements, config);
};

// Parallax scroll effect
export const parallaxScroll = (element, speed = 0.5) => {
    return gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
};

// ====== INTERACTIVE ANIMATIONS ======

// Hover scale effect
export const hoverScale = (element, scale = 1.05) => {
    const animation = gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: 'power2.out',
        paused: true
    });

    element.addEventListener('mouseenter', () => animation.play());
    element.addEventListener('mouseleave', () => animation.reverse());

    return animation;
};

// Button click animation
export const buttonClick = (element) => {
    return gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
    });
};

// ====== PAGE TRANSITIONS ======

// Page exit animation
export const pageExit = () => {
    return gsap.to('.page-transition', {
        x: '100%',
        duration: 0.5,
        ease: 'power2.inOut'
    });
};

// Page enter animation
export const pageEnter = () => {
    return gsap.from('.page-transition', {
        x: '-100%',
        duration: 0.5,
        ease: 'power2.inOut'
    });
};

// ====== UTILITY FUNCTIONS ======

// Kill all animations for cleanup
export const killAllAnimations = () => {
    gsap.killTweensOf('*');
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger (useful for dynamic content)
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
};

// Create timeline with default settings
export const createTimeline = (options = {}) => {
    const defaults = {
        paused: false,
        delay: 0
    };

    return gsap.timeline({ ...defaults, ...options });
};
