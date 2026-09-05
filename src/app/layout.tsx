import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wemakesmiles.dental';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'WE MAKE SMILES | Luxury Dental & Cosmetic Care Clinic',
  description:
    'Experience world-class dental care, cosmetic transformations, Invisalign, and implants at WE MAKE SMILES. State-of-the-art interactive clinic walkthrough.',
  keywords: [
    'Dental Clinic',
    'Cosmetic Dentistry',
    'Smile Makeover',
    'Invisalign',
    'Dental Implants',
    'We Make Smiles',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-[#06b6d4] selection:text-white">
        {children}
      </body>
    </html>
  );
}
