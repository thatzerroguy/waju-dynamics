import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const servicesData: Record<string, any> = {
  'fuel-haulage': {
    title: 'Fuel Haulage & Delivery',
    description: 'Reliable transportation and delivery of petrol and diesel to gas stations, government institutions, and end consumers. Our modern tanker fleet ensures safe, timely, and compliant fuel delivery across Nigeria. Safety and compliance are at the forefront of our haulage services. All vehicles are equipped with modern tracking and safety measures to ensure seamless delivery to our partners.',
    detail: 'Petrol · Diesel · Gas Stations · Government Supply · End Consumers',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png',
    alt: 'Large fuel tanker truck transporting petrol and diesel on a highway',
    comments: [
      { text: "Waju Dynamics has completely transformed our supply chain logistics. Zero downtime in the last 12 months.", author: "Director of Ops, Metro Energy" },
      { text: "Their commitment to safety and timeline is unmatched in the industry.", author: "Logistics Mgr, National Grid" }
    ],
    gallery: [
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Convoy of fuel tankers on the highway' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Offloading operation at a distribution hub' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Safety inspection check' }
    ]
  },
  'equipment-hire': {
    title: 'Heavy Duty Equipment Hire',
    description: 'Access a comprehensive fleet of heavy duty machinery for construction and industrial projects. From excavators and bulldozers to cranes and compactors — we provide well-maintained equipment with experienced operators. We offer flexible hiring terms tailored to both short-term assignments and large-scale, long-term construction projects.',
    detail: 'Excavators · Bulldozers · Cranes · Compactors · Loaders',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png',
    alt: 'Heavy duty construction excavator and machinery at an active industrial project site',
    comments: [
      { text: "Top notch machinery. Rarely any breakdowns and operators are highly skilled.", author: "Site Engineer, Julius Berger" },
      { text: "Flexible terms and rapid deployment save us precious project time.", author: "Procurement, South Energy" }
    ],
    gallery: [
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Excavators in action' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Onsite maintenance crew' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Compactor leveling the ground' }
    ]
  },
  'real-estate': {
    title: 'Real Estate Solutions',
    description: 'Comprehensive real estate services tailored to your needs. We handle building and construction projects from foundation to finish, and facilitate the sale of residential and commercial properties across prime locations. Over the past 4 years, we have steadily grown our portfolio, focusing on sustainable building practices and premium finishes.',
    detail: 'Building & Construction · Residential Sales · Commercial Properties · Property Development',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png',
    alt: 'Modern residential and commercial real estate buildings and construction development',
    comments: [
      { text: "The Waju Residences is standard benchmark for premium living spaces in Lagos.", author: "Architecture Digest" },
      { text: "Delivered our 4-story tech hub exactly to spec and 2 months ahead of schedule.", author: "CEO, Innova Group" }
    ],
    gallery: [
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Exterior night view of the residences' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Tech hub exterior' },
      { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Construction phase' }
    ]
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        
        {/* Full width main image */}
        <div className="relative w-full h-[60vh] md:h-[80vh]">
          <AppImage
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          
          <div className="absolute top-24 left-6 md:left-10 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-cream/80">
            <Link href="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/home#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>

          <div className="absolute bottom-10 left-6 md:left-10 z-10 max-w-4xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] block mb-4">
              {service.detail}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight drop-shadow-lg">
              {service.title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 pb-24">
          
          {/* Description & Comments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20 animate-fade-in-up">
            
            {/* Description Section */}
            <div>
               <h3 className="text-2xl md:text-3xl font-serif text-[#001D3C] mb-6">Service Overview</h3>
               <p className="text-lg text-muted leading-relaxed">
                  {service.description}
               </p>

               {/* Buttons */}
               <div className="mt-10 flex flex-wrap items-center gap-4">
                 <Link
                  href="/home#quote"
                  className="inline-block text-[11px] font-bold uppercase tracking-widest2 bg-[#001D3C] text-white px-8 py-4 hover:bg-[#FEBE01] hover:text-[#001D3C] transition-all duration-300 transform hover:-translate-y-1"
                 >
                  Get a Quote
                 </Link>
                 <Link
                  href={`/projects/${slug}`}
                  className="inline-block text-[11px] font-bold uppercase tracking-widest2 border-2 border-[#001D3C] text-[#001D3C] px-8 py-3.5 hover:bg-[#001D3C] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                 >
                  View Related Projects
                 </Link>
               </div>
            </div>

            {/* Comments/Testimonials */}
            <div className="flex flex-col gap-6 lg:border-l border-charcoal/10 lg:pl-16">
               <h3 className="text-[11px] font-bold uppercase tracking-widest2 text-stone mb-2">What They Say</h3>
               {service.comments.map((comment: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-charcoal/5 relative">
                     <svg className="absolute top-4 left-4 w-8 h-8 text-[#FEBE01]/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                     </svg>
                     <p className="text-charcoal italic leading-relaxed relative z-10 pl-6">"{comment.text}"</p>
                     <span className="block mt-4 text-[11px] font-bold uppercase tracking-widest2 text-muted text-right">
                        — {comment.author}
                     </span>
                  </div>
               ))}
            </div>

          </div>

          {/* Array of Images (Gallery) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-serif text-[#001D3C]">Gallery</h3>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {service.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="relative h-[250px] md:h-[350px] rounded-lg overflow-hidden group shadow-sm bg-charcoal/5">
                     <AppImage
                       src={img.url}
                       alt={img.alt}
                       fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                       sizes="(max-width: 768px) 100vw, 33vw"
                     />
                  </div>
               ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
