// ═══════════════════════════════════════════════════
// NinikaTours — Type Definitions
// ═══════════════════════════════════════════════════

export interface HeroStat {
  value: string;
  label: string;
}

export interface ZoneCard {
  id: string;
  name: string;
  emoji: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  includes: string[];
  price: string;
  priceNote?: string;
  emoji: string;
  badge?: string;
  groupSize: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  emoji: string;
}

export interface Petisco {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'petisco' | 'prato' | 'doce' | 'vinho';
}

export interface Producer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialty: string;
  emoji: string;
  founded?: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  description: string;
  emoji: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  placeholder: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  text: string;
  rating: number;
  language: 'pt' | 'en';
  experience: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  dataChegada: string;
  dataPartida: string;
  experiencia: string;
  tamanhoGrupo: string;
  mensagem: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
