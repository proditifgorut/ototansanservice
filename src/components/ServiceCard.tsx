import React from 'react';
import { ServiceRecord } from '../types';
import { Car, Droplet, Calendar, Gauge } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatNumber } from '../lib/utils';

interface ServiceCardProps {
  record: ServiceRecord;
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(({ record }, ref) => {
  return (
    <div ref={ref} className="w-[400px] bg-white border-2 border-slate-800 p-6 rounded-xl text-slate-900 font-sans print:border-black mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 border-b-2 border-slate-800 pb-4 mb-4">
            <div className="bg-slate-900 text-white p-2 rounded-lg print:bg-black print:text-white">
                <Car className="w-6 h-6" />
            </div>
            <div>
                <h1 className="font-bold text-xl uppercase tracking-wider">Oto Tansan Car</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Kartu Ganti Oli</p>
            </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Model Kendaraan</p>
                <p className="font-bold text-lg">{record.carModel}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Tanggal Servis</p>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{format(new Date(record.date), 'dd/MM/yyyy')}</span>
                    </div>
                </div>
                <div>
                     <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">KM Saat Ini</p>
                     <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{formatNumber(record.kilometers)}</span>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Jenis Oli / Produk</p>
                <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{record.oilType}</span>
                </div>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 print:bg-gray-100 print:border-gray-300">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Servis Berikutnya (KM)</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-slate-900">{formatNumber(record.nextServiceKm)}</p>
                    <span className="text-sm font-medium text-slate-600">km</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Interval rekomendasi: 5.000 km</p>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">Simpan kartu ini untuk catatan Anda.</p>
        </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';
