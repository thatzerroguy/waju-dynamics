'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const slides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9627fee-1772619078311.png",
  alt: 'Fuel tanker truck on a highway delivering petrol and diesel to gas stations'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_16c414efa-1772619079772.png",
  alt: 'Heavy duty construction equipment and machinery at an industrial project site'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1583ded10-1772619078380.png",
  alt: 'Modern residential and commercial real estate buildings under construction'
}];


const stats = [
{ value: '300+', label: 'Loads Delivered' },
{ value: '50K', label: 'Litres Transported' },
{ value: '4 Yrs', label: 'In Operation' }];


const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Carousel auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  // Title reveal on mount
  useEffect(() => {
    const t = setTimeout(() => {
      if (titleRef.current) titleRef.current.classList.add('reveal-active');
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative border-b border-charcoal/10 pt-0">
      {/* ── Full-width Carousel ── */}
      <div className="relative overflow-hidden bg-mid min-h-[60vh] md:min-h-screen w-full">
        {/* Slides */}
        {slides.map((slide, i) =>
        <div key={i} className={`carousel-slide ${i === current ? 'active' : ''}`}>
            <AppImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover grayscale"
            sizes="100vw" />
          
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent pointer-events-none z-10" />

        {/* Hero text */}
        <div className="absolute bottom-10 left-8 md:bottom-14 md:left-12 z-20 text-cream">
          <p className="text-[13px] font-bold uppercase tracking-widest2 mb-5 opacity-95">
            // Fuel Haulage · Equipment Hire · Real Estate
          </p>
          <h1
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter mb-6">
            
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content delay-100">Fuel. Delivered.</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content delay-300 italic">Built. Sold.</span>
            </span>
          </h1>

          <div className="flex items-center gap-6 mt-6">
            <a
              href="#quote"
              className="inline-block bg-[#001D3C] text-white text-[11px] font-bold uppercase tracking-widest2 px-6 py-3 hover:bg-stone transition-colors">
              
              Get a Quote
            </a>
            <a
              href="#services"
              className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] border-b border-cream/40 pb-0.5 hover:text-cream hover:border-cream transition-colors">
              
              Our Services
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 right-8 z-20 flex flex-col gap-2">
          {slides.map((_, i) =>
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1 transition-all duration-500 ${
            i === current ? 'h-8 bg-cream' : 'h-3 bg-cream/30'}`
            } />

          )}
        </div>
      </div>

      {/* ── Stats row (below carousel) ── */}
      <div className="grid grid-cols-3 border-t bg-[#001D3C] hover:text-charcoal">
        {stats.map((stat, i) =>
        <div
          key={i}
          className={`stat-card flex flex-col justify-between p-3 md:p-7 cursor-default ${
          i < stats.length - 1 ? 'border-r bg-[#001D3C]' : ''}`
          }>
          
            {/* Top accent line */}
            <div className="w-8 h-px bg-[#001D3C] mb-4" />
            <div>
              <p className="font-serif text-4xl md:text-5xl tracking-tighter text-[#FEBE01]">
                {stat.value}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>);

};

export default HeroSection;