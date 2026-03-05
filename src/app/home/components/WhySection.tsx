'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const certifications = [
  'DOT Certified Fleet',
  '·',
  'ISO 9001:2015',
  '·',
  'OSHA Compliant',
  '·',
  'FMCSA Registered',
  '·',
  'EPA Tier 4 Engines',
  '·',
  'Oversize Load Permitted',
  '·',
  'GPS-Tracked Every Load',
  '·',
  'DOT Certified Fleet',
  '·',
  'ISO 9001:2015',
  '·',
  'OSHA Compliant',
  '·',
  'FMCSA Registered',
  '·',
  'EPA Tier 4 Engines',
  '·',
  'Oversize Load Permitted',
  '·',
  'GPS-Tracked Every Load',
  '·',
];

interface Differentiator {
  icon: string;
  title: string;
  body: string;
  metric: string;
}

const differentiators: Differentiator[] = [
  {
    icon: 'MapPinIcon',
    title: 'Quick and Speedy Delivery',
    body: 'Always expect on-time delivery. No matter the distance, our drivers will get your load where it needs to go.',
    metric: '100% Fleet Visibility',
  },
  {
    icon: 'ClockIcon',
    title: '24/7 Dispatch Center',
    body: 'Pre-dawn pours, weekend foundation work, emergency spoil removal — our dispatch team operates around the clock, 365 days a year.',
    metric: 'Average 22-min Response',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'DOT & OSHA Compliance',
    body: 'Every driver holds current CDL-A certification. Every vehicle passes bi-annual DOT inspection. Zero compliance incidents in 2 consecutive years.',
    metric: '2 Years Clean Record',
  },
  {
    icon: 'TruckIcon',
    title: 'Diverse Fleet Capacity',
    body: 'From 10-ton single-axle to 80-ton lowboy — we match the right equipment to your load. No subcontracting, no surprises on delivery day.',
    metric: '60+ Vehicles On-Call',
  },
];

const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="bg-white">
      {/* Marquee strip */}
      <div className="border-y border-charcoal/10 py-5 overflow-hidden bg-charcoal/[0.02]">
        <div className="marquee-container">
          <div className="marquee-content gap-0">
            {certifications.map((c, i) => (
              <span
                key={i}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-widest2 mx-6 ${
                  c === '·' ? 'text-stone' : 'text-muted'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="marquee-content gap-0" aria-hidden>
            {certifications.map((c, i) => (
              <span
                key={`dup-${i}`}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-widest2 mx-6 ${
                  c === '·' ? 'text-stone' : 'text-muted'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 reveal">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest2 text-muted block mb-4">
            // The Waju Dynamics Difference
          </span>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight">
            Why Choose <br />
            <span className="italic">Waju Dynamics.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-muted leading-relaxed">
          We've delivered to over 340 active construction sites. Here's what we do differently.
        </p>
      </div>

      {/* Grid of differentiators */}
      <div className="max-w-[1400px] mx-auto border-t border-charcoal/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <div
              key={i}
              className={`p-10 md:p-14 flex flex-col gap-6 border-b border-charcoal/10 reveal delay-${i * 100} ${
                i % 2 === 0 ? 'md:border-r border-charcoal/10' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 border border-charcoal/15 flex items-center justify-center">
                  <Icon name={d.icon as Parameters<typeof Icon>[0]['name']} size={20} variant="outline" className="text-charcoal" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest2 text-stone border border-stone/40 px-3 py-1">
                  {d.metric}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{d.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-24" />
    </section>
  );
};

export default WhySection;