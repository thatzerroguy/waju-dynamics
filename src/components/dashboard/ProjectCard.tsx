import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Button } from '@/components/ui/button';
import ManageProjectDialog from './ManageProjectDialog';
import { MapPin, Clock } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  client: string | null;
  year: string | null;
  location: string | null;
  duration: string | null;
  description: string | null;
  mainImage: string | null;
  media: string | null;
  metrics: string | null;
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColor =
    project.status === 'active'
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : 'bg-[#F2F2F2] text-[#888888] border-[#EAEAEA]';

  return (
    <div className="group flex flex-col bg-white border border-[#EAEAEA] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Card Image */}
      <div className="relative w-full h-[200px] bg-[#F2F2F2] shrink-0 overflow-hidden">
        {project.mainImage ? (
          <AppImage
            src={project.mainImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#CCCCCC] text-[11px] font-semibold uppercase tracking-widest">No Image</span>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded bg-[#001D3C]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-semibold capitalize ${statusColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'active' ? 'bg-emerald-500' : 'bg-[#CCCCCC]'}`} />
            {project.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-[#111111] leading-snug line-clamp-2">{project.name}</h3>
          {project.client && (
            <p className="text-xs text-[#888888] mt-1 font-medium">{project.client}</p>
          )}
        </div>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-2">
          {project.location && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#666666]">
              <MapPin className="w-3 h-3 text-[#AAAAAA]" />
              {project.location}
            </span>
          )}
          {project.duration && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#666666]">
              <Clock className="w-3 h-3 text-[#AAAAAA]" />
              {project.duration}
            </span>
          )}
        </div>

        {/* Push button to bottom */}
        <div className="mt-auto pt-2">
          <ManageProjectDialog project={project}>
            <Button className="w-full bg-[#111111] hover:bg-[#333333] text-white h-9 text-xs font-medium rounded-lg">
              Manage Project
            </Button>
          </ManageProjectDialog>
        </div>
      </div>
    </div>
  );
}
