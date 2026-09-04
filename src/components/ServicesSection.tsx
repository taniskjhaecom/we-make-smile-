import React from 'react';
import { 
  Sparkles, 
  Smile, 
  ShieldCheck, 
  Activity, 
  HeartHandshake, 
  Zap, 
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const services: ServiceItem[] = [
  {
    id: 'cosmetic-veneers',
    title: 'Cosmetic Veneers & Bonding',
    subtitle: 'Porcelain & Composite Artistry',
    description:
      'Ultra-thin custom porcelain veneers and master composite bonding handcrafted to correct discoloration, gaps, and chips with lifelike natural translucency.',
    icon: Sparkles,
    tags: ['Custom Shade Match', 'Digital Smile Design', 'Minimally Invasive'],
  },
  {
    id: 'invisalign-ortho',
    title: 'Invisalign® & Clear Aligners',
    subtitle: 'Discreet Orthodontic Straightening',
    description:
      'State-of-the-art 3D digital treatment planning for teens and adults. Straighten your teeth comfortably without metal brackets or wires.',
    icon: Smile,
    tags: ['iTero 3D Scanning', 'Fast Turnaround', 'Virtually Invisible'],
  },
  {
    id: 'dental-implants',
    title: 'Permanent Dental Implants',
    subtitle: 'Single Tooth to Full-Arch Teeth-in-a-Day',
    description:
      'Biocompatible titanium & zirconia implants with precision CBCT guided surgery restoring 100% biting power and aesthetic confidence.',
    icon: Award,
    tags: ['Guided Surgery', 'All-on-X Options', 'Lifetime Warranty'],
  },
  {
    id: 'laser-whitening',
    title: 'Laser Teeth Whitening',
    subtitle: 'In-Office LED & Laser Brightening',
    description:
      'Achieve up to 8 shades whiter in a single 45-minute appointment using gentle, sensitivity-free medical grade whitening protocols.',
    icon: Zap,
    tags: ['Zero Sensitivity', 'Same-Day Results', 'Enamel Safe'],
  },
  {
    id: 'pediatric-family',
    title: 'Family & Preventive Care',
    subtitle: 'Comprehensive Gentle Dentistry',
    description:
      'Comprehensive dental wellness exams, gentle ultrasonic cleanings, fluoride treatments, and oral cancer screenings for all ages in a calm environment.',
    icon: HeartHandshake,
    tags: ['Child Friendly', 'Preventive First', 'Stress-Free'],
  },
  {
    id: 'emergency-care',
    title: 'Emergency Dental Care',
    subtitle: 'Same-Day Urgent Appointments',
    description:
      'Fast relief for severe toothaches, broken crowns, dental trauma, and urgent infections. Same-day emergency walk-ins and phone triage available.',
    icon: Activity,
    tags: ['Same-Day Relief', 'Painless Anesthesia', '24/7 Triage'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-slate-50 text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-[#0891b2] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Comprehensive Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            Specialized Treatments & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] via-cyan-600 to-blue-600">Aesthetic Care</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From precision smile design to complex reconstructive care, our clinic combines cutting-edge dental technology with unmatched artistic detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white hover:bg-white border border-slate-200 hover:border-cyan-400 rounded-3xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#0891b2] group-hover:text-white transition-all duration-300 shadow-sm text-[#0891b2]">
                    <Icon className="w-7 h-7 transition-colors" />
                  </div>

                  <span className="text-xs font-bold text-[#0891b2] tracking-wide uppercase block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0891b2] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="#booking"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0891b2] group-hover:text-cyan-700 mt-2 transition"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
