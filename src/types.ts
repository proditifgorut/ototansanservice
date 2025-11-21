export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface ServiceRecord {
  id: string;
  userId: string; // Owner ID
  userName: string; // Owner Name (for display)
  carModel: string;
  date: string;
  kilometers: number;
  oilType: string;
  notes?: string;
  nextServiceKm: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Oli' | 'Sparepart' | 'Jasa' | 'Lainnya';
  price: number;
  image: string;
  description?: string;
}

export type ViewState = 'dashboard' | 'history' | 'add-service' | 'products' | 'add-product';
