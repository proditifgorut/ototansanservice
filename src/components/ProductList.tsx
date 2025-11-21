import React from 'react';
import { Product, User } from '../types';
import { formatCurrency } from '../lib/utils';
import { Plus, Trash2, Tag, ShoppingBag } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  currentUser: User;
  onAddClick: () => void;
  onDelete: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, currentUser, onAddClick, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produk & Layanan</h1>
          <p className="text-slate-500">Daftar oli, sparepart, dan jasa yang tersedia.</p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Produk
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">Belum ada produk</h3>
          <p className="text-slate-500 mt-1">
            {currentUser.role === 'admin' ? 'Tambahkan produk baru untuk ditampilkan di katalog.' : 'Belum ada produk yang tersedia saat ini.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-100 relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400?text=No+Image';
                  }}
                />
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded text-slate-700 uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{product.description || 'Tidak ada deskripsi.'}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                        <Tag className="w-4 h-4" />
                        {formatCurrency(product.price)}
                    </div>
                    {currentUser.role === 'admin' && (
                        <button 
                            onClick={() => onDelete(product.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Produk"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
