import React, { useState } from 'react';
import { Calendar, Gauge, Droplet, CarFront, Save, AlertCircle, User as UserIcon } from 'lucide-react';
import { ServiceRecord, User, Product } from '../types';
import { formatCurrency } from '../lib/utils';

interface ServiceFormProps {
  currentUser: User;
  products: Product[];
  onSubmit: (record: Omit<ServiceRecord, 'id' | 'nextServiceKm'>) => void;
  onCancel: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ currentUser, products, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    carModel: '',
    date: new Date().toISOString().split('T')[0],
    kilometers: '',
    oilType: '',
    notes: '',
    customerName: currentUser.role === 'admin' ? '' : currentUser.name
  });

  // Filter products that are oils
  const oilProducts = products.filter(p => p.category === 'Oli');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      carModel: formData.carModel,
      date: formData.date,
      kilometers: Number(formData.kilometers),
      oilType: formData.oilType,
      notes: formData.notes,
      userId: currentUser.id,
      userName: formData.customerName || currentUser.name
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <WrenchIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Catat Servis Baru</h2>
            <p className="text-sm text-slate-500">
                {currentUser.role === 'admin' ? 'Masukkan detail kendaraan pelanggan.' : 'Masukkan detail pergantian oli Anda.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Admin Only: Customer Name Input */}
          {currentUser.role === 'admin' && (
             <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Nama Pelanggan</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-blue-50/50"
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
              </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Model */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Model Mobil</label>
              <div className="relative">
                <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  required
                  type="text"
                  placeholder="Contoh: Toyota Avanza"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.carModel}
                  onChange={e => setFormData({...formData, carModel: e.target.value})}
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Tanggal Servis</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  required
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            {/* Kilometers */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Kilometer Saat Ini</label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  required
                  type="number"
                  min="0"
                  placeholder="Contoh: 45000"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.kilometers}
                  onChange={e => setFormData({...formData, kilometers: e.target.value})}
                />
              </div>
            </div>

            {/* Oil Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Jenis Oli / Produk</label>
              <div className="relative">
                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    list="oil-options"
                    required
                    type="text"
                    placeholder="Pilih atau ketik manual..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.oilType}
                    onChange={e => setFormData({...formData, oilType: e.target.value})}
                />
                <datalist id="oil-options">
                    {oilProducts.map(p => (
                        <option key={p.id} value={p.name}>{p.name} - {formatCurrency(p.price)}</option>
                    ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Catatan Tambahan (Opsional)</label>
            <textarea
              rows={3}
              placeholder="Ganti filter, cek rem, dll."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Jadwal servis berikutnya akan dihitung otomatis berdasarkan interval standar 5.000 km dari kilometer saat ini.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
