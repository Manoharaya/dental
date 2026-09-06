export interface TrustStat {
  label: string;
  value: string;
  subtext: string;
}

export interface ClinicHours {
  monFri: string;
  saturday: string;
  sunday: string;
  isOpenNow: boolean;
}

export interface ClinicTheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  bgTint: string;
}

export interface ClinicProfile {
  id: string;
  name: string;
  tagline: string;
  subheadline: string;
  badge: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
  rating: number;
  reviewCount: number;
  hours: ClinicHours;
  trustStats: TrustStat[];
  theme: ClinicTheme;
}

export interface TreatmentStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  id: string;
  category: 'cosmetic' | 'implants' | 'ortho' | 'general' | 'emergency' | 'pediatric';
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  costRange: string;
  recoveryTime: string;
  anesthesia: string;
  benefits: string[];
  steps: TreatmentStep[];
  faqs: TreatmentFAQ[];
  image: string;
  badge?: string;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  credentials: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  education: string[];
  memberships: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  image: string;
  availableDays: string;
}

export interface BeforeAfterCase {
  id: string;
  treatmentType: string;
  title: string;
  patientAge: string;
  duration: string;
  doctorName: string;
  beforeImage: string;
  afterImage: string;
  problem: string;
  solution: string;
}

export interface TechnologyItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  benefits: string[];
  icon: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  date: string;
  verified: boolean;
  quote: string;
  patientPhoto?: string;
  hasVideo?: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface InsuranceProvider {
  name: string;
  networkType: 'In-Network Tier 1' | 'In-Network Tier 2' | 'PPO Accepted' | 'Financing';
  coverageNote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export interface BookingState {
  patientType: 'new' | 'existing' | 'emergency' | 'consultation';
  treatmentId: string;
  dentistId: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  insuranceNote: string;
  symptoms: string;
}
