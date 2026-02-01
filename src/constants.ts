import { PropertyStatus } from './types';
import type { Property, Lead, SubDealer } from './types';


export const PROJECTS = ['Manortha Greens', 'Skyline Residency', 'Emerald Plots', 'Business Square'];

export const MOCK_SUB_DEALERS: SubDealer[] = [
  { id: 'sd1', name: 'Amit Verma', phone: '9822113344', pincode: '560001', status: 'Active', totalSales: 4, totalRevenue: 12000000, onboardedDate: '2023-11-15' },
  { id: 'sd2', name: 'Sonal Singh', phone: '9833445566', pincode: '560001', status: 'Active', totalSales: 2, totalRevenue: 8500000, onboardedDate: '2023-12-01' },
  { id: 'sd3', name: 'Rohan Mehra', phone: '9811223344', pincode: '560001', status: 'Onboarding', totalSales: 0, totalRevenue: 0, onboardedDate: '2024-03-10' },
];

export const MOCK_PROPERTIES: Property[] = [
  { id: '1', project: 'Manortha Greens', unitNo: 'A-101', type: 'Villa', size: 2400, price: 15000000, status: PropertyStatus.AVAILABLE },
  { id: '2', project: 'Manortha Greens', unitNo: 'A-102', type: 'Villa', size: 2400, price: 15000000, status: PropertyStatus.BOOKED },
  { id: '3', project: 'Skyline Residency', unitNo: 'P-505', type: 'Apartment', size: 1200, price: 8500000, status: PropertyStatus.BLOCKED },
  { id: '4', project: 'Emerald Plots', unitNo: 'PL-42', type: 'Plot', size: 1500, price: 4500000, status: PropertyStatus.AVAILABLE },
  { id: '5', project: 'Emerald Plots', unitNo: 'PL-43', type: 'Plot', size: 1500, price: 4500000, status: PropertyStatus.REGISTERED },
  { id: '6', project: 'Business Square', unitNo: 'C-01', type: 'Commercial', size: 800, price: 12000000, status: PropertyStatus.AVAILABLE },
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: "Dr. Vikram Sethi",
    role: "Proprietor, Sethi Clinic",
    project: "Manortha Greens",
    quote: "The attention to detail in the villa architecture is unparalleled. Manortha provided a sanctuary that perfectly balances my professional life with serene living.",
    fullStory: "Living at Manortha Greens has been a transformative experience. As a medical professional, my days are often high-stress and demanding. Coming home to a space that prioritizes natural light, cross-ventilation, and high-quality materials makes all the difference. The gated community offers a level of security and peace that is hard to find in Bangalore's bustling environment. I particularly appreciate the commitment to the green belt preserved within the community.",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    relatedBlogId: 2
  },
  {
    id: 't2',
    name: "Ananya Deshmukh",
    role: "Senior Architect",
    project: "Skyline Residency",
    quote: "As an architect, I am incredibly critical of structural integrity and aesthetic flow. Skyline Residency exceeded my expectations in both sustainability and urban design.",
    fullStory: "From a professional standpoint, I chose Skyline Residency because of their uncompromising approach to R.C.C structure and their choice of joinery. The space planning is efficient, eliminating wasted corridor space which is common in many modern high-rises. The use of low-VOC paints and large glass apertures for passive cooling proves that the developer understands modern sustainable requirements without sacrificing the luxury aesthetic.",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    relatedBlogId: 3
  },
  {
    id: 't3',
    name: "Rajesh Iyer",
    role: "Investor",
    project: "Emerald Plots",
    quote: "Manortha's transparency during the registration process was refreshing. Their appreciation value projections have already proven accurate within just 8 months.",
    fullStory: "Investing in real estate in Bangalore can be a legal minefield. What set Manortha apart was their clear documentation—all approvals (BMRDA/BIAPPA) were ready for inspection on day one. Emerald Plots isn't just a patch of land; it's a meticulously planned township with paved roads, underground cabling, and functional sewage treatment. I've already seen a 15% appreciation in market value since my initial purchase.",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
    relatedBlogId: 1
  }
];

