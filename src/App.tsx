import React, { useState, useEffect } from 'react';
import  type { Lead, Property, PropertyStatus } from './types';
import { UserRole } from './types';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Leads from './components/Leads';
import Partners from './components/Partners';
import Finance from './components/Finance';
import Customer from './components/Customer';
//import AIAssistant from './components/AIAssistant';
import Website from './components/Website';
import AIChatBox from './components/AIChatBot';
import VideoStudio from './components/VideoStudio';
import AssetStudio from './components/AssetStudio';
import SecurityFlow from './components/SecurityFlow';
import WhatsAppSim from './components/WhatsAppSim';
import SystemSettings from './components/SystemSettings';
import LegacyDashboard from './components/LegacyDashboard';
import Logo from './components/Logo';
import { MOCK_LEADS, MOCK_PROPERTIES } from './constants';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Handshake, 
  IndianRupee, 
  UserCircle,
  Menu,
  X,
  Bot,
  Globe,
  Video,
  LogOut,
  ChevronRight,
  Zap,
  Target,
  ArrowLeft,
  Lock,
  Crown,
  Settings,
  Info,
  Key,
  Award,
  Sparkles
} from 'lucide-react';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [showPortalGateway, setShowPortalGateway] = useState(false);
  const [showSecurityFlow, setShowSecurityFlow] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isPortalLoaded, setIsPortalLoaded] = useState(false);

  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

  useEffect(() => {
    const timer = setTimeout(() => setIsPortalLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddNewLead = (newLead: Partial<Lead>) => {
    const lead: Lead = {
      id: `l${Date.now()}`,
      name: newLead.name || 'Anonymous',
      email: `${newLead.name?.toLowerCase().replace(/\s/g, '')}@example.com`,
      phone: newLead.phone || '',
      source: 'Website Inquiry',
      stage: 'New',
      assignedTo: 'AI Queue',
      createdAt: new Date().toISOString().split('T')[0],
      totalEngagements: 1,
      lastActive: new Date().toISOString().split('T')[0],
      ...newLead
    };
    setLeads(prev => [lead, ...prev]);
  };

  const handleUpdateProperty = (propertyId: string, status: PropertyStatus) => {
    setProperties(prev =>
      prev.map(p => (p.id === propertyId ? { ...p, status } : p))
    );
  };

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGEMENT, UserRole.SALES, UserRole.FINANCE, UserRole.CRM_MANAGER] },
    { id: 'legacy-hub', label: 'Legacy Hub', icon: Award, roles: [UserRole.SUPER_ADMIN, UserRole.LEGACY_PARTNER] },
    { id: 'inventory', label: 'Inventory Heatmap', icon: Building2, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGEMENT, UserRole.SALES, UserRole.CRM_MANAGER, UserRole.PARTNER, UserRole.LEGACY_PARTNER] },
    { id: 'leads', label: 'Lead Engine', icon: Users, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SALES, UserRole.CRM_MANAGER, UserRole.PARTNER, UserRole.LEGACY_PARTNER] },
    { id: 'asset-studio', label: 'Asset Intelligence', icon: Sparkles, roles: [UserRole.SUPER_ADMIN, UserRole.MANAGEMENT] },
    { id: 'video-studio', label: 'Video Studio', icon: Video, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGEMENT, UserRole.LEGACY_PARTNER] },
    { id: 'partners', label: 'Channel Partners', icon: Handshake, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGEMENT, UserRole.LEGACY_PARTNER] },
    { id: 'finance', label: 'Financial Audit', icon: IndianRupee, roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.FINANCE] },
    { id: 'customer', label: 'My Property', icon: UserCircle, roles: [UserRole.CUSTOMER] },
    { id: 'settings', label: 'System Config', icon: Settings, roles: [UserRole.SUPER_ADMIN] },
  ];

  const handleSecurityVerified = () => {
    if (!pendingRole) return;
    setCurrentRole(pendingRole);
    setPendingRole(null);
    setShowSecurityFlow(false);

    if (pendingRole === UserRole.CUSTOMER) setActiveTab('customer');
    else if (pendingRole === UserRole.LEGACY_PARTNER) setActiveTab('legacy-hub');
    else if (pendingRole === UserRole.SALES) setActiveTab('leads');
    else setActiveTab('dashboard');
  };

  if (!isPortalLoaded) {
    return (
      <div className="h-screen bg-manortha-black flex flex-col items-center justify-center text-white">
        <Logo variant="light" size="lg" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-manortha-gold animate-pulse mt-12">
          Establishing Secure Enterprise Context...
        </p>
      </div>
    );
  }

  if (!currentRole && !showPortalGateway) {
    return (
      <div className="relative">
        <Website onLeadSubmit={handleAddNewLead} />
        <div className="fixed top-24 right-8 z-[100] lg:hidden">
          <button
            onClick={() => setShowPortalGateway(true)}
            className="p-4 bg-manortha-black text-manortha-gold rounded-full shadow-2xl border border-manortha-gold/30"
          >
            <Lock size={20} />
          </button>
        </div>
        <AIChatBox />
      </div>
    );
  }

  if (!currentRole && showPortalGateway) {
    return (
      <div className="h-screen bg-manortha-black flex items-center justify-center">
        {showSecurityFlow && (
          <SecurityFlow
            type="LOGIN"
            identifier={pendingRole ? `${pendingRole.toLowerCase()}@manortha.com` : null}
            onVerified={handleSecurityVerified}
            onCancel={() => {
              setShowSecurityFlow(false);
              setPendingRole(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-72 bg-manortha-black text-white">
        <div className="p-8">
          <Logo variant="light" size="sm" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && <Dashboard role={currentRole!} leads={leads} properties={properties} />}
        {activeTab === 'legacy-hub' && <LegacyDashboard />}
        {activeTab === 'inventory' && <Inventory role={currentRole!} properties={properties} onUpdate={handleUpdateProperty} />}
        {activeTab === 'leads' && <Leads role={currentRole!} leads={leads} onUpdate={setLeads} />}
        {activeTab === 'asset-studio' && <AssetStudio />}
        {activeTab === 'partners' && <Partners role={currentRole!} />}
        {activeTab === 'finance' && <Finance role={currentRole!} />}
        {activeTab === 'customer' && <Customer />}
        {activeTab === 'video-studio' && <VideoStudio />}
        {activeTab === 'settings' && <SystemSettings />}
      </main>
    </div>
  );
};

export default App;
