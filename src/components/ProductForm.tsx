import React, { useState } from 'react';
import { Save, Package, DollarSign, Image as ImageIcon, AlignLeft, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Oli' as Product['category'],
    price: '',
    image: '',
    description: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for preview since we don't have a backend storage yet
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      image: formData.image || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400?text=Produk',
      description: formData.description
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button 
            onClick={onCancel}
            className="text-sm text-slate-500 hover:text-slate-800 mb-2 flex items-center gap-1"
        >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Tambah Produk Baru</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Nama Produk</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                required
                type="text"
                placeholder="Contoh: Shell Helix HX8 5W-30"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Kategori</label>
                <select
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                >
                    <option value="Oli">Oli Mesin</option>
                    <option value="Sparepart">Sparepart</option>
                    <option value="Jasa">Jasa Servis</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Harga (Rp)</label>
                <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    required
                    type="number"
                    min="0"
                    placeholder="Contoh: 150000"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                />
                </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Gambar Produk</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {formData.image ? (
                    <div className="relative h-48 w-full">
                        <img src={formData.image} alt="Preview" className="h-full w-full object-contain" />
                        <p className="text-xs text-slate-500 mt-2">Klik untuk mengganti gambar</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                        <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                        <p className="text-sm text-slate-600 font-medium">Klik untuk upload gambar</p>
                        <p className="text-xs text-slate-400">PNG, JPG (Max 2MB)</p>
                    </div>
                )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Deskripsi</label>
            <div className="relative">
                <AlignLeft className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <textarea
                rows={3}
                placeholder="Deskripsi singkat produk..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>
          </div>

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
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
