'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Service {
  index: string;
  tag: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  alt: string;
}

const services: Service[] = [
{
  index: '01',
  tag: 'Fuel Haulage',
  title: 'Fuel Haulage & Delivery',
  description:
  'Reliable transportation and delivery of petrol and diesel to gas stations, government institutions, and end consumers. Our modern tanker fleet ensures safe, timely, and compliant fuel delivery across Nigeria.',
  detail: 'Petrol · Diesel · Gas Stations · Government Supply · End Consumers',
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png",
  alt: 'Large fuel tanker truck transporting petrol and diesel on a highway'
},
{
  index: '02',
  tag: 'Equipment Hire',
  title: 'Heavy Duty Equipment Hire',
  description:
  'Access a comprehensive fleet of heavy duty machinery for construction and industrial projects. From excavators and bulldozers to cranes and compactors — we provide well-maintained equipment with experienced operators.',
  detail: 'Excavators · Bulldozers · Cranes · Compactors · Loaders',
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png",
  alt: 'Heavy duty construction excavator and machinery at an active industrial project site'
},
{
  index: '03',
  tag: 'Real Estate',
  title: 'Real Estate Solutions',
  description:
  'Comprehensive real estate services tailored to your needs. We handle building and construction projects from foundation to finish, and facilitate the sale of residential and commercial properties across prime locations.',
  detail: 'Building & Construction · Residential Sales · Commercial Properties · Property Development',
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png",
  alt: 'Modern residential and commercial real estate buildings and construction development'
}];


const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal, .reveal-scale');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-cream">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest2 text-muted block mb-4">
            // What We Do
          </span>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight">
            Services.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted leading-relaxed md:text-right">
          From fuel delivery and heavy equipment hire to full-scale real estate development — Waju Dynamics delivers end-to-end solutions across Nigeria's most critical industries.
        </p>
      </div>

      <div className="line-h mx-6 md:mx-10" />

      {/* Service rows */}
      {services.map((svc, i) =>
      <div key={svc.index}>
          <div
          className={`service-row max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[320px] cursor-default reveal-scale delay-${i % 3 * 100 + 100}`}>
          
            {/* Text — alternates side */}
            <div
            className={`col-span-1 md:col-span-5 p-8 md:p-12 flex flex-col justify-center gap-5 ${
            i % 2 === 1 ?
            'md:order-2 md:border-l border-charcoal/10' : 'md:border-r border-charcoal/10'}`
            }>
            
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-muted">{svc.index}</span>
                <div className="h-px w-6 bg-charcoal/20" />
                <span className="text-[11px] font-bold uppercase tracking-widest2 text-charcoal">
                  {svc.tag}
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                {svc.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{svc.description}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest2 text-stone border-t border-charcoal/10 pt-4">
                {svc.detail}
              </p>
            </div>

            {/* Image */}
            <div
            className={`col-span-1 md:col-span-7 service-img-wrap kb-${i + 1} relative overflow-hidden bg-charcoal/5 min-h-[260px] ${
            i % 2 === 1 ? 'md:order-1' : ''}`
            }>
            
              <AppImage
              src={svc.image}
              alt={svc.alt}
              fill
              className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 58vw" />
            
            </div>
          </div>
          <div className="line-h mx-6 md:mx-10" />
        </div>
      )}
    </section>);

};

export default ServicesSection;