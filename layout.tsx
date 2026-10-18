import './globals.css';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KosKu — Aplikasi SaaS Manajemen Kos Otomatis',
  description: 'Kelola kamar, penghuni, tagihan bulanan, pembayaran, dan invoice PDF secara otomatis.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
