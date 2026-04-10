import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  MoreVertical,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { LeaveTypeRecord } from '../types/leave';
import SearchFilterBar from './SearchFilterBar';

interface LeaveTypeViewProps {
  onBack: () => void;
  records: LeaveTypeRecord[];
  setRecords: React.Dispatch<React.SetStateAction<LeaveTypeRecord[]>>;
}

export default function LeaveTypeView({ onBack, records, setRecords }: LeaveTypeViewProps) {
  const [formData, setFormData] = useState<Partial<LeaveTypeRecord>>({
    name: '',
    countType: 'Daily basis',
    paymentType: 'Paid',
    isMaternity: false,
    isParental: false,
    isEducation: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: LeaveTypeRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.countType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.paymentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...r, ...formData as LeaveTypeRecord } : r));
    } else {
      const newRecord: LeaveTypeRecord = {
        ...formData as LeaveTypeRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setRecords([newRecord, ...records]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      countType: 'Daily basis', 
      paymentType: 'Paid', 
      isMaternity: false, 
      isParental: false, 
      isEducation: false 
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (record: LeaveTypeRecord) => {
    setFormData(record);
    setIsEditing(true);
    setEditingId(record.id);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      setRecords(prev => prev.filter(r => r.id !== deleteModal.record?.id));
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Leave Setting</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Leave Type</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Type Management</h2>
      </div>

      {/* Add/Edit Form Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-300 relative">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Leave Type' : 'Add New Leave Type'}</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Leave Type Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Annual Leave"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Leave Count Type <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.countType}
                  onChange={(e) => setFormData({ ...formData, countType: e.target.value as any })}
                >
                  <option value="Daily basis">Daily basis</option>
                  <option value="Hourly basis">Hourly basis</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Payment Type <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.paymentType}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as any })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="maternity"
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  checked={formData.isMaternity}
                  onChange={(e) => setFormData({ ...formData, isMaternity: e.target.checked })}
                />
                <label htmlFor="maternity" className="text-sm font-medium text-slate-600">Maternity Leave</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="parental"
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  checked={formData.isParental}
                  onChange={(e) => setFormData({ ...formData, isParental: e.target.checked })}
                />
                <label htmlFor="parental" className="text-sm font-medium text-slate-600">Parental Leave</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="education"
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  checked={formData.isEducation}
                  onChange={(e) => setFormData({ ...formData, isEducation: e.target.checked })}
                />
                <label htmlFor="education" className="text-sm font-medium text-slate-600">Education Leave</label>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Info' : 'Save Info'}
              </button>
              {isEditing && (
                <button 
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Records Table Section */}
      <div className="space-y-6">
        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search leave types..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Leave Type Records</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Leave Type</th>
                <th className="px-6 py-4 font-bold">Count Type</th>
                <th className="px-6 py-4 font-bold">Payment</th>
                <th className="px-6 py-4 font-bold">Special Types</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {record.countType}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit",
                      record.paymentType === 'Paid' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                      <DollarSign className="w-3 h-3" />
                      {record.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {record.isMaternity && (
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">Maternity</span>
                      )}
                      {record.isParental && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">Parental</span>
                      )}
                      {record.isEducation && (
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-bold uppercase">Education</span>
                      )}
                      {!record.isMaternity && !record.isParental && !record.isEducation && (
                        <span className="text-slate-400 text-xs italic">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === record.id ? null : record.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === record.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button 
                              onClick={() => { handleEdit(record); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button 
                              onClick={() => { 
                                setDeleteModal({ isOpen: true, record }); 
                                setActiveMenuId(null); 
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, record: null })}
        onConfirm={confirmDelete}
        title="Delete Leave Type"
        message={`Are you sure you want to delete the leave type ${deleteModal.record?.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
