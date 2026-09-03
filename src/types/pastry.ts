export interface Pastry {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasChevron?: boolean;
}
