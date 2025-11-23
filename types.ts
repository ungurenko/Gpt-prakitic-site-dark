export interface Feature {
  id: string;
  text: string;
}

export interface Module {
  id: number;
  title: string;
  points: string[];
  result: string;
}

export interface Assistant {
  name: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: number;
  oldPrice: number;
  currencyEu: number;
  features: string[];
  isPopular?: boolean;
  spots?: string;
  buttonText: string;
}

export interface Stat {
  icon: string;
  label: string;
  value: string;
}