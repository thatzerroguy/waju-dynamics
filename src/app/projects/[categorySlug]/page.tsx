import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const projectsData: Record<string, { title: string; category: string; description: string; projects: { slug: string; name: string; client: string; year: string; image: string; summary: string }[] }> = {
  'fuel-haulage': {
    title: 'Fuel Haulage & Delivery Projects',
    category: 'Fuel Haulage',
    description: 'Explore our track record of ensuring consistent, safe, and on-time fuel delivery networks over the past four years.',
    projects: [
      {
        slug: 'national-grid-secondary-supply',
        name: 'National Grid Secondary Supply',
        client: 'Federal Ministry of Energy',
        year: '2025',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png',
        summary: 'Managed a continuous supply line of diesel to 12 regional distribution hubs, achieving a 99.8% on-time delivery metric over a 6-month intensive contract.'
      },
      {
        slug: 'metro-gas-station-network',
        name: 'Metro Gas Station Network',
        client: 'Metro Energy Ltd',
        year: '2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png',
        summary: 'Sole haulage partner for a growing network of modern gas stations, coordinating daily high-volume petrol deliveries across 3 states.'
      }
    ]
  },
  'equipment-hire': {
    title: 'Equipment Hire Projects',
    category: 'Equipment Hire',
    description: 'See how our well-maintained heavy duty machinery has powered critical infrastructural and industrial developments.',
    projects: [
      {
        slug: 'lagos-ibadan-expressway-expansion',
        name: 'Lagos-Ibadan Expressway Expansion',
        client: 'Julius Berger',
        year: '2024-2025',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png',
        summary: 'Supplied a fleet of 15 excavators and 8 compactors for phase 3 of the expressway expansion, along with dedicated operators and on-site maintenance.'
      },
      {
        slug: 'eko-atlantic-phase-2-dredging',
        name: 'Eko Atlantic Phase II Dredging',
        client: 'South Energy',
        year: '2023',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11732723d-1772619079281.png',
        summary: 'Provided specialized long-reach excavators and loaders to support land reclamation and initial foundation preparation works.'
      }
    ]
  },
  'real-estate': {
    title: 'Real Estate Projects',
    category: 'Real Estate',
    description: 'A look into our growing portfolio of modern residential and commercial properties built with precision and elegance.',
    projects: [
      {
        slug: 'the-waju-residences',
        name: 'The Waju Residences',
        client: 'Internal Project',
        year: '2025',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fd8d84e-1772619079454.png',
        summary: 'A premium 24-unit residential complex featuring smart home technology, sustainable energy solutions, and modern minimalist architecture. Completed ahead of schedule.'
      },
      {
        slug: 'victoria-island-tech-hub',
        name: 'Victoria Island Tech Hub',
        client: 'Innova Group',
        year: '2024',
        image: 'https://img.rocket.new/generatedImages/rocket_gen_img_108202a09-1772619079286.png',
        summary: 'End-to-end construction of a 4-story commercial office building designed specifically for tech startups, including open plan workspaces and high-speed network infrastructure.'
      }
    ]
  }
};

export default async function ProjectPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const projectCategory = projectsData[categorySlug];

  if (!projectCategory) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-cream min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-muted mb-8">
            <Link href="/home" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span className="text-charcoal">{projectCategory.category}</span>
          </div>

          <div className="mb-16 max-w-2xl animate-fade-in-up">
             <span className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] mb-4 block">
                Our Work
             </span>
             <h1 className="font-serif text-5xl md:text-6xl tracking-tighter leading-tight text-[#001D3C] mb-6">
                {projectCategory.title}
             </h1>
             <p className="text-lg text-muted leading-relaxed">
                {projectCategory.description}
             </p>
          </div>

          {/* Projects List */}
          <div className="space-y-20">
            {projectCategory.projects.map((project, idx) => (
              <div key={idx} className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Image */}
                <div className={`col-span-1 md:col-span-7 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <AppImage
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-[#001D3C]/5" />
                </div>
                
                {/* Content */}
                <div className={`col-span-1 md:col-span-5 flex flex-col gap-4 ${idx % 2 !== 0 ? 'md:order-1 md:pr-12' : 'md:pl-12'}`}>
                  <div className="flex items-center justify-between border-b border-charcoal/10 pb-4 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest2 text-stone">
                      {project.client}
                    </span>
                    <span className="text-[11px] font-mono text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#001D3C] leading-tight group-hover:text-[#FEBE01] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mt-2">
                    {project.summary}
                  </p>
                  
                  <div className="mt-6">
                    <Link href={`/projects/${categorySlug}/${project.slug}`} className="inline-flex text-[11px] font-bold uppercase tracking-widest2 text-[#001D3C] hover:text-[#FEBE01] transition-colors border-b-2 border-transparent hover:border-[#FEBE01] pb-1 items-center gap-2">
                      View full details
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
