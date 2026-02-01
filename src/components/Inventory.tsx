import React, { useState, useMemo } from 'react';
import { UserRole, PropertyStatus } from "../types";
import type { Property } from "../types";

import { STATUS_COLORS, PROJECTS } from '../constants';
import { 
  Search, 
  Grid3X3, 
  Layers, 
  ShieldAlert, 
  CalendarCheck,
  Globe,
  Loader2,
  CheckCircle,
  ArrowRight,
  Package,
  Activity,
  MapPin,
  ExternalLink,
  Navigation,
  X
} from 'lucide-react';

import { getNearbyLandmarks } from '../services/gemini';

interface InventoryProps {
  role: UserRole;
  properties: Property[];
  onUpdate: (id: string, status: PropertyStatus) => void;
}

const Inventory: React.FC<InventoryProps> = ({ role, properties, onUpdate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'heatmap'>('grid');
  const [filterProject, setFilterProject] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  
  const [locationDetails, setLocationDetails] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  const propertyTypes: Property['type'][] = ['Plot', 'Villa', 'Apartment', 'Commercial'];
  const propertyStatuses = Object.values(PropertyStatus);

  const filtered = properties.filter(p => 
    (filterProject === 'All' || p.project === filterProject) &&
    (filterType === 'All' || p.type === filterType) &&
    (filterStatus === 'All' || p.status === filterStatus) &&
    p.unitNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSyncToWeb = async (id: string) => {
    setSyncingId(id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const p = properties.find(prop => prop.id === id);
    if (p) p.isPublishedToWeb = true;
    setSyncingId(null);
  };

  const handleMapAnalysis = async (unit: Property) => {
    setLoadingMap(true);
    const result = await getNearbyLandmarks(`${unit.project}, Bangalore`);
    setLocationDetails({ ...result, unit });
    setLoadingMap(false);
  };

  const heatmapData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    PROJECTS.forEach(project => {
      matrix[project] = {};
      propertyTypes.forEach(type => {
        matrix[project][type] = properties.filter(
          p => p.project === project && p.type === type && p.status === PropertyStatus.AVAILABLE
        ).length;
      });
    });
    return matrix;
  }, [properties]);

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-slate-50 text-slate-300 border-slate-100';
    if (count <= 2) return 'bg-manortha-gold/10 text-manortha-gold border-manortha-gold/20 hover:bg-manortha-gold/20';
    if (count <= 5) return 'bg-manortha-gold/30 text-manortha-black border-manortha-gold/40 hover:bg-manortha-gold/40';
    return 'bg-manortha-gold text-white border-manortha-gold hover:brightness-110';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Project Inventory</h2>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')}><Grid3X3 /></button>
          <button onClick={() => setViewMode('heatmap')}><Layers /></button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <InventorySummaryCard label="Total Units" value={properties.length} sub="Across projects" icon={Package} />
        <InventorySummaryCard label="Available" value={properties.filter(p => p.status === PropertyStatus.AVAILABLE).length} sub="Ready" icon={CheckCircle} />
        <InventorySummaryCard label="Blocked" value={properties.filter(p => p.status === PropertyStatus.BLOCKED).length} sub="Pending" icon={ShieldAlert} />
        <InventorySummaryCard label="Sold" value={properties.filter(p => p.status === PropertyStatus.BOOKED || p.status === PropertyStatus.REGISTERED).length} sub="Closed" icon={Activity} />
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map(unit => (
            <div key={unit.id} className={STATUS_COLORS[unit.status]}>
              <p>{unit.unitNo}</p>
              <button onClick={() => onUpdate(unit.id, PropertyStatus.BOOKED)}>Book</button>
              <button onClick={() => handleMapAnalysis(unit)}>Map</button>
            </div>
          ))}
        </div>
      )}

      {locationDetails && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <button onClick={() => setLocationDetails(null)}><X /></button>
            <p>{locationDetails.text}</p>
            {locationDetails.chunks?.map((c: any, i: number) => (
              <a key={i} href={c.web.uri} target="_blank">
                {c.web.title} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const InventorySummaryCard = ({ label, value, sub, icon: Icon }: any) => (
  <div className="p-4 border rounded">
    <Icon />
    <p>{label}</p>
    <h3>{value}</h3>
    <small>{sub}</small>
  </div>
);

export default Inventory;
