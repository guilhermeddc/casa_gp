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
  name: string;
  age: number;
  height: string;
  weight: string;
  feet: number;
  naturalness: string;
  services: ProfileService[];
  photos: string[];
  contact: ProfileContact;
}
