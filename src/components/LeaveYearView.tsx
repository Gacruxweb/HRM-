import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  CheckCircle2,
  XCircle,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import SearchFilterBar from './SearchFilterBar';

interface LeaveYearRecord {
  id: string;
  year: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive' | 'Closed';
}

interface LeaveYearViewProps {
  onBack: () => void;
}

export default function LeaveYearView({ onBack }: LeaveYearViewProps) {
  const [records, setRecords] = useState<LeaveYearRecord[]>([
    { id: '1', year: '2026', startDate: '2026-01-01', endDate: '2026-12-31', status: 'Active' },
    { id: '2', year: '2025', startDate: '2025-01-01', endDate: '2025-12-31', status: 'Inactive' },
  ]);

  const [formData, setFormData] = useState<Partial<LeaveYearRecord>>({
    year: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: LeaveYearRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const [closeModal, setCloseModal] = useState<{
    isOpen: boolean;
    record: LeaveYearRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(r => 
    r.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...r, ...formData as LeaveYearRecord } : r));
    } else {
      const newRecord: LeaveYearRecord = {
        ...formData as LeaveYearRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setRecords([newRecord, ...records]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ year: '', startDate: '', endDate: '', status: 'Active' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (record: LeaveYearRecord) => {
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

  const confirmClose = () => {
    if (closeModal.record) {
      setRecords(prev => prev.map(r => 
        r.id === closeModal.record?.id ? { ...r, status: 'Closed' } : r
      ));
      setCloseModal({ isOpen: false, record: null });
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
        <span className="text-indigo-600 font-bold">Leave Year</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Year Management</h2>
      </div>

      {/* Add/Edit Form Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-300 relative">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Leave Year' : 'Add New Leave Year'}</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Year <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Year Start Date <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Year End Date <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Status <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Closed">Closed</option>
                </select>
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
          searchPlaceholder="Search leave years..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Leave Year Records</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Year</th>
                <th className="px-6 py-4 font-bold">Start Date</th>
                <th className="px-6 py-4 font-bold">End Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{record.year}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.startDate}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.endDate}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 w-fit",
                      record.status === 'Active' ? "bg-emerald-100 text-emerald-700" : 
                      record.status === 'Closed' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {record.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : 
                       record.status === 'Closed' ? <Lock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {record.status}
                    </span>
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
                            {record.status === 'Active' && (
                              <button 
                                onClick={() => { 
                                  setCloseModal({ isOpen: true, record }); 
                                  setActiveMenuId(null); 
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                              >
                                <Lock className="w-4 h-4" />
                                Close Leave Year
                              </button>
                            )}
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
        title="Delete Leave Year"
        message={`Are you sure you want to delete the leave year ${deleteModal.record?.year}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />

      <ConfirmationModal 
        isOpen={closeModal.isOpen}
        onClose={() => setCloseModal({ isOpen: false, record: null })}
        onConfirm={confirmClose}
        title="Close Leave Year"
        message={`Are you sure you want to close the leave year ${closeModal.record?.year}? This will set the status to Closed.`}
        variant="warning"
        confirmText="Close Year"
      />
    </div>
  );
}
