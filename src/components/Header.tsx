import React from 'react';
import { Car, Menu, X, LogOut, UserCircle, ShieldCheck, ShoppingBag } from 'lucide-react';
import { ViewState, User } from '../types';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems: { label: string; value: ViewState; icon?: React.ReactNode }[] = [
    { label: 'Beranda', value: 'dashboard' },
    { label: 'Riwayat Servis', value: 'history' },
    { label: 'Catat Servis', value: 'add-service' },
    { label: 'Produk & Layanan', value: 'products', icon: <ShoppingBag className="w-4 h-4 inline mr-1" /> },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 font-bold text-xl cursor-pointer"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:inline">Oto Tansan Car</span>
            <span className="sm:hidden">OTC</span>
            {user.role === 'admin' && (
               <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded border border-red-500/30 uppercase tracking-wider">Admin</span>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setCurrentView(item.value)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                    currentView === item.value || (item.value === 'products' && currentView === 'add-product')
                      ? "bg-slate-800 text-blue-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="h-6 w-px bg-slate-700"></div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    {user.role === 'admin' ? <ShieldCheck className="w-4 h-4 text-blue-400" /> : <UserCircle className="w-4 h-4" />}
                    <span>{user.name}</span>
                </div>
                <button 
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                    title="Keluar"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-sm text-slate-400 border-b border-slate-700 mb-2 flex items-center justify-between">
                <span>Masuk sebagai <strong className="text-white">{user.name}</strong></span>
                <button onClick={onLogout} className="text-red-400 text-xs uppercase font-bold">Keluar</button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setCurrentView(item.value);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-md text-base font-medium",
                  currentView === item.value
                    ? "bg-slate-900 text-blue-400"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
