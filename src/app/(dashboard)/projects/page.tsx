import React from 'react';
import prisma from '@/lib/prisma';
import UploadProjectDialog from '@/components/dashboard/UploadProjectDialog';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const dynamic = 'force-dynamic';

export default async function ProjectsDashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">Projects</h1>
          <p className="text-sm text-[#666666] mt-1">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} in your portfolio.
          </p>
        </div>
        <UploadProjectDialog />
      </div>

      {/* Search bar */}
      <div className="relative w-72 mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
        <Input
          placeholder="Search projects..."
          className="pl-9 h-9 border-[#EAEAEA] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[#111111]"
        />
      </div>

      {/* Cards Grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#EAEAEA] rounded-2xl bg-[#FAFAFA]">
          <div className="w-12 h-12 bg-[#F2F2F2] rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-[#888888] text-sm font-medium">No projects yet</p>
          <p className="text-[#BBBBBB] text-xs mt-1">Click &quot;+ Add Project&quot; to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
