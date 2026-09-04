'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Search, 
  CheckCircle, 
  Clock3, 
  XCircle, 
  Trash2, 
  RefreshCw, 
  Download, 
  Lock, 
  ArrowLeft,
  MessageSquare
} from 'lucide-react';

interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Simple demo PIN: admin123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid Passcode. Please enter "admin123"');
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/booking');
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/booking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus as Appointment['status'] } : apt))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const res = await fetch(`/api/booking?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((apt) => apt.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Notes', 'Created At'];
    const rows = filteredAppointments.map((apt) => [
      apt.id,
      `"${apt.fullName}"`,
      apt.email,
      apt.phone,
      `"${apt.service}"`,
      apt.preferredDate,
      apt.preferredTime,
      apt.status,
      `"${apt.message || ''}"`,
      apt.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-900">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#06b6d4] to-cyan-600 flex items-center justify-center mx-auto mb-5 text-white shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Clinic Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
            Enter your administrative passcode to view patient appointments
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#0891b2] focus:bg-white transition"
              />
              {passcodeError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">{passcodeError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#0891b2] hover:bg-cyan-700 text-white font-bold text-sm shadow-md transition"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link href="/" className="text-xs font-semibold text-[#0891b2] hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Homepage</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-cyan-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 block leading-none">
                WE MAKE SMILES • <span className="text-[#0891b2]">ADMIN</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Appointment Management</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAppointments}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Refresh bookings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <Link
              href="/"
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              View Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Bookings</span>
            <span className="text-3xl font-extrabold text-slate-900 mt-1 block">{stats.total}</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Pending</span>
            <span className="text-3xl font-extrabold text-amber-600 mt-1 block">{stats.pending}</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Confirmed</span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">{stats.confirmed}</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Completed</span>
            <span className="text-3xl font-extrabold text-blue-600 mt-1 block">{stats.completed}</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none focus:border-[#0891b2] transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#0891b2] transition cursor-pointer"
            >
              <option value="all">All Statuses ({appointments.length})</option>
              <option value="pending">Pending ({stats.pending})</option>
              <option value="confirmed">Confirmed ({stats.confirmed})</option>
              <option value="completed">Completed ({stats.completed})</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table / Cards */}
        {loading ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center text-slate-500">
            <div className="w-8 h-8 border-4 border-[#0891b2]/20 border-t-[#0891b2] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-semibold">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No Appointments Found</h4>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search query or filter.'
                : 'Appointments booked by users will appear here in real-time.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Patient Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold text-slate-900">{apt.fullName}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : apt.status === 'completed'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : apt.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <a href={`tel:${apt.phone}`} className="flex items-center gap-1.5 text-[#0891b2] font-semibold hover:underline">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{apt.phone}</span>
                    </a>
                    <a href={`mailto:${apt.email}`} className="flex items-center gap-1.5 hover:text-slate-900">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{apt.email}</span>
                    </a>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      {apt.service}
                    </span>
                  </div>

                  {apt.message && (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-600 flex items-start gap-2 mt-2">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>{apt.message}</span>
                    </div>
                  )}
                </div>

                {/* Date & Action Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-800 bg-cyan-50 border border-cyan-100 px-3.5 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1 text-[#0891b2]">
                      <Calendar className="w-3.5 h-3.5" />
                      {apt.preferredDate}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      {apt.preferredTime}
                    </span>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-1.5">
                    {apt.status !== 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(apt.id, 'confirmed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(apt.id, 'completed')}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold border border-blue-200 transition"
                      >
                        Complete
                      </button>
                    )}
                    {apt.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(apt.id, 'cancelled')}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-bold border border-amber-200 transition"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(apt.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs transition border border-red-200"
                      title="Delete appointment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
