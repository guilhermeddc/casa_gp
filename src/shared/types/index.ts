export interface ProfileContact {
  phone: string;
  whatsapp: string;
  workingHours: string;
}

export interface ProfileService {
  name: string;
  available: boolean;
  note?: string;
  additional?: string;
}

export interface Profile {
  id: string;
  image: string;
  slug: string;
  name: string;
  description: string;
  age: string;
  height: string;
  weight: string;
  feet: string;
  naturalness: string;
  services: ProfileService[];
  contact: ProfileContact;
  createdAt?: string;
  updatedAt?: string;
}

export type Image = {
  id?: string;
  profile_id?: string;
  image: string;
};

export type User = {
  id?: string;
  uid?: string;
  email: string;
};

export type ResponsiveType =
  | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  | number;
