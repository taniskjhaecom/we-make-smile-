import React from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-24 sm:py-32 bg-slate-50 text-slate-900 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-[#0891b2] text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4" />
            <span>Prime City Center Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] to-blue-600">Modern Dental Center</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Conveniently located with dedicated valet parking and direct ground-floor accessibility designed for maximum comfort.
          </p>
        </div>

        {/* Location Info & Google Maps Responsive 16:9 Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 text-[#0891b2]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Clinic Address</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    450 Aesthetic Plaza, Suite 300<br />
                    Beverly Medical District, CA 90210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 text-teal-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Hours of Operation</h4>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1 space-y-1">
                    <div className="flex justify-between gap-4">
                      <span>Mon – Fri:</span>
                      <span className="text-slate-900 font-semibold">8:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Saturday:</span>
                      <span className="text-slate-900 font-semibold">9:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sunday:</span>
                      <span className="text-[#0891b2] font-semibold">Emergency Triage Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Telephone & Direct Desk</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Appointments: <a href="tel:+18005557645" className="text-[#0891b2] font-bold hover:underline">(800) 555-SMILE</a><br />
                    Direct Desk: <a href="tel:+13105550198" className="text-slate-700 hover:underline">(310) 555-0198</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Concierge Email</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    <a href="mailto:care@wemakesmiles.dental" className="text-[#0891b2] font-semibold hover:underline">
                      care@wemakesmiles.dental
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Maps in Responsive 16:9 Aspect Ratio Container */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-2 sm:p-3">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <iframe
                title="WE MAKE SMILES Dental Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105747.01186716942!2d-118.49076044738556!3d34.07921820464243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1709400000000!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-900 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0891b2] animate-ping" />
                <span>WE MAKE SMILES • CLINIC HEADQUARTERS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
