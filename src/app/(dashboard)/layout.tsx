'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderKanban, Settings, LogOut, Briefcase } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Services', href: '/services', icon: Briefcase },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-[#111111] font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#EAEAEA] bg-white flex-col justify-between hidden md:flex h-full">
        <div className="px-6 py-8">
          <Link href="/home" className="block mb-10">
            <AppLogo size={140} />
          </Link>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F2F2F2] text-[#111111]'
                      : 'text-[#666666] hover:bg-[#F8F8F8] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-6 border-t border-[#EAEAEA]">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium text-[#666666] hover:bg-[#F8F8F8] hover:text-[#111111] w-full transition-colors text-left">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
