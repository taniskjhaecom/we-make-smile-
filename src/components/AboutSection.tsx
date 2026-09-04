import React from 'react';
import { Award, CheckCircle2, Heart, Shield, Sparkles, Stethoscope, Users } from 'lucide-react';
import Image from 'next/image';

interface DoctorProfile {
  name: string;
  role: string;
  credentials: string[];
  bio: string;
  image: string;
}

const doctors: DoctorProfile[] = [
  {
    name: 'Dr. Elena Vance, DDS, FAGD',
    role: 'Lead Cosmetic & Restorative Specialist',
    credentials: [
      'Doctor of Dental Surgery (UCLA School of Dentistry)',
      'Fellow of the Academy of General Dentistry (FAGD)',
      '15+ Years Clinical Excellence in Aesthetic Veneers',
    ],
    bio: 'Dr. Vance pioneered digital smile design protocols that prioritize natural tooth conservation while delivering stunning, magazine-ready smile transformations.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dr. Marcus Rivera, DMD, MS',
    role: 'Director of Oral Surgery & Implantology',
    credentials: [
      'Master of Science & Periodontal Specialty (Columbia University)',
      'Diplomate, American Board of Periodontology',
      'Over 4,500 Successful Computer-Guided Implant Placements',
    ],
    bio: 'Dr. Rivera specializes in minimally invasive computer-guided implant surgeries and bone regeneration, making dental restoration effortless and anxiety-free.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us" className="relative py-24 sm:py-32 bg-white border-t border-slate-200 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Heart className="w-4 h-4" />
            <span>Our Philosophy & Clinic Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            Crafting Confident Smiles Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">Compassion & Precision</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with a singular mission: to eliminate dental anxiety and provide an extraordinary clinical experience where high-tech modern dentistry meets bespoke personal care.
          </p>
        </div>

        {/* Story & Mission Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center mb-6 text-[#0891b2]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To elevate oral healthcare by combining artistic design principles, gentle touch dentistry, and cutting-edge 3D digital precision so every patient loves their smile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-[#0891b2] font-bold">
              100% Patient-Centric Focus
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center mb-6 text-teal-700">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Painless Promise</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We employ computerized Single Tooth Anesthesia (STA), soothing aromatherapy, ceiling cinema monitors, and noise-cancelling headphones for zero-discomfort visits.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-teal-700 font-bold">
              Anxiety-Free Protocol
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-6 text-emerald-700">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Technology</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Equipped with HD 3D Cone Beam CT scans, iTero Lumina 3D scanners, and CAD/CAM same-day ceramic mills for unmatched diagnosis accuracy and swift treatment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-emerald-700 font-bold">
              Next-Gen Medical Suite
            </div>
          </div>
        </div>

        {/* Doctor Profiles & Team Showcase */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <Users className="w-6 h-6 text-[#0891b2]" />
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Meet Our Clinical Leaders</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 144px, 176px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-1.5 text-[#0891b2] text-xs font-bold mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Board Certified Dental Specialist</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-sm font-semibold text-slate-500 mb-3">{doc.role}</p>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">{doc.bio}</p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200">
                    {doc.credentials.map((cred, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
