import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { SiteStoreProvider } from '../components/site-store-provider';
import '../globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const playfair = Playfair_Display({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Glance Limousine | Singapore Transfers, Tours, Fleet & Chauffeur Services',
  description:
    'Luxury Singapore limousine services, airport transfers, chauffeur-driven fleet, cross border transfers, Singapore tours and Malaysia tours by Glance Limousine.',
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteStoreProvider>
          <div className="topbar">
            Premium chauffeur service | airport transfers | private tours |
            cross-border Singapore-Malaysia
          </div>
          <Navbar />
          {children}
          <Footer />
        </SiteStoreProvider>
        <script src="/app.js" async></script>
      </body>
    </html>
  );
}
