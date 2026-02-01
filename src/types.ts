export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGEMENT: 'MANAGEMENT',
  SALES: 'SALES',
  CRM_MANAGER: 'CRM_MANAGER',
  FINANCE: 'FINANCE',
  PARTNER: 'PARTNER',
  LEGACY_PARTNER: 'LEGACY_PARTNER',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];


export const PropertyStatus = {
  AVAILABLE: 'AVAILABLE',
  BLOCKED: 'BLOCKED',
  BOOKED: 'BOOKED',
  REGISTERED: 'REGISTERED',
  CANCELLED: 'CANCELLED',
} as const;

export type PropertyStatus = typeof PropertyStatus[keyof typeof PropertyStatus];


export const SupportedLanguage = {
  ENGLISH: "English",
  HINDI: "Hindi",
  KANNADA: "Kannada",
  TELUGU: "Telugu",
  TAMIL: "Tamil",
  MARATHI: "Marathi",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguage)[keyof typeof SupportedLanguage];


export interface SubDealer {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  status: "Active" | "Onboarding" | "Inactive";
  totalSales: number;
  totalRevenue: number;
  onboardedDate: string;
}

export interface Property {
  id: string;
  project: string;
  unitNo: string;
  type: "Plot" | "Villa" | "Apartment" | "Commercial";
  size: number;
  price: number;
  status: PropertyStatus;
  floor?: string;
  isPublishedToWeb?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: "New" | "Qualified" | "Site Visit" | "Booking" | "Registry";
  assignedTo: string;
  createdAt: string;
  budget?: number;
  location?: string;
  profession?: string;
  totalEngagements?: number;
  lastActive?: string;
  score?: number;
  scoreReason?: string;
}

export interface Payment {
  id: string;
  customerId: string;
  propertyId: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
}
