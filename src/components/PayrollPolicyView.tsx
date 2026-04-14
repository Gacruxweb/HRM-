import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Trash2,
  FileText,
  Clock,
  Info,
  CheckCircle2,
  MoreVertical,
  Edit,
  ShieldCheck,
  Banknote,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { PayrollPolicyRecord } from '../types/payroll';
import SearchFilterBar from './SearchFilterBar';

interface PayrollPolicyViewProps {
  onBack: () => void;
}

export default function PayrollPolicyView({ onBack }: PayrollPolicyViewProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [policies, setPolicies] = useState<PayrollPolicyRecord[]>([
    { 
      id: '1', 
      name: 'Late Arrival Deduction', 
      category: 'Deduction',
      countType: 'Daily basis', 
      considerableValue: 3, // instances
      adjustedValue: 0.5, // half day deduction
      description: 'Beyond 3 late arrivals in a month, 0.5 day salary is deducted for every subsequent late arrival.'
    },
    { 
      id: '2', 
      name: 'Standard Overtime', 
      category: 'Overtime',
      countType: 'Hourly basis', 
      considerableValue: 1, 
      adjustedValue: 1.5, // 1.5x rate
      description: 'Overtime is calculated at 1.5x the hourly rate for hours worked beyond the standard 40-hour work week.'
    },
    { 
      id: '3', 
      name: 'Weekend Overtime', 
      category: 'Overtime',
      countType: 'Hourly basis', 
      considerableValue: 1, 
      adjustedValue: 2.0, // 2.0x rate
      description: 'Overtime is calculated at 2.0x the hourly rate for hours worked on weekends or public holidays.'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(policies[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PayrollPolicyRecord>>({
    name: '',
    category: 'Deduction',
    countType: 'Daily basis',
    considerableValue: 0,
    adjustedValue: 0,
    description: ''
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: PayrollPolicyRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const selectedPolicy = policies.find(p => p.id === selectedId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedId) {
      setPolicies(prev => prev.map(p => p.id === selectedId ? { ...p, ...formData as PayrollPolicyRecord } : p));
      setIsEditing(false);
    } else {
      const newPolicy: PayrollPolicyRecord = {
        ...formData as PayrollPolicyRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setPolicies([...policies, newPolicy]);
      setSelectedId(newPolicy.id);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Deduction',
      countType: 'Daily basis',
      considerableValue: 0,
      adjustedValue: 0,
      description: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (policy: PayrollPolicyRecord) => {
    setFormData(policy);
    setSelectedId(policy.id);
    setIsEditing(true);
    setActiveMenuId(null);
    
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      const firstInput = formRef.current?.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 100);
  };

  const handleSelect = (policy: PayrollPolicyRecord) => {
    setSelectedId(policy.id);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      const newPolicies = policies.filter(p => p.id !== deleteModal.record?.id);
      setPolicies(newPolicies);
      if (selectedId === deleteModal.record.id) {
        setSelectedId(newPolicies[0]?.id || null);
        if (newPolicies[0]) setFormData(newPolicies[0]);
      }
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  const filteredPolicies = policies.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        <span className="text-indigo-600 font-bold">Payroll Policy</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll Policy Management</h2>
      </div>

      {/* Top Section: Input Form */}
      <div ref={formRef} className="bg-white rounded-2xl border border-slate-200 shadow-sm relative">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Policy Configuration</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Policy Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Late Arrival Deduction"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                >
                  <option value="Deduction">Deduction</option>
                  <option value="Overtime">Overtime</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Count Type <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.countType}
                  onChange={(e) => setFormData({ ...formData, countType: e.target.value as any })}
                >
                  <option value="Daily basis">Daily basis</option>
                  <option value="Hourly basis">Hourly basis</option>
                  <option value="Flat amount">Flat amount</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Considerable Value (Instances/Hours) <span className="text-rose-500">*</span></label>
                <input 
                  type="number" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.considerableValue}
                  onChange={(e) => setFormData({ ...formData, considerableValue: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Adjusted Value (Multiplier/Amount) <span className="text-rose-500">*</span></label>
                <input 
                  type="number" 
                  required
                  step="0.1"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.adjustedValue}
                  onChange={(e) => setFormData({ ...formData, adjustedValue: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Policy Description</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-4">
                  <button type="button" className="p-1 hover:bg-white rounded transition-colors text-slate-600 font-bold text-xs">B</button>
                  <button type="button" className="p-1 hover:bg-white rounded transition-colors text-slate-600 italic text-xs">I</button>
                  <button type="button" className="p-1 hover:bg-white rounded transition-colors text-slate-600 underline text-xs">U</button>
                  <div className="w-px h-4 bg-slate-200" />
                  <button type="button" className="p-1 hover:bg-white rounded transition-colors text-slate-600 text-xs">List</button>
                </div>
                <textarea 
                  rows={4}
                  placeholder="Describe the payroll policy rules and conditions..."
                  className="w-full px-4 py-4 bg-white outline-none text-sm text-slate-600 leading-relaxed resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
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
                {isEditing ? 'Update Policy' : 'Create Policy'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section: Policy List & Details */}
      <div className="space-y-6">
        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search payroll policies..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Payroll Policy List</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Left Side: Policy List (Tabs) */}
          <div className="lg:col-span-3 border-r border-slate-100 bg-slate-50/30 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {filteredPolicies.map((policy) => (
                <div 
                  key={policy.id}
                  onClick={() => handleSelect(policy)}
                  className={cn(
                    "px-6 py-4 cursor-pointer transition-all border-b border-slate-100/50 relative group flex items-center justify-between",
                    selectedId === policy.id ? "text-indigo-600 font-bold bg-white" : "text-slate-600 hover:bg-white/50"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm">{policy.name}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{policy.category}</span>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === policy.id ? null : policy.id);
                      }}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        activeMenuId === policy.id ? "bg-slate-100 text-slate-600" : "opacity-0 group-hover:opacity-100 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      )}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === policy.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button 
                            onClick={() => handleEdit(policy)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Policy
                          </button>
                          <button 
                            onClick={() => { 
                              setDeleteModal({ isOpen: true, record: policy }); 
                              setActiveMenuId(null); 
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Policy
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Policy Details */}
          <div className="lg:col-span-9 p-10 relative bg-white">
            {selectedPolicy ? (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          selectedPolicy.category === 'Deduction' ? "bg-rose-100 text-rose-700" :
                          selectedPolicy.category === 'Overtime' ? "bg-indigo-100 text-indigo-700" :
                          selectedPolicy.category === 'Allowance' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                        )}>
                          {selectedPolicy.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                        {selectedPolicy.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          <span>Considerable: <span className="text-slate-900 font-bold">{selectedPolicy.considerableValue} {selectedPolicy.countType === 'Daily basis' ? 'Instances' : 'Hours'}</span></span>
                        </div>
                        <div className="w-px h-3 bg-slate-300" />
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span>Adjusted: <span className="text-slate-900 font-bold">{selectedPolicy.adjustedValue}{selectedPolicy.category === 'Overtime' ? 'x' : ''} {selectedPolicy.countType === 'Flat amount' ? 'Amount' : 'Value'}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-800 border-l-4 border-indigo-500 pl-4">Policy Description</h4>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base font-normal pl-5">
                      {selectedPolicy.description || 'No description provided for this policy.'}
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50">
                  <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                    <Info className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <p className="text-xs text-indigo-700 leading-relaxed">
                      <strong>Note:</strong> This payroll policy is active and will be used during the next payroll run. Ensure all values are accurate as they directly impact employee salary calculations.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                  <Banknote className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Policy</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Choose a policy from the list on the left to view its detailed configuration and description.</p>
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
        title="Delete Payroll Policy"
        message={`Are you sure you want to delete the policy "${deleteModal.record?.name}"? This action cannot be undone and may affect pending payroll runs.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
