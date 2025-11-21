import React, { useState } from 'react';
import { Car, Lock, Mail, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

// Mock Users Database
const MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Super Admin',
    email: 'admin@ototansan.com',
    role: 'admin'
  },
  {
    id: 'user-1',
    name: 'Budi Santoso',
    email: 'user@ototansan.com',
    role: 'user'
  }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user) {
        // Simple password check (In real app, verify hash)
        if ((user.role === 'admin' && password === 'admin123') || 
            (user.role === 'user' && password === 'user123')) {
          onLogin(user);
        } else {
          setError('Kata sandi salah');
        }
      } else {
        setError('Pengguna tidak ditemukan');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Oto Tansan Car</h1>
          <p className="text-blue-100 text-sm mt-1">Sistem Manajemen Ganti Oli</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="nama@contoh.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? 'Memproses...' : (
                <>
                  Masuk <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-500 mb-2">Akun Demo:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="font-bold block text-slate-700">Admin</span>
                admin@ototansan.com<br/>
                Pass: admin123
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="font-bold block text-slate-700">User</span>
                user@ototansan.com<br/>
                Pass: user123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
