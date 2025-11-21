import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Droplet, Calendar, Gauge, Trash2, Printer, User as UserIcon } from 'lucide-react';
import { ServiceRecord, User } from '../types';
import { formatNumber } from '../lib/utils';

interface ServiceHistoryProps {
  records: ServiceRecord[];
  currentUser: User;
  onDelete: (id: string) => void;
  onPrint: (record: ServiceRecord) => void;
}

export const ServiceHistory: React.FC<ServiceHistoryProps> = ({ records, currentUser, onDelete, onPrint }) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Droplet className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">Belum ada data</h3>
        <p className="text-slate-500 mt-1">
            {currentUser.role === 'admin' ? 'Belum ada catatan servis di sistem.' : 'Mulai dengan menambahkan catatan ganti oli pertama Anda.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Detail Mobil</th>
              {currentUser.role === 'admin' && (
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pemilik</th>
              )}
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kilometer</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Oli / Produk</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Servis Berikutnya</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{record.carModel}</div>
                  {record.notes && (
                    <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[150px]">{record.notes}</div>
                  )}
                </td>
                {currentUser.role === 'admin' && (
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-700 text-sm">
                            <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                            {record.userName}
                        </div>
                    </td>
                )}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {format(new Date(record.date), 'd MMM yyyy', { locale: id })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Gauge className="w-4 h-4 text-slate-400" />
                    {formatNumber(record.kilometers)} km
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {record.oilType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-600 font-medium text-sm">
                    {formatNumber(record.nextServiceKm)} km
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    (+5.000 km)
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onPrint(record)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Cetak Kartu Servis"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(record.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Data"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
