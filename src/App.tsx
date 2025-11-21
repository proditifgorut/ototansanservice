import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { ServiceForm } from './components/ServiceForm';
import { ServiceHistory } from './components/ServiceHistory';
import { ServiceCard } from './components/ServiceCard';
import { LoginPage } from './components/LoginPage';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { ServiceRecord, ViewState, User, Product } from './types';
import { Car, Droplet, History, TrendingUp, Users } from 'lucide-react';

// Mock Data
const INITIAL_DATA: ServiceRecord[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Budi Santoso',
    carModel: 'Toyota Innova Reborn',
    date: '2023-12-15',
    kilometers: 45000,
    oilType: 'Shell Helix HX8 5W-30',
    nextServiceKm: 50000,
    notes: 'Ganti filter oli juga.'
  },
  {
    id: '2',
    userId: 'user-1',
    userName: 'Budi Santoso',
    carModel: 'Honda CR-V Turbo',
    date: '2024-01-20',
    kilometers: 12500,
    oilType: 'Honda E-Pro Gold 0W-20',
    nextServiceKm: 17500,
    notes: 'Servis berkala pertama.'
  }
];

const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Shell Helix HX8 5W-30',
        category: 'Oli',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1635784063683-b275b4348d1a?auto=format&fit=crop&q=80&w=600',
        description: 'Oli sintetis penuh untuk performa mesin maksimal.'
    },
    {
        id: 'p2',
        name: 'Filter Oli Toyota',
        category: 'Sparepart',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600',
        description: 'Filter oli orisinil untuk Toyota Innova/Fortuner.'
    },
    {
        id: 'p3',
        name: 'Jasa Ganti Oli',
        category: 'Jasa',
        price: 50000,
        image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=600',
        description: 'Biaya jasa mekanik profesional.'
    }
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('dashboard');
  const [records, setRecords] = useState<ServiceRecord[]>(INITIAL_DATA);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [printingRecord, setPrintingRecord] = useState<ServiceRecord | null>(null);

  // Filter records based on Role
  const filteredRecords = React.useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'admin') return records;
    return records.filter(r => r.userId === currentUser.id);
  }, [currentUser, records]);

  // Stats Calculations
  const totalServices = filteredRecords.length;
  const uniqueCars = new Set(filteredRecords.map(r => r.carModel)).size;
  const totalKmTracked = filteredRecords.reduce((acc, curr) => acc + curr.kilometers, 0);
  const lastServiceDate = filteredRecords.length > 0 
    ? new Date(Math.max(...filteredRecords.map(r => new Date(r.date).getTime()))).toLocaleDateString('id-ID')
    : '-';
  
  const totalUsers = new Set(records.map(r => r.userId)).size;

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('dashboard');
  };

  const handleAddRecord = (data: Omit<ServiceRecord, 'id' | 'nextServiceKm'>) => {
    const newRecord: ServiceRecord = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      nextServiceKm: data.kilometers + 5000
    };
    setRecords([newRecord, ...records]);
    setView('history');
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleAddProduct = (data: Omit<Product, 'id'>) => {
      const newProduct: Product = {
          ...data,
          id: Math.random().toString(36).substr(2, 9)
      };
      setProducts([newProduct, ...products]);
      setView('products');
  };

  const handleDeleteProduct = (id: string) => {
      if(window.confirm('Hapus produk ini?')) {
          setProducts(products.filter(p => p.id !== id));
      }
  };

  const handlePrint = (record: ServiceRecord) => {
    setPrintingRecord(record);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 no-print">
        <Header 
            currentView={view} 
            setCurrentView={setView} 
            user={currentUser}
            onLogout={handleLogout}
        />

        <main className="container mx-auto px-4 py-8">
          {/* Dashboard View */}
          {view === 'dashboard' && (
            <div className="space-y-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    {currentUser.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Saya'}
                </h1>
                <p className="text-slate-500">
                    {currentUser.role === 'admin' 
                        ? 'Ringkasan aktivitas servis di seluruh sistem.' 
                        : 'Pantau status perawatan kendaraan Anda.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                  title={currentUser.role === 'admin' ? "Total Servis" : "Servis Saya"} 
                  value={totalServices} 
                  icon={History} 
                  color="blue"
                  description={currentUser.role === 'admin' ? "Total catatan di sistem" : "Kali kunjungan servis"}
                />
                <StatsCard 
                  title="Kendaraan Aktif" 
                  value={uniqueCars} 
                  icon={Car} 
                  color="purple"
                  description="Jumlah mobil terdaftar"
                />
                {currentUser.role === 'admin' ? (
                    <StatsCard 
                        title="Total Pelanggan" 
                        value={totalUsers} 
                        icon={Users} 
                        color="green"
                        description="Klien unik dilayani"
                    />
                ) : (
                    <StatsCard 
                        title="Servis Terakhir" 
                        value={lastServiceDate} 
                        icon={Droplet} 
                        color="green"
                        description="Aktivitas terbaru"
                    />
                )}
                <StatsCard 
                  title="Rata-rata KM" 
                  value={`${Math.round(totalKmTracked / (totalServices || 1) / 1000)}rb`} 
                  icon={TrendingUp} 
                  color="orange"
                  description="Per interval servis"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Aktivitas Terbaru</h2>
                  <button 
                    onClick={() => setView('history')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Lihat Semua
                  </button>
                </div>
                <ServiceHistory 
                  records={filteredRecords.slice(0, 5)} 
                  currentUser={currentUser}
                  onDelete={handleDeleteRecord} 
                  onPrint={handlePrint}
                />
              </div>
            </div>
          )}

          {/* Add Service View */}
          {view === 'add-service' && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <button 
                  onClick={() => setView('dashboard')}
                  className="text-sm text-slate-500 hover:text-slate-800 mb-2"
                >
                  &larr; Kembali ke Dashboard
                </button>
                <h1 className="text-2xl font-bold text-slate-900">Catat Servis Baru</h1>
              </div>
              <ServiceForm 
                currentUser={currentUser}
                products={products}
                onSubmit={handleAddRecord} 
                onCancel={() => setView('dashboard')} 
              />
            </div>
          )}

          {/* History View */}
          {view === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {currentUser.role === 'admin' ? 'Semua Riwayat Servis' : 'Riwayat Servis Saya'}
                  </h1>
                  <p className="text-slate-500">Log lengkap perawatan kendaraan.</p>
                </div>
                <button
                  onClick={() => setView('add-service')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  + Catat Servis
                </button>
              </div>
              <ServiceHistory 
                records={filteredRecords} 
                currentUser={currentUser}
                onDelete={handleDeleteRecord} 
                onPrint={handlePrint}
              />
            </div>
          )}

          {/* Products View */}
          {view === 'products' && (
              <ProductList 
                products={products} 
                currentUser={currentUser}
                onAddClick={() => setView('add-product')}
                onDelete={handleDeleteProduct}
              />
          )}

          {/* Add Product View (Admin Only) */}
          {view === 'add-product' && (
              <ProductForm 
                onSubmit={handleAddProduct}
                onCancel={() => setView('products')}
              />
          )}
        </main>
      </div>

      {/* Printable Card */}
      <div className="hidden print-only">
        {printingRecord && <ServiceCard record={printingRecord} />}
      </div>
    </>
  );
}

export default App;
