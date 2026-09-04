import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#06b6d4] to-cyan-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                WE MAKE <span className="text-[#0891b2]">SMILES</span>
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Pioneering modern dental excellence and bespoke smile design in a tranquil, state-of-the-art clinical environment.
            </p>
            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-4 h-4 text-[#0891b2]" />
              <span className="text-[11px] font-medium">HIPAA Compliant & ADA Accredited</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li><Link href="#hero-tour" className="hover:text-[#0891b2] transition font-medium">Reception Walkthrough</Link></li>
              <li><Link href="#results-gallery" className="hover:text-[#0891b2] transition font-medium">Results Gallery</Link></li>
              <li><Link href="#clinic-continuity" className="hover:text-[#0891b2] transition font-medium">Clinic Continuity</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Treatments & Services</Link></li>
              <li><Link href="#about-us" className="hover:text-[#0891b2] transition font-medium">Our Doctors & Story</Link></li>
              <li><Link href="#booking" className="hover:text-[#0891b2] transition font-medium">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Treatments</h4>
            <ul className="space-y-2.5">
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Cosmetic Porcelain Veneers</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Invisalign® Clear Aligners</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Guided Dental Implants</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Laser Teeth Whitening</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Painless Routine Cleanings</Link></li>
              <li><Link href="#services" className="hover:text-[#0891b2] transition font-medium">Emergency Dental Triage</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Visit & Connect</h4>
            <div className="space-y-2.5 text-slate-600">
              <p>450 Aesthetic Plaza, Suite 300<br />Beverly Hills, CA 90210</p>
              <p className="text-slate-900 font-bold">(800) 555-SMILE</p>
              <p>care@wemakesmiles.dental</p>
              <p className="text-emerald-700 font-semibold pt-1">Open Mon – Sat for Appointments</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} WE MAKE SMILES Dental Center. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-slate-800 transition font-medium">
              Staff Portal
            </Link>
            <Link href="#hero-tour" className="hover:text-[#0891b2] font-semibold flex items-center gap-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
