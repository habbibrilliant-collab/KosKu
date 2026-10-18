'use client';

import React from 'react';
import Link from 'next/link';
import { formatRupiah } from '@/lib/utils/date-currency';

export default function SuperAdminPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase text-primary">Super Admin SaaS (Penjual Produk Digital)</span>
          <h1 className="text-2xl font-extrabold">Panel Kontrol Bisnis KosKu</h1>
        </div>
        <Link href="/" className="rounded-xl border border-border px-3 py-2 text-xs font-semibold">
          Ke Beranda
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <span className="text-xs text-muted-foreground">Total Pendapatan Langganan SaaS</span>
          <p className="mt-1 text-2xl font-extrabold text-primary">{formatRupiah(6870000)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <span className="text-xs text-muted-foreground">Pemilik Kos Aktif (Tenant)</span>
          <p className="mt-1 text-2xl font-extrabold">24 Pemilik Kos</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <span className="text-xs text-muted-foreground">Harga Paket Dasar / Add-on</span>
          <p className="mt-1 text-lg font-extrabold">{formatRupiah(229000)} / +{formatRupiah(49000)}</p>
        </div>
      </div>
    </div>
  );
}
