'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  useGetSingaporeTransfersQuery, useSaveSingaporeTransferMutation, useDeleteSingaporeTransferMutation,
  useGetCrossBorderTransfersQuery, useSaveCrossBorderTransferMutation, useDeleteCrossBorderTransferMutation,
  useGetSingaporeToursQuery, useSaveSingaporeTourMutation, useDeleteSingaporeTourMutation,
  useGetMalaysiaToursQuery, useSaveMalaysiaTourMutation, useDeleteMalaysiaTourMutation,
  useGetSingaporeAttractionsQuery, useSaveSingaporeAttractionMutation, useDeleteSingaporeAttractionMutation
} from '@/lib/store/crm-api';
import { 
  Car, Layers, Plus, Trash2, Edit2, Upload, RefreshCw, LogOut, CheckCircle2, Ticket, Map, Plane, Image as ImageIcon, Briefcase, Info, DollarSign, Users, AlertCircle
} from 'lucide-react';

type SectionKey = 'SINGAPORE_TRANSFER' | 'CROSS_BORDER_TRANSFER' | 'SINGAPORE_TOURS' | 'MALAYSIA_TOURS' | 'SINGAPORE_ATTRACTIONS';

const SECTION_LABELS: Record<SectionKey, string> = {
  SINGAPORE_TRANSFER: 'Singapore Transfer',
  CROSS_BORDER_TRANSFER: 'Cross Border',
  SINGAPORE_TOURS: 'Singapore Tours',
  MALAYSIA_TOURS: 'Malaysia Tours',
  SINGAPORE_ATTRACTIONS: 'Attractions',
};

const SECTION_KEYS: SectionKey[] = [
  'SINGAPORE_TRANSFER', 'CROSS_BORDER_TRANSFER', 'SINGAPORE_TOURS', 'MALAYSIA_TOURS', 'SINGAPORE_ATTRACTIONS'
];

function FormField({ label, children, colSpan = 1, icon }: { label: string; children: React.ReactNode; colSpan?: number; icon?: React.ReactNode }) {
  return (
    <div className={`col-span-${colSpan} flex flex-col gap-1.5`}>
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-1.5 mb-0.5">
        {icon}
        {label}
      </label>
      <div className="relative group">
        {children}
      </div>
    </div>
  );
}

function SectionDivider({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-6 pb-2 border-b border-white/5 mb-4 col-span-full">
      <div className="text-amber-500/80">{icon}</div>
      <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-widest">{title}</h4>
      <div className="flex-1 border-b border-dashed border-white/5 mx-2"></div>
    </div>
  );
}

