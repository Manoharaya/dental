import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { PageType } from '../../types/navigation';

interface PageHeaderProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle: string;
  currentPageName: string;
  onNavigate: (page: PageType) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  currentPageName,
  onNavigate,
}) => {
  return (
    <div className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-[#F5F1EA] border-b border-[#1B2B27]/08 relative overflow-hidden">
      {/* Ambient soft diffused glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[250px] bg-[#D4EFE8]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[200px] bg-[#F9EBE7]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#536963] mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#3E8E7E] transition-colors font-medium"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#536963]/50" />
          <span className="text-[#1B2B27] font-semibold">{currentPageName}</span>
        </nav>

        {/* Badge & Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3E8E7E]/10 border border-[#3E8E7E]/20 text-[#3E8E7E] text-xs font-medium mb-3">
            {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#3E8E7E]" />}
            <span>{badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1B2B27] tracking-tight leading-tight">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-base lg:text-lg text-[#536963] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
