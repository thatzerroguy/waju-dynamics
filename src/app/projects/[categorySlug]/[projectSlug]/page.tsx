import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProjectGallery from './ProjectGallery';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; projectSlug: string }>;
}) {
  const { categorySlug, projectSlug } = await params;
  
  // Fetch real data from Prisma
  const project = await prisma.project.findUnique({
    where: { slug: projectSlug }
  });

  // Handle "no current project" or category mismatch
  if (!project || project.categorySlug !== categorySlug) {
    return (
      <>
        <Header />
        <main className="min-h-[75vh] bg-cream flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-charcoal/5 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#001D3C] mb-4">No Current Project</h2>
          <p className="text-muted max-w-md mb-8">
            The project you are looking for does not exist, has been removed, or the link is incorrect.
          </p>
          <Link href={`/projects/${categorySlug}`} className="px-8 py-3 bg-[#FEBE01] text-charcoal font-bold uppercase tracking-widest2 text-[11px] hover:bg-black hover:text-[#FEBE01] transition-colors rounded-sm shadow-sm inline-block">
            View Other Projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Parse JSON data, fallback to empty arrays to prevent crashes
  let metrics = [];
  try { metrics = project.metrics ? JSON.parse(project.metrics) : []; } catch (e) {}

  let media = [];
  try { media = project.media ? JSON.parse(project.media) : []; } catch (e) {}

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Full width main image */}
        <div className="relative w-full h-[60vh] md:h-[80vh] bg-charcoal">
          {project.mainImage ? (
            <AppImage
              src={project.mainImage}
              alt={project.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <span className="text-white text-4xl font-serif">No Image Available</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          
          <div className="absolute top-24 left-6 md:left-10 z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest2 text-cream/80">
            <Link href="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/projects/${categorySlug}`} className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white">{project.name}</span>
          </div>

          <div className="absolute bottom-10 left-6 md:left-10 z-10 max-w-4xl text-white">
            {project.client && (
              <span className="text-[11px] font-bold uppercase tracking-widest2 text-[#FEBE01] block mb-4">
                {project.client}
              </span>
            )}
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight drop-shadow-lg">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 pb-24">
          
          {/* Project Header Info & Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 animate-fade-in-up">
            <div className="md:col-span-4 flex flex-col gap-6 border-l-2 border-[#FEBE01] pl-6 pt-2 h-fit">
              {project.location && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest2 text-muted mb-1">Location</h4>
                  <p className="text-md text-charcoal font-medium">{project.location}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest2 text-muted mb-1">Duration</h4>
                  <p className="text-md text-charcoal font-medium">{project.duration}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest2 text-muted mb-1">Year</h4>
                  <p className="text-md text-charcoal font-medium">{project.year}</p>
                </div>
              )}
            </div>
            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-3xl font-serif text-[#001D3C] mb-6">About The Project</h3>
              <p className="text-lg text-muted leading-relaxed whitespace-pre-line">
                {project.description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Horizontal Scrollable Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xl font-serif text-[#001D3C]">Project Metrics</h3>
                <div className="h-px flex-1 bg-charcoal/10" />
              </div>
              
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x hide-scrollbar pointer-events-auto">
                {metrics.map((metric: any, idx: number) => (
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
          )}

          {/* Extracted Client Component for Gallery */}
          <ProjectGallery media={media} />

        </div>
      </main>
      <Footer />
    </>
  );
}
