import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const categoryMetadata: Record<string, { title: string; category: string; description: string }> = {
  'fuel-haulage': {
    title: 'Fuel Haulage & Delivery Projects',
    category: 'Fuel Haulage',
    description: 'Explore our track record of ensuring consistent, safe, and on-time fuel delivery networks over the past four years.',
  },
  'equipment-hire': {
    title: 'Equipment Hire Projects',
    category: 'Equipment Hire',
    description: 'See how our well-maintained heavy duty machinery has powered critical infrastructural and industrial developments.',
  },
  'real-estate': {
    title: 'Real Estate Projects',
    category: 'Real Estate',
    description: 'A look into our growing portfolio of modern residential and commercial properties built with precision and elegance.',
  }
};

export default async function ProjectPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const projectCategory = categoryMetadata[categorySlug];

  if (!projectCategory) {
    notFound();
  }

  const projects = await prisma.project.findMany({
    where: { categorySlug },
    orderBy: { createdAt: 'desc' }
  });

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
          {projects.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-[#001D3C] mb-2">No Projects Found</h2>
              <p className="text-muted">There are currently no projects listed in this category.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {projects.map((project, idx) => (
                <div key={project.id} className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Image */}
                  <div className={`col-span-1 md:col-span-7 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md bg-charcoal/5 ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                    {project.mainImage ? (
                      <AppImage
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted font-serif">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#001D3C]/5" />
                  </div>
                  
                  {/* Content */}
                  <div className={`col-span-1 md:col-span-5 flex flex-col gap-4 ${idx % 2 !== 0 ? 'md:order-1 md:pr-12' : 'md:pl-12'}`}>
                    <div className="flex items-center justify-between border-b border-charcoal/10 pb-4 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest2 text-stone">
                        {project.client || 'Waju Dynamics'}
                      </span>
                      <span className="text-[11px] font-mono text-muted">
                        {project.year || 'Ongoing'}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#001D3C] leading-tight group-hover:text-[#FEBE01] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mt-2 line-clamp-4">
                      {project.description || 'No description provided for this project.'}
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
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
