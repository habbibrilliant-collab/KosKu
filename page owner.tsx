'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BedDouble, Users, CheckCircle2, AlertTriangle, Plus, Share2, Check, MessageCircle, FileText, Sparkles } from 'lucide-react';
import { formatRupiah } from '@/lib/utils/date-currency';

export default function OwnerDashboardPage() {
  const [rooms, setRooms] = useState([
    { id: '1', name: '101', type: 'AC + KM Dalam', price: 1250000, status: 'occupied', tenant: 'Dimas Prakoso' },
    { id: '2', name: '102', type: 'AC + KM Dalam', price: 1250000, status: 'occupied', tenant: 'Nadia Putri' },
    { id: '3', name: '103', type: 'VIP Balkon', price: 1500000, status: 'empty', tenant: null },
    { id: '4', name: '104', type: 'Standar Non-AC', price: 850000, status: 'maintenance', tenant: null },
  ]);
  const [quota, setQuota] = useState(15);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 'pay-1',
      tenantName: 'Dimas Prakoso',
      roomName: '101',
      months: 3,
      amount: 3750000,
      date: '18 Okt 2026',
      status: 'pending',
      invoiceNo: null as string | null,
    },
  ]);

  function handleAddRoom() {
    if (rooms.length >= quota) {
      setShowUpgrade(true);
      return;
    }
    const nextNum = 101 + rooms.length;
    setRooms([
      ...rooms,
      { id: String(Date.now()), name: String(nextNum), type: 'AC + KM Dalam', price: 1250000, status: 'empty', tenant: null },
    ]);
  }

  function handleVerifyPayment(id: string) {
    setPendingPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'valid', invoiceNo: 'INV-2026-0001' } : p))
    );
  }

  async function handleShare() {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/tenant/dashboard` : '';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Info Kos Putra Melati', url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold uppercase text-primary">Dasbor Pemilik Kos</span>
          <h1 className="text-2xl font-extrabold">Kos Putra Melati — Yogyakarta</h1>
          <p className="text-xs text-muted-foreground">Jl. Sorowajan Baru No. 18, Bantul, DI Yogyakarta • WA Konfirmasi: 0812-3456-7890</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-bold"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? 'Tautan Kos Disalin!' : 'Bagikan Info Kos'}</span>
          </button>
          <button
            onClick={handleAddRoom}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Kamar ({rooms.length}/{quota})</span>
          </button>
          <Link href="/" className="rounded-xl border border-border px-3 py-2 text-xs font-semibold">
            Ke Beranda
          </Link>
        </div>
      </div>

      {/* Ringkasan Kartu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Kamar Terisi / Kuota</span>
          <p className="mt-1 text-2xl font-extrabold">{rooms.filter(r => r.status === 'occupied').length} / {quota} Kamar</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Menunggu Verifikasi</span>
          <p className="mt-1 text-2xl font-extrabold text-amber-600">{pendingPayments.filter(p => p.status === 'pending').length} Bukti</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Pemasukan Oktober 2026</span>
          <p className="mt-1 text-2xl font-extrabold text-primary">{formatRupiah(12695000)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Pemasukan Tahun 2026</span>
          <p className="mt-1 text-2xl font-extrabold">{formatRupiah(118500000)}</p>
        </div>
      </div>

      {/* Antrean Verifikasi Pembayaran Atomic */}
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold">Antrean Verifikasi Pembayaran Penghuni</h2>
        {pendingPayments.map((p) => (
          <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border p-4">
            <div>
              <span className="text-xs font-bold text-primary">Kamar {p.roomName} • Durasi {p.months} Bulan</span>
              <h3 className="font-bold text-base">{p.tenantName} — {formatRupiah(p.amount)}</h3>
              <p className="text-xs text-muted-foreground">Tanggal unggah bukti: {p.date}</p>
            </div>
            {p.status === 'pending' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVerifyPayment(p.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Valid & Kirim Invoice PDF</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <FileText className="h-4 w-4" />
                <span>LUNAS • {p.invoiceNo} Terkirim ke Email Penghuni</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Daftar Kamar */}
      <section className="space-y-3">
        <h2 className="text-base font-bold">Daftar Kamar ({rooms.length} dari Kuota {quota} Kamar)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rooms.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-lg">Kamar {r.name}</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                  {r.status === 'occupied' ? 'Terisi' : r.status === 'empty' ? 'Kosong' : 'Perawatan'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{r.type}</p>
              <p className="mt-2 font-extrabold text-primary">{formatRupiah(r.price)}/bln</p>
              {r.tenant && <p className="mt-2 text-xs">Penghuni: <strong>{r.tenant}</strong></p>}
            </div>
          ))}
        </div>
      </section>

      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-w-md w-full rounded-2xl bg-card p-6 border border-border space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Sparkles className="h-5 w-5" />
              <span>Kuota {quota} Kamar Telah Penuh</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Data kamar Anda tetap aman. Tambah paket Add-on +15 Kamar seharga Rp49.000/bulan untuk membuka kuota hingga {quota + 15} kamar.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowUpgrade(false)} className="rounded-lg border border-border px-4 py-2 text-xs font-semibold">
                Tutup
              </button>
              <button
                onClick={() => {
                  setQuota(quota + 15);
                  setShowUpgrade(false);
                }}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
              >
                Simulasikan Upgrade (+15 Kamar)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
