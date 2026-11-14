export type CurrencyCode = 'USD' | 'EUR' | 'UZS';

export interface CurrencyRate {
  symbol: string;
  rate: number; // relative to USD
  prefix: string;
  suffix?: string;
}

export type CategoryType = 'all' | 'gpu' | 'smartphone' | 'car' | 'materials' | 'villas';

export interface AssetSpec {
  label: string;
  value: string;
}

export interface AssetItem {
  id: string;
  modelKey: 'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper' | null;
  name: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  priceUsd: number;
  originCountry: string;
  originHub: string;
  originFlag: string;
  deliveryDays: string;
  rating: number;
  featured: boolean;
  image: string;
  description: string;
  specs: AssetSpec[];
  warranty: string;
  customsDutyPercent: number;
  weightKg: number;
}

export interface CartItem {
  id: string;
  assetId?: string;
  name: string;
  categoryLabel: string;
  priceUsd: number;
  quantity: number;
  image?: string;
  originHub?: string;
  deliveryDays?: string;
  customUrl?: string;
  notes?: string;
  isCustomOrder?: boolean;
}

export interface TrackingStep {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  details: string;
}

export interface TrackingOrder {
  id: string;
  assetName: string;
  category: string;
  originCity: string;
  originCoords: [number, number]; // lat, lng
  customsHub: string;
  customsCoords: [number, number];
  destinationCity: string;
  destinationCoords: [number, number];
  statusText: string;
  percentComplete: number;
  eta: string;
  carrier: string;
  flightCode: string;
  temperature?: string;
  pressure?: string;
  securitySeal: string;
  totalTurnkeyUsd: number;
  steps: TrackingStep[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'seller';
  company?: string;
  country?: string;
  vipTier: 'Gold' | 'Platinum' | 'Titanium Sovereign';
  balanceUsd: number;
  escrowProtected: boolean;
  avatar?: string;
}

export interface SellerStats {
  companyName: string;
  verificationStatus: 'verified' | 'pending' | 'premium';
  escrowVolumeUsd: number;
  activeListingsCount: number;
  successfulDeliveries: number;
  ratingScore: number;
}
