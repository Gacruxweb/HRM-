import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Trash2,
  CalendarDays,
  Clock,
  Info,
  CheckCircle2,
  MoreVertical,
  Edit,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { PayrollCycleRecord } from '../types/payroll';
import SearchFilterBar from './SearchFilterBar';

interface PayrollCycleViewProps {
  onBack: () => void;
}

export default function PayrollCycleView({ onBack }: PayrollCycleViewProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState<PayrollCycleRecord[]>([
    { id: '1', name: 'Standard Monthly', frequency: 'Monthly', payDay: 30, isDefault: true },
    { id: '2', name: 'Executive Bi-weekly', frequency: 'Bi-weekly', payDay: 14, isDefault: false },
    { id: '3', name: 'Contractor Weekly', frequency: 'Weekly', payDay: 5, isDefault: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(cycles[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PayrollCycleRecord>>({
    name: '',
    frequency: 'Monthly',
    payDay: 1,
    isDefault: false
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: PayrollCycleRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const selectedCycle = cycles.find(c => c.id === selectedId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedId) {
      setCycles(prev => prev.map(c => c.id === selectedId ? { ...c, ...formData as PayrollCycleRecord } : c));
      setIsEditing(false);
    } else {
      const newCycle: PayrollCycleRecord = {
        ...formData as PayrollCycleRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      // If new cycle is default, unset others
      if (newCycle.isDefault) {
        setCycles(prev => prev.map(c => ({ ...c, isDefault: false })).concat(newCycle));
      } else {
        setCycles([...cycles, newCycle]);
      }
      setSelectedId(newCycle.id);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      frequency: 'Monthly',
      payDay: 1,
      isDefault: false
    });
    setIsEditing(false);
  };

  const handleEdit = (cycle: PayrollCycleRecord) => {
    setFormData(cycle);
    setSelectedId(cycle.id);
    setIsEditing(true);
    setActiveMenuId(null);
    
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      const firstInput = formRef.current?.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  const handleSelect = (cycle: PayrollCycleRecord) => {
    setSelectedId(cycle.id);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      const newCycles = cycles.filter(c => c.id !== deleteModal.record?.id);
      setCycles(newCycles);
      if (selectedId === deleteModal.record.id) {
        setSelectedId(newCycles[0]?.id || null);
        if (newCycles[0]) setFormData(newCycles[0]);
      }
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  const handleSetDefault = (id: string) => {
    setCycles(prev => prev.map(c => ({
      ...c,
      isDefault: c.id === id
    })));
    setActiveMenuId(null);
  };

  const filteredCycles = cycles.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.frequency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Payroll Setting</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Payroll Cycle</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll Cycle Management</h2>
      </div>

      {/* Top Section: Input Form */}
      <div ref={formRef} className="bg-white rounded-2xl border border-slate-200 shadow-sm relative">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Cycle Configuration</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cycle Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Standard Monthly"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Frequency <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Pay Day (Day of Month/Week) <span className="text-rose-500">*</span></label>
                <input 
                  type="number" 
                  required
                  min={1}
                  max={31}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.payDay}
                  onChange={(e) => setFormData({ ...formData, payDay: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Set as Default Cycle</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {isEditing && (
                <button 
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
              >
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Cycle' : 'Create Cycle'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section: Cycle List & Details */}
      <div className="space-y-6">
        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search payroll cycles..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Payroll Cycle List</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
          {/* Left Side: Cycle List (Tabs) */}
          <div className="lg:col-span-3 border-r border-slate-100 bg-slate-50/30 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {filteredCycles.map((cycle) => (
                <div 
                  key={cycle.id}
                  onClick={() => handleSelect(cycle)}
                  className={cn(
                    "px-6 py-4 cursor-pointer transition-all border-b border-slate-100/50 relative group flex items-center justify-between",
                    selectedId === cycle.id ? "text-indigo-600 font-bold bg-white" : "text-slate-600 hover:bg-white/50"
                  )}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{cycle.name}</span>
                      {cycle.isDefault && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{cycle.frequency}</span>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === cycle.id ? null : cycle.id);
                      }}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        activeMenuId === cycle.id ? "bg-slate-100 text-slate-600" : "opacity-0 group-hover:opacity-100 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      )}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === cycle.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                          {!cycle.isDefault && (
                            <button 
                              onClick={() => handleSetDefault(cycle.id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                            >
                              <Star className="w-4 h-4" />
                              Set as Default
                            </button>
                          )}
                          <button 
                            onClick={() => handleEdit(cycle)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Cycle
                          </button>
                          <button 
                            onClick={() => { 
                              setDeleteModal({ isOpen: true, record: cycle }); 
                              setActiveMenuId(null); 
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Cycle
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Cycle Details */}
          <div className="lg:col-span-9 p-10 relative bg-white">
            {selectedCycle ? (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          selectedCycle.frequency === 'Monthly' ? "bg-indigo-100 text-indigo-700" :
                          selectedCycle.frequency === 'Bi-weekly' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {selectedCycle.frequency}
                        </span>
                        {selectedCycle.isDefault && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-700" />
                            Default
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                        {selectedCycle.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-4 h-4 text-indigo-500" />
                          <span>Pay Day: <span className="text-slate-900 font-bold">{selectedCycle.payDay}{selectedCycle.payDay === 1 ? 'st' : selectedCycle.payDay === 2 ? 'nd' : selectedCycle.payDay === 3 ? 'rd' : 'th'} of the period</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        Cycle Schedule
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Frequency</span>
                          <span className="font-bold text-slate-700">{selectedCycle.frequency}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Next Pay Date</span>
                          <span className="font-bold text-slate-700">April {selectedCycle.payDay}, 2026</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Cut-off Date</span>
                          <span className="font-bold text-slate-700">April {Math.max(1, selectedCycle.payDay - 5)}, 2026</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                      <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        Cycle Status
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-indigo-600">Active Employees</span>
                          <span className="font-bold text-indigo-900">124</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-indigo-600">Compliance</span>
                          <span className="font-bold text-indigo-900">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50">
                  <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                    <Info className="w-5 h-5 text-amber-500 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <strong>Note:</strong> Changing the payroll cycle will affect all employees assigned to it. Ensure that the new pay dates align with your company's financial schedule.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                  <CalendarDays className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Cycle</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Choose a payroll cycle from the list on the left to view its detailed configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, record: null })}
        onConfirm={confirmDelete}
        title="Delete Payroll Cycle"
        message={`Are you sure you want to delete the cycle "${deleteModal.record?.name}"? This action cannot be undone and may affect employee assignments.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