export function CrmDashboard({ adminEmail }: { adminEmail: string }) {
  const [activeTab, setActiveTab] = useState<SectionKey>('SINGAPORE_TRANSFER');
  const [draft, setDraft] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  // Queries
  const qSt = useGetSingaporeTransfersQuery(undefined, { skip: activeTab !== 'SINGAPORE_TRANSFER' });
  const qCbt = useGetCrossBorderTransfersQuery(undefined, { skip: activeTab !== 'CROSS_BORDER_TRANSFER' });
  const qSgt = useGetSingaporeToursQuery(undefined, { skip: activeTab !== 'SINGAPORE_TOURS' });
  const qMyt = useGetMalaysiaToursQuery(undefined, { skip: activeTab !== 'MALAYSIA_TOURS' });
  const qAtt = useGetSingaporeAttractionsQuery(undefined, { skip: activeTab !== 'SINGAPORE_ATTRACTIONS' });

  // Mutations
  const [saveSt, { isLoading: sSt }] = useSaveSingaporeTransferMutation();
  const [delSt] = useDeleteSingaporeTransferMutation();
  const [saveCbt, { isLoading: sCbt }] = useSaveCrossBorderTransferMutation();
  const [delCbt] = useDeleteCrossBorderTransferMutation();
  const [saveSgt, { isLoading: sSgt }] = useSaveSingaporeTourMutation();
  const [delSgt] = useDeleteSingaporeTourMutation();
  const [saveMyt, { isLoading: sMyt }] = useSaveMalaysiaTourMutation();
  const [delMyt] = useDeleteMalaysiaTourMutation();
  const [saveAtt, { isLoading: sAtt }] = useSaveSingaporeAttractionMutation();
  const [delAtt] = useDeleteSingaporeAttractionMutation();

  useEffect(() => {
    setEditingId(null);
    setDraft({});
    setDeleteConfirm(null);
  }, [activeTab]);

  const isLoading = 
    activeTab === 'SINGAPORE_TRANSFER' ? qSt.isFetching :
    activeTab === 'CROSS_BORDER_TRANSFER' ? qCbt.isFetching :
    activeTab === 'SINGAPORE_TOURS' ? qSgt.isFetching :
    activeTab === 'MALAYSIA_TOURS' ? qMyt.isFetching :
    qAtt.isFetching;

  const isSaving = 
    activeTab === 'SINGAPORE_TRANSFER' ? sSt :
    activeTab === 'CROSS_BORDER_TRANSFER' ? sCbt :
    activeTab === 'SINGAPORE_TOURS' ? sSgt :
    activeTab === 'MALAYSIA_TOURS' ? sMyt :
    sAtt;

  const dataList = 
    activeTab === 'SINGAPORE_TRANSFER' ? qSt.data?.data :
    activeTab === 'CROSS_BORDER_TRANSFER' ? qCbt.data?.data :
    activeTab === 'SINGAPORE_TOURS' ? qSgt.data?.data :
    activeTab === 'MALAYSIA_TOURS' ? qMyt.data?.data :
    qAtt.data?.data;

  const refetch = () => {
    if (activeTab === 'SINGAPORE_TRANSFER') qSt.refetch();
    if (activeTab === 'CROSS_BORDER_TRANSFER') qCbt.refetch();
    if (activeTab === 'SINGAPORE_TOURS') qSgt.refetch();
    if (activeTab === 'MALAYSIA_TOURS') qMyt.refetch();
    if (activeTab === 'SINGAPORE_ATTRACTIONS') qAtt.refetch();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { id: editingId || undefined, data: draft };
    if (activeTab === 'SINGAPORE_TRANSFER') await saveSt(payload);
    if (activeTab === 'CROSS_BORDER_TRANSFER') await saveCbt(payload);
    if (activeTab === 'SINGAPORE_TOURS') await saveSgt(payload);
    if (activeTab === 'MALAYSIA_TOURS') await saveMyt(payload);
    if (activeTab === 'SINGAPORE_ATTRACTIONS') await saveAtt(payload);
    
    setEditingId(null);
    setDraft({});
  };

  const handleDelete = async (id: string) => {
    if (activeTab === 'SINGAPORE_TRANSFER') await delSt(id);
    if (activeTab === 'CROSS_BORDER_TRANSFER') await delCbt(id);
    if (activeTab === 'SINGAPORE_TOURS') await delSgt(id);
    if (activeTab === 'MALAYSIA_TOURS') await delMyt(id);
    if (activeTab === 'SINGAPORE_ATTRACTIONS') await delAtt(id);
    setDeleteConfirm(null);
  };

  const handleUpload = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('service', activeTab.toLowerCase());
      const res = await fetch('/api/crm/uploads/image', { method: 'POST', body: formData });
      const payload = await res.json();
      if (payload.url) {
        if (activeTab === 'SINGAPORE_TOURS' || activeTab === 'MALAYSIA_TOURS') {
          setDraft((prev: any) => {
            if (!prev.image) {
              return { ...prev, image: payload.url };
            } else {
              return { 
                ...prev, 
                images: [...(prev.images || []), { imageUrl: payload.url }] 
              };
            }
          });
        } else if (activeTab === 'SINGAPORE_ATTRACTIONS') {
           setDraft((prev: any) => ({ ...prev, imageUrl: payload.url }));
        } else {
          setDraft((prev: any) => ({ ...prev, imageUrl: payload.url }));
        }
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const renderIcon = (key: string) => {
    switch(key) {
      case 'SINGAPORE_TRANSFER': return <Car size={18} />;
      case 'CROSS_BORDER_TRANSFER': return <Plane size={18} />;
      case 'SINGAPORE_TOURS': return <Map size={18} />;
      case 'MALAYSIA_TOURS': return <Map size={18} />;
      case 'SINGAPORE_ATTRACTIONS': return <Ticket size={18} />;
      default: return <Layers size={18} />;
    }
  };

  // Base input class
  const inputCls = "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-white/20";

  return (
    <div className="flex h-screen bg-[#020202] text-slate-200 font-sans overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel {
          background: rgba(15, 15, 20, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />

      {/* Sidebar Navigation */}
      <aside className="w-72 glass-panel flex flex-col z-10 border-r border-white/5 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div className="p-8 pb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
            <Layers className="text-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
            Glance CRM
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 truncate max-w-[200px]">{adminEmail}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          <div>
            <div className="text-[10px] font-bold text-slate-600 mb-4 tracking-[0.2em] px-4 uppercase">Content Manager</div>
            <div className="space-y-1.5">
              {SECTION_KEYS.map((key) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium relative group overflow-hidden ${
                      isActive ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-amber-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
                    <div className={isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
                      {renderIcon(key)}
                    </div>
                    <span>{SECTION_LABELS[key]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6">
          <button 
            onClick={() => { fetch('/api/crm/auth/logout', {method: 'POST'}).then(() => window.location.href='/crm/login') }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 group"
          >
            <LogOut size={16} className="group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020202] to-[#020202]">
        <header className="h-24 glass-panel border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div>
            <h2 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
              {SECTION_LABELS[activeTab]}
              {isLoading && <RefreshCw size={16} className="animate-spin text-amber-500" />}
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Live Sync Active
            </p>
          </div>
          <button 
            onClick={refetch}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin text-amber-500' : ''} />
            Refresh Data
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form Panel (Left) */}
            <div className="xl:col-span-5 glass-panel rounded-3xl p-8 relative shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-3xl opacity-80 z-10"></div>
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${editingId ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30' : 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30'}`}>
                    {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white tracking-tight">{editingId ? 'Edit Entry' : 'Create New Entry'}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{SECTION_LABELS[activeTab]}</p>
                  </div>
                </div>
                {editingId && (
                  <button onClick={() => {setEditingId(null); setDraft({});}} className="text-xs font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-white/5">Cancel</button>
                )}
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-5">
                
                {/* 1. Singapore Transfer Form */}
                {activeTab === 'SINGAPORE_TRANSFER' && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <SectionDivider title="Basic Details" icon={<Info size={16} />} />
                    <FormField label="Vehicle Name" colSpan={2}>
                      <input required className={inputCls} value={draft.name || ''} onChange={e => setDraft({...draft, name: e.target.value})} placeholder="e.g. Mercedes S-Class" />
                    </FormField>
                    <FormField label="Category" colSpan={2}>
                      <select required className={`${inputCls} appearance-none cursor-pointer`} value={draft.category || 'LUXURY'} onChange={e => setDraft({...draft, category: e.target.value})}>
                        <option value="LUXURY">Luxury</option>
                        <option value="BUSINESS">Business</option>
                        <option value="PREMIUM_ECONOMY">Premium Economy</option>
                        <option value="ECONOMY">Economy</option>
                        <option value="VAN">Van</option>
                        <option value="BUS">Bus</option>
                      </select>
                    </FormField>

                    <SectionDivider title="Specifications" icon={<Briefcase size={16} />} />
                    <FormField label="Max Pax">
                      <input required type="number" className={inputCls} value={draft.personCapacity || 0} onChange={e => setDraft({...draft, personCapacity: +e.target.value})} placeholder="0"/>
                    </FormField>
                    <FormField label="Child Seat">
                      <select className={`${inputCls} appearance-none cursor-pointer`} value={draft.hasChildSeat ? 'yes' : 'no'} onChange={e => setDraft({...draft, hasChildSeat: e.target.value === 'yes'})}>
                        <option value="no">Not Included</option>
                        <option value="yes">Available</option>
                      </select>
                    </FormField>
                    <FormField label="Small Luggage">
                      <input required type="number" className={inputCls} value={draft.smallLuggage || 0} onChange={e => setDraft({...draft, smallLuggage: +e.target.value})} placeholder="0"/>
                    </FormField>
                    <FormField label="Big Luggage">
                      <input required type="number" className={inputCls} value={draft.bigLuggage || 0} onChange={e => setDraft({...draft, bigLuggage: +e.target.value})} placeholder="0"/>
                    </FormField>

                    <SectionDivider title="Pricing Details" icon={<DollarSign size={16} />} />
                    <FormField label="Rate Per Transfer (SGD)">
                      <input required type="number" className={inputCls} value={draft.ratePerTransfer || 0} onChange={e => setDraft({...draft, ratePerTransfer: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Price Per Hour (SGD)">
                      <input required type="number" className={inputCls} value={draft.pricePerHour || 0} onChange={e => setDraft({...draft, pricePerHour: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                  </div>
                )}

                {/* 2. Cross Border Transfer Form */}
                {activeTab === 'CROSS_BORDER_TRANSFER' && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <SectionDivider title="Route Details" icon={<Map size={16} />} />
                    <FormField label="Destination" colSpan={2}>
                      <input required className={inputCls} value={draft.destination || ''} onChange={e => setDraft({...draft, destination: e.target.value})} placeholder="e.g. Johor Bahru" />
                    </FormField>
                    <FormField label="Description" colSpan={2}>
                      <textarea rows={3} className={`${inputCls} resize-none`} value={draft.description || ''} onChange={e => setDraft({...draft, description: e.target.value})} placeholder="Describe the route highlights..." />
                    </FormField>
                    <FormField label="Distance (km)" colSpan={2}>
                      <input required type="number" className={inputCls} value={draft.distanceKm || 0} onChange={e => setDraft({...draft, distanceKm: +e.target.value})} placeholder="0" />
                    </FormField>

                    <SectionDivider title="Rates by Class (SGD)" icon={<DollarSign size={16} />} />
                    <FormField label="Economy Class">
                      <input required type="number" className={inputCls} value={draft.priceEconomy || 0} onChange={e => setDraft({...draft, priceEconomy: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Premium Class">
                      <input required type="number" className={inputCls} value={draft.pricePremium || 0} onChange={e => setDraft({...draft, pricePremium: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Business Class">
                      <input required type="number" className={inputCls} value={draft.priceBusiness || 0} onChange={e => setDraft({...draft, priceBusiness: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Luxury Class">
                      <input required type="number" className={inputCls} value={draft.priceLuxury || 0} onChange={e => setDraft({...draft, priceLuxury: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                  </div>
                )}

                {/* 3 & 4. Tours Form */}
                {(activeTab === 'SINGAPORE_TOURS' || activeTab === 'MALAYSIA_TOURS') && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <SectionDivider title="Event Info" icon={<Info size={16} />} />
                    <FormField label="Tour Title" colSpan={2}>
                      <input required className={inputCls} value={draft.title || ''} onChange={e => setDraft({...draft, title: e.target.value})} placeholder="e.g. Sentosa Adventure" />
                    </FormField>
                    <FormField label="Description" colSpan={2}>
                      <textarea rows={3} className={`${inputCls} resize-none`} value={draft.description || ''} onChange={e => setDraft({...draft, description: e.target.value})} placeholder="Describe the tour highlights..." />
                    </FormField>
                    <FormField label="Category">
                      <input required className={inputCls} value={draft.category || ''} onChange={e => setDraft({...draft, category: e.target.value})} placeholder="e.g. Family, Night" />
                    </FormField>
                    <FormField label="Duration">
                      <input required className={inputCls} value={draft.duration || ''} onChange={e => setDraft({...draft, duration: e.target.value})} placeholder="e.g. 4 Hrs"/>
                    </FormField>
                    <FormField label="Service Mode" colSpan={2}>
                      <input required className={inputCls} value={draft.serviceMode || ''} onChange={e => setDraft({...draft, serviceMode: e.target.value})} placeholder="e.g. full-driver, two-way"/>
                    </FormField>

                    <SectionDivider title="Pricing (SGD)" icon={<DollarSign size={16} />} />
                    <FormField label="Adult Price">
                      <input required type="number" className={inputCls} value={draft.adultPrice || 0} onChange={e => setDraft({...draft, adultPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Child Price">
                      <input required type="number" className={inputCls} value={draft.childPrice || 0} onChange={e => setDraft({...draft, childPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Min. Adults" colSpan={2}>
                      <input required type="number" className={inputCls} value={draft.minAdults || 2} onChange={e => setDraft({...draft, minAdults: +e.target.value})} placeholder="2"/>
                    </FormField>
                  </div>
                )}

                {/* 5. Attractions Form */}
                {activeTab === 'SINGAPORE_ATTRACTIONS' && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                    <SectionDivider title="Attraction Details" icon={<Info size={16} />} />
                    <FormField label="Attraction Name" colSpan={2}>
                      <input required className={inputCls} value={draft.name || ''} onChange={e => setDraft({...draft, name: e.target.value})} placeholder="e.g. Universal Studios" />
                    </FormField>
                    <FormField label="Description" colSpan={2}>
                      <textarea rows={3} className={`${inputCls} resize-none`} value={draft.description || ''} onChange={e => setDraft({...draft, description: e.target.value})} placeholder="Describe the attraction highlights..." />
                    </FormField>
                    <FormField label="Category">
                      <input required className={inputCls} value={draft.category || ''} onChange={e => setDraft({...draft, category: e.target.value})} placeholder="e.g. Sentosa"/>
                    </FormField>
                    <FormField label="Audience">
                      <input required className={inputCls} value={draft.audience || ''} onChange={e => setDraft({...draft, audience: e.target.value})} placeholder="e.g. Family"/>
                    </FormField>
                    <FormField label="Badge Text" colSpan={2}>
                      <input className={inputCls} value={draft.badge || ''} onChange={e => setDraft({...draft, badge: e.target.value})} placeholder="e.g. Popular Choice" />
                    </FormField>

                    <SectionDivider title="Publish Prices (SGD)" icon={<DollarSign size={16} />} />
                    <FormField label="Adult (Publish)">
                      <input required type="number" className={inputCls} value={draft.adultPublishPrice || 0} onChange={e => setDraft({...draft, adultPublishPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Child (Publish)">
                      <input required type="number" className={inputCls} value={draft.childPublishPrice || 0} onChange={e => setDraft({...draft, childPublishPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>

                    <SectionDivider title="Our Prices (SGD)" icon={<DollarSign size={16} />} />
                    <FormField label="Adult (Our Price)">
                      <input required type="number" className={inputCls} value={draft.adultOurPrice || 0} onChange={e => setDraft({...draft, adultOurPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                    <FormField label="Child (Our Price)">
                      <input required type="number" className={inputCls} value={draft.childOurPrice || 0} onChange={e => setDraft({...draft, childOurPrice: +e.target.value})} placeholder="0.00"/>
                    </FormField>
                  </div>
                )}

                {/* Media Uploader */}
{/* Media Uploader */}
                {(
                  <div className="mt-4">
                     <SectionDivider title="Media" icon={<ImageIcon size={16} />} />
                     <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={e => handleUpload(Array.from(e.target.files||[]))} />
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="h-32 w-full border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 hover:border-amber-500/50 transition-all cursor-pointer text-slate-400 group"
                        >
                          {uploading ? <RefreshCw className="animate-spin text-amber-500 min-w-8 min-h-8" /> : (
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">
                              <Upload size={18} />
                            </div>
                          )}
                          <span className="text-xs font-medium tracking-wide">Add { (activeTab.includes('TOUR')) ? 'Gallery' : '' } Image</span>
                        </button>

                        {/* Existing Single Image (Transfers/Attractions) */}
                        {!activeTab.includes('TOUR') && draft.imageUrl && (
                          <div className="h-32 relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                            <img src={draft.imageUrl} className="w-full h-full object-cover" alt="Preview"/>
                            <div className="absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex">
                             <button type="button" onClick={() => setDraft({...draft, imageUrl: ''})} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                               <Trash2 size={16}/>
                             </button>
                            </div>
                          </div>
                        )}

                        {/* Main Image (Tours) */}
                        {activeTab.includes('TOUR') && draft.image && (
                          <div className="h-32 relative rounded-2xl overflow-hidden border border-amber-500/50 group shadow-lg">
                            <div className="absolute top-2 left-2 z-10 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">MAIN</div>
                            <img src={draft.image} className="w-full h-full object-cover" alt="Main"/>
                            <div className="absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex">
                             <button type="button" onClick={() => setDraft({...draft, image: ''})} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                               <Trash2 size={16}/>
                             </button>
                            </div>
                          </div>
                        )}

                        {/* Gallery Images (Tours) */}
                        {activeTab.includes('TOUR') && draft.images?.map((img: any, idx: number) => (
                          <div key={idx} className="h-32 relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                            <img src={img.imageUrl} className="w-full h-full object-cover" alt="Preview"/>
                            <div className="absolute inset-0 bg-black/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex">
                             <button type="button" onClick={() => {
                               const next = [...(draft.images || [])];
                               next.splice(idx, 1);
                               setDraft({...draft, images: next});
                             }} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                               <Trash2 size={16}/>
                             </button>
                            </div>
                          </div>
                        ))}

                        {/* Placeholder if empty */}
                        {!draft.imageUrl && (!draft.images || draft.images.length === 0) && (
                          <div className="h-32 rounded-2xl border border-white/5 bg-black/20 flex flex-col items-center justify-center text-slate-600 gap-2">
                            <ImageIcon size={24} className="opacity-50" />
                            <span className="text-xs font-medium">No images uploaded</span>
                          </div>
                        )}
                      </div>
                  </div>
                )}

                <div className="pt-8 flex items-center justify-end border-t border-white/5 mt-4">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                    {editingId ? 'Save Changes' : 'Publish Entry'}
                  </button>
                </div>

              </form>
            </div>

            {/* List View Panel (Right) */}
            <div className="xl:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-white">Active Database Entries</h3>
                <span className="text-xs font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400">
                  {dataList?.length || 0} total
                </span>
              </div>

              {!dataList?.length && !isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 glass-panel rounded-3xl border-dashed border border-white/10">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <AlertCircle size={28} className="text-slate-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">No entries yet.</p>
                  <p className="text-xs mt-1">Use the form to create your first one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dataList?.map((item: any) => (
                    <div key={item.id} className="glass-panel p-5 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 transition-all outline outline-1 outline-transparent hover:outline-white/10 group">
                      
                      <div className="flex gap-4">
                        {(item.imageUrl || (item.images && item.images.length > 0)) ? (
                          <div className="w-20 h-20 rounded-xl bg-black/40 overflow-hidden border border-white/10 shrink-0 shadow-inner">
                            <img src={item.imageUrl || item.images[0].imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt=""/>
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-black/40 flex items-center justify-center border border-white/10 shrink-0 text-slate-700 shadow-inner">
                            {renderIcon(activeTab)}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base text-white truncate group-hover:text-amber-400 transition-colors">
                            {item.name || item.title || item.destination}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded flex items-center text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300">
                              {item.category || item.serviceMode || `${item.distanceKm} km`}
                            </span>
                          </div>
                          
                          {/* Quick Stats/Pricing Preview */}
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                            {activeTab === 'SINGAPORE_TRANSFER' && (
                              <>
                                <span className="flex items-center gap-1.5"><Users size={12}/>{item.personCapacity} Max</span>
                                <span className="flex items-center gap-1.5"><DollarSign size={12}/>{item.ratePerTransfer}/trip</span>
                              </>
                            )}
                            {activeTab === 'CROSS_BORDER_TRANSFER' && (
                              <>
                                <span className="flex items-center gap-1.5"><Info size={12}/>Economy</span>
                                <span className="flex items-center gap-1.5 text-emerald-400"><DollarSign size={12}/>{item.priceEconomy}</span>
                              </>
                            )}
                            {(activeTab === 'SINGAPORE_TOURS' || activeTab === 'MALAYSIA_TOURS') && (
                              <>
                                <span className="flex items-center gap-1.5"><Info size={12}/>{item.duration}</span>
                                <span className="flex items-center gap-1.5 text-emerald-400"><DollarSign size={12}/>{item.adultPrice}/adult</span>
                              </>
                            )}
                            {activeTab === 'SINGAPORE_ATTRACTIONS' && (
                              <>
                                <span className="flex items-center gap-1.5"><Ticket size={12}/>{item.audience}</span>
                                <span className="flex items-center gap-1.5 text-emerald-400"><DollarSign size={12}/>{item.adultOurPrice}/adult</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono">ID: {item.id.slice(-6).toUpperCase()}</span>
                        
                        <div className="flex items-center gap-2">
                          {deleteConfirm === item.id ? (
                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors">Cancel</button>
                              <button type="button" onClick={() => handleDelete(item.id)} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-colors">Confirm</button>
                            </div>
                          ) : (
                            <>
                              <button type="button" onClick={() => { setEditingId(item.id); setDraft(item); }} className="p-2.5 bg-white/5 border border-white/5 hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-400 rounded-xl text-slate-400 transition-all">
                                <Edit2 size={14} />
                              </button>
                              <button type="button" onClick={() => setDeleteConfirm(item.id)} className="p-2.5 bg-white/5 border border-white/5 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 rounded-xl text-slate-400 transition-all">
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
