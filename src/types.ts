export interface Product {
  id: string;
  title: string;
  category: 'vehicle' | 'shop' | 'led' | 'acrylic' | 'custom';
  description: string;
  basePrice: number;
  image: string;
  materials: string[];
  sizes: string[];
  popular?: boolean;
}

export interface OrderFormInputs {
  customerName: string;
  phoneNumber: string;
  boardType: string;
  width: string;
  height: string;
  sizeUnit: 'cm' | 'inches' | 'feet';
  material: string;
  logoBase64: string;
  logoFileName: string;
  additionalNotes: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
}

export interface Review {
  id: string;
  name: string;
  origin: string; // e.g. "Royal Enfield Owner", "CEO, Acme Inc"
  text: string;
  stars: number;
  image: string; // Base64 or Unsplash URL
  boardType?: string; // e.g. "LED Signboard", "Acrylic Plate", etc.
  date: string;
}
