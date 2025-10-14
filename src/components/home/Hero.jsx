// components/sections/Hero.jsx
import HeroAnimation from '../animations/HeroAnimation';

export default function Hero() {
    return (
        <HeroAnimation>
            <section className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center max-w-4xl mx-auto px-6">
                    <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6">
                        EVERYTHING
                    </h1>
                    <p className="hero-subtitle text-xl md:text-2xl mb-8 text-gray-300">
                        Elevating brands since 2010
                    </p>
                    <button className="hero-cta bg-white text-black px-8 py-4 text-lg font-semibold">
                        Explore Our Work
                    </button>
                </div>
            </section>
        </HeroAnimation>
    );
}
