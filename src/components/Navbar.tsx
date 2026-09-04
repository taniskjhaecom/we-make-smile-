'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Clinic Tour', href: '#hero-tour' },
    { name: 'Results Gallery', href: '#results-gallery' },
    { name: 'Continuity Flow', href: '#clinic-continuity' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Location & Map', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Clinic Brand */}
        <Link href="#hero-tour" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block leading-none">
              WE MAKE <span className="text-cyan-400">SMILES</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase block mt-1">
              Advanced Dental & Aesthetic Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+18005557645"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-700/60 rounded-full transition"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>(800) 555-SMILE</span>
          </a>
          <Link
            href="#booking"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:opacity-95 shadow-md shadow-cyan-500/20 rounded-full transition transform active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 mt-3 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-900/80 rounded-xl transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <a
              href="tel:+18005557645"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call Us: (800) 555-SMILE</span>
            </a>
            <Link
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl shadow-lg shadow-cyan-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
