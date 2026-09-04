'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import BookingForm, { BookingFormData } from './BookingForm';

export interface BookingSectionProps {
  onBookingSubmit?: (data: BookingFormData) => Promise<void> | void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onBookingSubmit }) => {
  return (
    <section id="booking" className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-[#0891b2] text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-4 h-4" />
            <span>VIP Dental Reservations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891b2] via-cyan-600 to-blue-600">Smile Transformation</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Select your preferred consultation date and service. Our concierge team will confirm your visit within 2 business hours.
          </p>
        </div>

        {/* Form Container */}
        <BookingForm onSubmit={onBookingSubmit} />
      </div>
    </section>
  );
};

export default BookingSection;
