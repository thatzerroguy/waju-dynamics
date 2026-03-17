'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface MediaItem {
  type: string;
  url: string;
  alt: string;
}

export default function ProjectGallery({ media }: { media: MediaItem[] }) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  if (!media || media.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-xl font-serif text-[#001D3C]">Gallery & Media</h3>
        <div className="h-px flex-1 bg-charcoal/10" />
      </div>

      <div className="flex overflow-x-auto gap-4 pb-6 snap-x hide-scrollbar pointer-events-auto">
        {media.map((item, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-[280px] md:w-[400px] h-[300px] snap-start relative rounded-lg overflow-hidden cursor-pointer group shadow-sm bg-charcoal/5"
            onClick={() => setSelectedMedia(item.url)}
          >
            {item.type === 'video' ? (
              <video src={item.url} className="w-full h-full object-cover" />
            ) : (
              <AppImage
                src={item.url}
                alt={item.alt || `Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, 400px"
              />
            )}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {item.type === 'video' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  )}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

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
             {media.find(m => m.url === selectedMedia)?.type === 'video' ? (
               <video src={selectedMedia} controls autoPlay className="w-full h-full object-contain bg-black" />
             ) : (
               <AppImage
                  src={selectedMedia}
                  alt="Enlarged media"
                  fill
                  className="object-contain bg-black"
                  sizes="100vw"
               />
             )}
          </div>
        </div>
      )}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