export const MOCK_BLOGS = [
  {
    id: 1,
    title: "Why North Bangalore is the Future of Luxury Real Estate",
    excerpt: "Exploring the infrastructure boom around the International Airport and what it means for high-net-worth investors.",
    content: "The narrative of Bangalore's growth has shifted decidedly North. With the expansion of the Kempegowda International Airport and the development of the Devanahalli Business Park, North Bangalore is witnessing an unprecedented infrastructure surge. For luxury real estate, this means larger land parcels and the ability to build expansive villa communities like Manortha Greens. High-net-worth individuals are moving away from the congested CBD toward these 'aero-cities' where air quality is better and commute times to global workplaces are shorter. The valuation of land in pockets like Devanahalli and Sahakar Nagar is projected to double in the next 36 months, making it the most significant investment corridor in Southern India.",
    category: "Market Trends",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "5 Elements of a Sustainable Luxury Villa",
    excerpt: "From rainwater harvesting to solar integration, discover how we build homes that respect the environment.",
    content: "Sustainability is no longer a choice; it's the ultimate luxury. At Manortha Group, we incorporate five core pillars: 1. Passive Solar Design for temperature regulation. 2. Integrated Rainwater Harvesting to achieve water neutrality. 3. Zero-waste Sewage Treatment Plants. 4. Use of local, artisanal stone and wood to reduce carbon footprint. 5. Smart Home automation for energy efficiency. These elements not only preserve the environment but also significantly reduce the long-term maintenance costs for homeowners. Our latest phase at Manortha Greens features 'Active Air' filtration systems that work in tandem with the biophilic courtyards to ensure 99% pure air indoors.",
    category: "Sustainable Living",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "The Psychological Benefits of Open Living Spaces",
    excerpt: "How our 'Emerald Plots' design philosophy incorporates biophilic principles to enhance resident well-being.",
    content: "Biophilia—our innate connection to nature—is the bedrock of our design philosophy. Architecture that provides views of greenery, ample sunlight, and natural textures has been proven to lower cortisol levels. Our developments prioritize 'open-to-sky' courtyards and floor-to-ceiling glass walls. This seamless integration of the outdoors into the living room doesn't just look grand; it fundamentally improves the mental health and sleep quality of our residents. By removing the traditional boundaries of a 'flat', we allow energy to flow freely, creating a sanctuary of cognitive restoration in the heart of the city.",
    category: "Design",
    date: "February 12, 2024",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    readTime: "6 min read"
  }
];

export const MOCK_LEADS: Lead[] = [
  { 
    id: 'l1', 
    name: 'Rahul Sharma', 
    email: 'rahul@example.com', 
    phone: '9876543210', 
    source: 'Facebook', 
    stage: 'New', 
    assignedTo: 'Amit Kumar', 
    createdAt: '2023-10-01',
    budget: 18000000,
    location: 'Indiranagar, Bangalore',
    profession: 'Software Architect',
    totalEngagements: 12,
    lastActive: '2023-10-25'
  },
  { 
    id: 'l2', 
    name: 'Priya Patel', 
    email: 'priya@example.com', 
    phone: '9823456789', 
    source: 'Walk-in', 
    stage: 'Site Visit', 
    assignedTo: 'Amit Kumar', 
    createdAt: '2023-10-05',
    budget: 9500000,
    location: 'Sarjapur, Bangalore',
    profession: 'Business Owner',
    totalEngagements: 25,
    lastActive: '2023-10-26'
  },
  { 
    id: 'l3', 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '9812345678', 
    source: 'WhatsApp', 
    stage: 'Qualified', 
    assignedTo: 'Sarah J', 
    createdAt: '2023-10-10',
    budget: 15000000,
    location: 'Whitefield, Bangalore',
    profession: 'Doctor',
    totalEngagements: 5,
    lastActive: '2023-10-20'
  },
  { 
    id: 'l4', 
    name: 'Sunita Rao', 
    email: 'sunita@example.com', 
    phone: '9898989898', 
    source: 'Partner', 
    stage: 'Booking', 
    assignedTo: 'Amit Kumar', 
    createdAt: '2023-10-12',
    budget: 12000000,
    location: 'Koramangala, Bangalore',
    profession: 'Corporate Lawyer',
    totalEngagements: 42,
    lastActive: '2023-10-27'
  },
];

export const STATUS_COLORS: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  [PropertyStatus.BLOCKED]: 'bg-amber-100 text-amber-700 border-amber-200',
  [PropertyStatus.BOOKED]: 'bg-blue-100 text-blue-700 border-blue-200',
  [PropertyStatus.REGISTERED]: 'bg-purple-100 text-purple-700 border-purple-200',
  [PropertyStatus.CANCELLED]: 'bg-rose-100 text-rose-700 border-rose-200',
};
