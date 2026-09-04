'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Calendar, Phone } from 'lucide-react';

export interface NavSectionItem {
  id: string;
  label: string;
}

export interface NavigationProps {
  /** Array of section IDs or section objects to track and navigate to */
  sections?: (string | NavSectionItem)[];
  /** Optional custom class name */
  className?: string;
}

const DEFAULT_SECTIONS: NavSectionItem[] = [
  { id: 'hero-tour', label: 'Home' },
  { id: 'results-gallery', label: 'Gallery' },
  { id: 'clinic-continuity', label: 'Videos' },
  { id: 'services', label: 'Services' },
  { id: 'about-us', label: 'About Us' },
  { id: 'location', label: 'Location' },
  { id: 'booking', label: 'Book Appointment' },
];

/**
 * Navigation: Transparent Frosted Glass Sticky Header for WE MAKE SMILES Dental Clinic
 */
export const Navigation: React.FC<NavigationProps> = ({
  sections = DEFAULT_SECTIONS,
  className = '',
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero-tour');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Normalize sections array into standard items
  const navItems: NavSectionItem[] = React.useMemo(() => {
    return sections.map((item) => {
      if (typeof item === 'string') {
        const cleanId = item.replace(/^#/, '');
        const labelMap: Record<string, string> = {
          'hero-tour': 'Home',
          home: 'Home',
          'results-gallery': 'Gallery',
          gallery: 'Gallery',
          'clinic-continuity': 'Videos',
          videos: 'Videos',
          services: 'Services',
          'about-us': 'About Us',
          about: 'About Us',
          location: 'Location',
          booking: 'Book Appointment',
        };
        return {
          id: cleanId,
          label: labelMap[cleanId] || cleanId.charAt(0).toUpperCase() + cleanId.slice(1),
        };
      }
      return {
        id: item.id.replace(/^#/, ''),
        label: item.label,
      };
    });
  }, [sections]);

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      const headerOffset = 160;
      let currentActive = navItems[0]?.id || 'hero-tour';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop - headerOffset) {
            currentActive = item.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-white/30 backdrop-blur-2xl border-b border-white/30 shadow-md py-3'
          : 'bg-white/15 backdrop-blur-xl border-b border-white/20 py-4 sm:py-4.5'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Clinic Logo & Brand */}
        <Link
          href="#hero-tour"
          onClick={(e) => handleScrollTo(e, 'hero-tour')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-cyan-500 flex items-center justify-center shadow-md shadow-[#06b6d4]/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white font-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-none font-sans drop-shadow-sm">
              WE MAKE <span className="text-[#0891b2]">SMILES</span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mt-1 block">
              Dental & Aesthetic Center
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Transparent Frosted Glass Capsule) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/40 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#0891b2] shadow-sm'
                    : 'text-slate-800 hover:text-[#0891b2] hover:bg-white/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+18005557645"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 hover:text-[#0891b2] bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/40 rounded-full transition shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#0891b2]" />
            <span>(800) 555-SMILE</span>
          </a>

          {/* Teal CTA Button */}
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, 'booking')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-extrabold text-white bg-[#0891b2]/90 hover:bg-[#0891b2] backdrop-blur-md hover:shadow-md hover:shadow-cyan-500/20 active:scale-95 shadow-sm rounded-full transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/40 backdrop-blur-xl border border-white/40 text-slate-800 hover:text-[#0891b2] focus:outline-none transition shadow-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu (Transparent Glass) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/80 backdrop-blur-3xl border-b border-white/30 px-6 py-5 mt-2 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0891b2] text-white font-bold shadow-sm'
                      : 'text-slate-800 hover:text-[#0891b2] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-200/60 flex flex-col gap-3">
            <a
              href="tel:+18005557645"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-slate-800 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl"
            >
              <Phone className="w-4 h-4 text-[#0891b2]" />
              <span>Call: (800) 555-SMILE</span>
            </a>
            <a
              href="#booking"
              onClick={(e) => handleScrollTo(e, 'booking')}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-extrabold text-white bg-[#0891b2] hover:bg-cyan-600 rounded-xl shadow-md transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
