export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'ensaladas' | 'cantinadas' | 'tascas' | 'hamburguesas' | 'vegan' | 'postres' | 'bebidas';
  description: string;
  allergens: string[]; // e.g. ['Gluten', 'Lácteos', 'Huevo', 'Vegano', 'Vegetariano']
  isVegan?: boolean;
  isVegetarian?: boolean;
  isPopular?: boolean;
  label?: string; // e.g. "¡Ha vuelto!" or "Especialidad"
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  content: string;
  likes?: number;
  highlightedFood?: string;
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zone: 'saloon' | 'bar' | 'terrace';
  specialRequests?: string;
}
