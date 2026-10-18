'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, MessageCircle, MapPin, Phone, FileText, UploadCloud } from 'lucide-react';
import { formatRupiah } from '@/lib/utils/date-currency';
import { ALLOWED_DURATIONS, AllowedDurationMonths, calculateMultiMonthPayment } from '@/lib/billing/calculator';

export default function TenantDashboardPage() {
  const [months, setMonths] = useState<AllowedDurationMonths>(1);
  const [copied, setCopied] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const monthlyPrice = 1250000;
  const calc = calculateMultiMonthPayment({
    monthlyPrice,
    monthsCount: months,
    discounts: { '6': 5, '12': 10 },
  });

  async function copy(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase text-primary">Portal Penghuni KosKu</span>
          <h1 className="text-xl font-extrabold">Halo, Dimas Prakoso (Kamar 101)</h1>
          <p className="text-xs text-muted-foreground">Jatuh tempo berikutnya: 18 Nov 2026</p>
        </div>
        <Link href="/" className="rounded-xl border border-border px-3 py-2 text-xs font-semibold">
          Ke Beranda
        </Link>
      </div>

      {/* Pilihan Durasi 1, 3, 6, 8, 12 Bulan */}
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold">1. Pilih Durasi Pembayaran Sewa (1, 3, 6, 8, atau 12 Bulan)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {ALLOWED_DURATIONS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              className={`rounded-xl border p-3 text-center transition-all ${
                months === m ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-border bg-background'
              }`}
            >
              <span className="block text-sm font-extrabold">{m} Bulan</span>
              <span className="text-[11px] text-muted-foreground">{formatRupiah(monthlyPrice * m)}</span>
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-muted/60 p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal ({months} bulan × {formatRupiah(monthlyPrice)})</span>
            <span className="font-semibold">{formatRupiah(calc.subtotal)}</span>
          </div>
          {calc.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Diskon Durasi ({calc.discountPercent}%)</span>
              <span>-{formatRupiah(calc.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-border pt-2 font-extrabold text-base">
            <span>Total Tagihan Dibayar</span>
            <span className="text-primary">{formatRupiah(calc.grandTotal)}</span>
          </div>
        </div>
      </section>

      {/* Rekening Pembayaran & Unggah Bukti */}
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold">2. Rekening Tujuan & Unggah Bukti Bayar</h2>
        <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
          <div>
            <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary">BCA</span>
            <p className="mt-1 font-mono text-base font-bold">8420991234</p>
            <p className="text-xs text-muted-foreground">a.n. Kos Putra Melati</p>
          </div>
          <button
            onClick={() => copy('bca', '8420991234')}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-semibold"
          >
            {copied === 'bca' ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied === 'bca' ? 'Disalin' : 'Salin No. Rek'}</span>
          </button>
        </div>

        {uploaded ? (
          <div className="rounded-xl bg-emerald-500/15 p-4 text-xs font-semibold text-emerald-700">
            Bukti pembayaran untuk {months} bulan ({formatRupiah(calc.grandTotal)}) berhasil dikirim! Menunggu verifikasi pemilik kos.
          </div>
        ) : (
          <button
            onClick={() => setUploaded(true)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Unggah & Kirim Bukti Pembayaran ({formatRupiah(calc.grandTotal)})</span>
          </button>
        )}
      </section>

      {/* Kartu Kontak & Alamat Pemilik Kos */}
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-bold uppercase text-muted-foreground">Kontak & Alamat Konfirmasi Pemilik Kos</h2>
        <p className="flex items-center gap-2 text-xs">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Jl. Sorowajan Baru No. 18, Banguntapan, Bantul, DI Yogyakarta</span>
        </p>
        <p className="flex items-center gap-2 text-xs">
          <Phone className="h-4 w-4 text-primary" />
          <span>WhatsApp Konfirmasi: 0812-3456-7890</span>
        </p>
        <div className="flex gap-2 pt-1">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Hubungi WhatsApp Pemilik</span>
          </a>
        </div>
      </section>
    </div>
  );
}
