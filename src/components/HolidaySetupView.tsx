import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Building2,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { HolidayRecord } from '../types/leave';
import { MOCK_DEPARTMENTS } from '../mockData';
import SearchFilterBar from './SearchFilterBar';

interface HolidaySetupViewProps {
  onBack: () => void;
}

export default function HolidaySetupView({ onBack }: HolidaySetupViewProps) {
  const [records, setRecords] = useState<HolidayRecord[]>([
    { id: '1', description: 'New Year Holiday', department: 'All Departments', fromDate: '2026-01-01', toDate: '2026-01-01' },
    { id: '2', description: 'Eid-ul-Fitr', department: 'All Departments', fromDate: '2026-03-31', toDate: '2026-04-02' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<HolidayRecord>>({
    description: '',
    department: 'All Departments',
    fromDate: '',
    toDate: '',
    oneDayLeave: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: HolidayRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...r, ...formData as HolidayRecord } : r));
    } else {
      const newRecord: HolidayRecord = {
        ...formData as HolidayRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setRecords([newRecord, ...records]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ 
      description: '', 
      department: 'All Departments', 
      fromDate: '', 
      toDate: '',
      oneDayLeave: false
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (record: HolidayRecord) => {
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

  const filteredRecords = records.filter(r => 
    r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Leave Setting</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Holiday Setup</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Holiday Setup</h2>
      </div>

      {/* Add/Edit Form Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-300 relative">
        <div className="p-6 bg-slate-50/50 rounded-none">
          <h3 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Holiday' : 'New Holiday Setup'}</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Description <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter holiday description"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Department</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="All Departments">All Departments</option>
                  {MOCK_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:bg-indigo-600 checked:border-indigo-600"
                      checked={formData.oneDayLeave}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData({ 
                          ...formData, 
                          oneDayLeave: isChecked,
                          toDate: isChecked ? formData.fromDate : formData.toDate
                        });
                      }}
                    />
                    <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span 
                    className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors"
                    style={{ fontStyle: 'normal', fontWeight: 'normal', fontFamily: 'Arial' }}
                  >
                    One Day Holiday
                  </span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {formData.oneDayLeave ? 'Select Date' : 'From'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.fromDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setFormData({ 
                        ...formData, 
                        fromDate: newDate,
                        toDate: formData.oneDayLeave ? newDate : formData.toDate
                      });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">To <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input 
                    type="date" 
                    required
                    disabled={formData.oneDayLeave}
                    className={cn(
                      "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                      formData.oneDayLeave ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-50 text-slate-900"
                    )}
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Holiday' : 'Save Holiday'}
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
          searchPlaceholder="Search holidays..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Holiday Records</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Description</th>
                <th className="px-6 py-4 font-bold">Department</th>
                <th className="px-6 py-4 font-bold">From Date</th>
                <th className="px-6 py-4 font-bold">To Date</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Info className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{record.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{record.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{record.fromDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{record.toDate}</span>
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
        title="Delete Holiday"
        message={`Are you sure you want to delete the holiday "${deleteModal.record?.description}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
