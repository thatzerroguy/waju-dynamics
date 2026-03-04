'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  project: string;
  avatar: string;
  avatarAlt: string;
}

const featured: Testimonial = {
  quote:
  "Waju Dynamics moved 12,000 tons of aggregate for our I-94 interchange project over six weeks. Not one missed delivery window. When you're pouring bridge decks, that kind of reliability isn't a nice-to-have — it's everything.",
  name: 'Olatunde Charles',
  role: 'Senior Project Manager',
  company: 'Bridgepoint Civil',
  project: 'I-94 Interchange Expansion, Illinois',
  avatar: "/assets/images/man-one.png",
  avatarAlt: 'Marcus Webb, Senior Project Manager at Bridgepoint Civil, professional headshot'
};

const sideReviews: Testimonial[] = [
{
  quote:
  "We switched to Waju Dynamics after two failed contractors. Their GPS tracking alone saved us 4 hours a week in coordination calls. The site runs smoother now.",
  name: 'Oluwatayo Alex',
  role: 'Site Superintendent',
  company: 'Lakefront Developments',
  project: 'Mixed-Use Tower, Chicago',
  avatar: "/assets/images/man-two.png",
  avatarAlt: 'Diane Kowalski, Site Superintendent at Lakefront Developments'
},
{
  quote:
  "Oversized precast panels, tight city streets, 5am delivery slots. Waju Dynamics handled every constraint without complaint. They know construction.",
  name: 'Terrence Okafor',
  role: 'General Contractor',
  company: 'Okafor Building Group',
  project: 'Downtown Parking Structure, Milwaukee',
  avatar: "/assets/images/man-three.png",
  avatarAlt: 'Terrence Okafor, General Contractor at Okafor Building Group'
},
{
  quote:
  "I've worked with a dozen haulage companies. Waju Dynamics is the only one that's never made me look bad in front of a client.",
  name: 'Okechukwu Uzor',
  role: 'Project Engineer',
  company: 'Summit Infrastructure',
  project: 'Highway 41 Widening, Wisconsin',
  avatar: "/assets/images/man-four.png",
  avatarAlt: 'Priya Nambiar, Project Engineer at Summit Infrastructure'
}];


const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#001D3C] text-cream relative overflow-hidden noise-overlay">
      
      {/* Background ghost text */}
      <div
        className="absolute top-0 right-0 font-serif italic text-cream opacity-[0.025] leading-none pointer-events-none select-none"
        style={{ fontSize: '22vw' }}
        aria-hidden>
        
        Trust
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 reveal">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest2 text-stone block mb-4">
              // From the Field
            </span>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight">
              What Contractors <br />
              <span className="italic text-stone">Actually Say.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          {/* Featured quote */}
          <div className="col-span-1 md:col-span-7 reveal-scale delay-100">
            <div className="relative big-quote">
              <p className="font-serif text-3xl md:text-4xl italic leading-snug relative z-10">
                "{featured.quote}"
              </p>
            </div>

            <div className="flex items-center gap-6 mt-14 pt-8 border-t border-cream/10">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-cream/20 shrink-0">
                <AppImage
                  src={featured.avatar}
                  alt={featured.avatarAlt}
                  width={56}
                  height={56}
                  className="object-cover grayscale w-full h-full" />
                
              </div>
              <div>
                <p className="text-sm font-bold">{featured.name}</p>
                <p className="text-[11px] uppercase tracking-widest2 text-stone mt-0.5">
                  {featured.role} · {featured.company}
                </p>
                <p className="text-[11px] text-cream/40 mt-1">{featured.project}</p>
              </div>
            </div>
          </div>

          {/* Side reviews */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-12 reveal-scale delay-200">
            {sideReviews.map((r, i) =>
            <div
              key={i}
              className="border-l border-cream/10 pl-8 space-y-4">
              
                <p className="text-sm font-light leading-relaxed italic text-cream/75">
                  "{r.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-cream/15 shrink-0">
                    <AppImage
                    src={r.avatar}
                    alt={r.avatarAlt}
                    width={32}
                    height={32}
                    className="object-cover grayscale w-full h-full" />
                  
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest2 text-stone">
                      {r.name}
                    </p>
                    <p className="text-[10px] text-cream/40 mt-0.5">
                      {r.role} · {r.company}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;