'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Mock data structure mimicking a database/admin API response
const projectDetails: Record<string, Record<string, any>> = {
  'fuel-haulage': {
    'national-grid-secondary-supply': {
      title: 'National Grid Secondary Supply',
      client: 'Federal Ministry of Energy',
      location: 'Abuja & Environs, Nigeria',
      duration: '6 Months',
      description: 'The National Grid Secondary Supply project was a critical logistical operation aimed at maintaining continuous power generation across 12 regional distribution hubs. Waju Dynamics was tasked with the rigorous challenge of ensuring zero downtime for these facilities by providing an uninterrupted, direct-to-facility diesel delivery network. We deployed a dedicated fleet of our most advanced tankers, monitored 24/7 by our central logistics command.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png',
      metrics: [
        { label: 'Total Volume Delivered', value: '4.2M Litres' },
        { label: 'On-time Metric', value: '99.8%' },
        { label: 'Fleet Deployed', value: '25 Tankers' },
        { label: 'Safety Incidents', value: 'Zero (0)' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Convoy of fuel tankers on the highway' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Offloading operation at a distribution hub' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Safety inspection check' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Night time delivery operations' },
      ]
    },
    'metro-gas-station-network': {
      title: 'Metro Gas Station Network',
      client: 'Metro Energy Ltd',
      location: 'Lagos, Ogun, Oyo States',
      duration: 'Ongoing',
      description: 'As the sole haulage partner for Metro Energy Ltd, we coordinate daily high-volume petrol deliveries across three states. This project demonstrates our capacity to scale and adapt to a rapidly growing retail network.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png',
      metrics: [
        { label: 'Stations Served', value: '45+' },
        { label: 'Daily Volume', value: '1.5M Litres' },
        { label: 'Routes Covered', value: '12 Major Hubs' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Metro gas station delivery' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Tanker filling operations' },
      ]
    }
  },
  'equipment-hire': {
    'lagos-ibadan-expressway-expansion': {
      title: 'Lagos-Ibadan Expressway Expansion',
      client: 'Julius Berger',
      location: 'Lagos / Ogun State Border',
      duration: '18 Months',
      description: 'Waju Dynamics provided critical heavy machinery for Phase 3 of the Lagos-Ibadan Expressway expansion. Our fleet of excavators and compactors worked tirelessly to ensure the road network met the strict infrastructural timelines set by the federal government. We also provided on-site maintenance crews to guarantee zero equipment downtime.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png',
      metrics: [
        { label: 'Equipment Deployed', value: '23 Units' },
        { label: 'Operational Hours', value: '15,000+ Hrs' },
        { label: 'Site Clearing', value: '45 Hectares' },
        { label: 'Earth Moving', value: '1.2M Cubic Yds' },
        { label: 'Compaction', value: 'Passed All Tests' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Excavators in action on the expressway' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Compactor leveling the ground' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Onsite maintenance crew' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Heavy duty crane lifting materials' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Wide shot of the construction site' },
      ]
    },
    'eko-atlantic-phase-2-dredging': {
      title: 'Eko Atlantic Phase II Dredging',
      client: 'South Energy',
      location: 'Victoria Island, Lagos',
      duration: '8 Months',
      description: 'Specialized long-reach excavators and loaders were deployed to support land reclamation and initial foundation preparation works for the Eko Atlantic Phase II project.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png',
      metrics: [
        { label: 'Long-reach Excavators', value: '8 Units' },
        { label: 'Sand Dredged', value: '500k Tons' },
        { label: 'Timeline', value: 'Completed' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Dredging excavators' },
      ]
    }
  },
  'real-estate': {
    'the-waju-residences': {
      title: 'The Waju Residences',
      client: 'Internal Project',
      location: 'Ikoyi, Lagos',
      duration: '24 Months',
      description: 'Designed and developed as our flagship residential project, The Waju Residences is a premium 24-unit complex reflecting modern minimalist architecture. We handled everything from foundational piling to smart-home integration and premium finishing.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png',
      metrics: [
        { label: 'Units Built', value: '24 Luxury Aprts' },
        { label: 'Concrete Work', value: '10,000+ CBM' },
        { label: 'Reinforcement', value: '1,500 Tons' },
        { label: 'Finishing', value: 'Grade A Premium' },
        { label: 'Smart Tech', value: 'Full Integration' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Exterior night view of the residences' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Interior living room displaying modern finish' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png', alt: 'Construction phase - concreting' },
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png', alt: 'Smart home hub installation' },
      ]
    },
    'victoria-island-tech-hub': {
      title: 'Victoria Island Tech Hub',
      client: 'Innova Group',
      location: 'Victoria Island, Lagos',
      duration: '16 Months',
      description: 'End-to-end construction of a 4-story commercial office building designed specifically for tech startups. Features open plan workspaces and high-speed network infrastructure.',
      mainImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png',
      metrics: [
        { label: 'Total Area', value: '45,000 SqFt' },
        { label: 'Stories', value: '4 Levels' },
        { label: 'Networking', value: 'Fiber Optics' },
      ],
      media: [
        { type: 'image', url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png', alt: 'Tech hub exterior' },
      ]
    }
  }
};

export default function ProjectDetail({ params }: { params: { categorySlug: string, projectSlug: string } }) {
  // Use React.use to unwrap params in Next.js 15
  const unwrappedParams = React.use(params as any) as { categorySlug: string, projectSlug: string };
  const { categorySlug, projectSlug } = unwrappedParams;
  
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const category = projectDetails[categorySlug];
  if (!category) notFound();

  const project = category[projectSlug];
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Full width main image */}
        <div className="relative w-full h-[60vh] md:h-[80vh]">
          <AppImage
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          
          <div className="absolute top-24 left-6 md:left-10 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-cream/80">
            <Link href="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/projects/${categorySlug}`} className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </div>

          <div className="absolute bottom-10 left-6 md:left-10 z-10 max-w-4xl text-white">
            <span className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] block mb-4">
              {project.client}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight drop-shadow-lg">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 pb-24">
          
          {/* Project Header Info & Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 animate-fade-in-up">
            <div className="md:col-span-4 flex flex-col gap-6 border-l-2 border-[#FEBE01] pl-6 pt-2 h-fit">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest2 text-muted mb-1">Location</h4>
                <p className="text-md text-charcoal font-medium">{project.location}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest2 text-muted mb-1">Duration</h4>
                <p className="text-md text-charcoal font-medium">{project.duration}</p>
              </div>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-3xl font-serif text-[#001D3C] mb-6">About The Project</h3>
              <p className="text-lg text-muted leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Horizontal Scrollable Metrics */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-serif text-[#001D3C]">Project Metrics</h3>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>
            
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar pointer-events-auto">
              {project.metrics.map((metric: any, idx: number) => (
                <div key={idx} className="flex-shrink-0 w-[240px] md:w-[300px] snap-start p-8 rounded-lg shadow-sm border border-charcoal/5 group hover:border-[#FEBE01] transition-colors">
                  <span className="block text-2xl md:text-2xl font-serif text-[#001D3C] group-hover:text-[#FEBE01] transition-colors mb-3">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Scrollable Media Array */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-serif text-[#001D3C]">Gallery & Media</h3>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>

            <div className="flex overflow-x-auto gap-4 pb-6 snap-x hide-scrollbar pointer-events-auto">
              {project.media.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[280px] md:w-[400px] h-[300px] snap-start relative rounded-lg overflow-hidden cursor-pointer group shadow-sm bg-charcoal/5"
                  onClick={() => setSelectedMedia(item.url)}
                >
                  <AppImage
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 400px"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />

      {/* Modal for viewing media */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#FEBE01] z-[101]"
            onClick={() => setSelectedMedia(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             <AppImage
                src={selectedMedia}
                alt="Enlarged media"
                fill
                className="object-contain bg-black"
                sizes="100vw"
             />
          </div>
        </div>
      )}

      {/* Basic styles to hide scrollbar but allow scrolling */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
