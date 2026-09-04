'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import VideoScrubber from '@/components/VideoScrubber';
import ResultsGalleryVideoSection from '@/components/ResultsGalleryVideoSection';
import VideoSection3 from '@/components/VideoSection3';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import BookingSection from '@/components/BookingSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

/**
 * WE MAKE SMILES Dental Clinic - Main Homepage (White / Light Theme)
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#06b6d4] selection:text-white">
      {/* Sticky Navigation Component */}
      <Navigation
        sections={[
          { id: 'hero-tour', label: 'Home' },
          { id: 'clinic-continuity', label: 'Videos' },
          { id: 'results-gallery', label: 'Gallery' },
          { id: 'about-us', label: 'About Us' },
          { id: 'services', label: 'Services' },
          { id: 'booking', label: 'Book Appointment' },
        ]}
      />

      {/* SECTION 1: HERO VIDEO SCRUBBER - RECEPTION TO DOCTOR'S CHAIR */}
      <div id="hero-tour" className="relative">
        <VideoScrubber
          videoFramePath="/videos/video_1_frames"
          totalFrames={240}
          overlayTitle="We Make Smiles - Professional Dental Care"
          overlayDescription="Your journey to perfect smiles starts here."
          extension="webp"
        />
      </div>

      {/* SECTION 2: RESULTS GALLERY VIDEO SCRUBBER */}
      <div id="results-gallery" className="relative">
        <ResultsGalleryVideoSection
          videoFramePath="/videos/video_2_frames"
          totalFrames={240}
          overlayTitle="See Our Smile Transformations - Before & After Results"
          overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles."
          extension="webp"
        />
      </div>

      {/* SECTION 3: CLINIC CONTINUITY */}
      <div id="clinic-continuity" className="relative">
        <VideoSection3
          videoFramePath="/videos/video_3_frames"
          totalFrames={240}
          overlayTitle="Professional Clinic Design - Built for Your Comfort"
          overlayDescription="Every space designed for your peace of mind."
          extension="webp"
        />
      </div>

      {/* SECTION 4: SERVICES / TREATMENTS MENU */}
      <ServicesSection />

      {/* SECTION 5: ABOUT US & DOCTOR CREDENTIALS */}
      <AboutSection />

      {/* SECTION 6: LOCATION & GOOGLE MAPS */}
      <LocationSection />

      {/* SECTION 7: APPOINTMENT BOOKING */}
      <BookingSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
