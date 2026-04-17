import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';
import { CrmStoreProvider } from './components/crm-store-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Glance CRM',
  description: 'CRM portal for Glance Limousine operations.',
};

export default function CrmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="crm-root min-h-full bg-[var(--crm-background)] text-[var(--crm-foreground)]"
        suppressHydrationWarning
      >
        <CrmStoreProvider>
          {children}
        </CrmStoreProvider>
      </body>
    </html>
  );
}
