import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Layers,
  CheckCircle2,
  XCircle,
  Plus,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { LeaveGroupRecord } from '../types/leave';
import SearchFilterBar from './SearchFilterBar';

interface LeaveGroupViewProps {
  onBack: () => void;
  availableLeaveTypes: string[];
}

export default function LeaveGroupView({ onBack, availableLeaveTypes }: LeaveGroupViewProps) {
  const [records, setRecords] = useState<LeaveGroupRecord[]>([
    { id: '1', name: 'Standard Group', leaveTypes: ['Annual Leave', 'Sick Leave', 'Casual Leave'], totalLeave: 24, employeeCount: 45 },
    { id: '2', name: 'Management Group', leaveTypes: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Paid Leave'], totalLeave: 30, employeeCount: 12 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<LeaveGroupRecord>>({
    name: '',
    leaveTypes: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: LeaveGroupRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { 
        ...r, 
        name: formData.name as string,
        leaveTypes: formData.leaveTypes as string[],
        // Mocking these values for now
        totalLeave: (formData.leaveTypes?.length || 0) * 8,
        employeeCount: r.employeeCount
      } : r));
    } else {
      const newRecord: LeaveGroupRecord = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name as string,
        leaveTypes: formData.leaveTypes as string[],
        totalLeave: (formData.leaveTypes?.length || 0) * 8,
        employeeCount: 0
      };
      setRecords([newRecord, ...records]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', leaveTypes: [] });
    setIsEditing(false);
    setEditingId(null);
    setIsDropdownOpen(false);
  };

  const handleEdit = (record: LeaveGroupRecord) => {
    setFormData(record);
    setIsEditing(true);
    setEditingId(record.id);
  };

  const toggleLeaveType = (type: string) => {
    const current = formData.leaveTypes || [];
    if (current.includes(type)) {
      setFormData({ ...formData, leaveTypes: current.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, leaveTypes: [...current, type] });
    }
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      setRecords(prev => prev.filter(r => r.id !== deleteModal.record?.id));
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <span className="text-indigo-600 font-bold">Leave Group</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Group Management</h2>
      </div>

      {/* Add/Edit Form Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-300 relative">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Leave Group' : 'Add Leave Group'}</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Leave Group <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Group Name"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-700">Available Leave Type <span className="text-rose-500">*</span></label>
                <div 
                  className={cn(
                    "w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none transition-all cursor-pointer flex items-center justify-between min-h-[46px]",
                    isDropdownOpen ? "border-indigo-500 ring-2 ring-indigo-500 bg-white" : "border-slate-200 hover:border-slate-300"
                  )}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {formData.leaveTypes && formData.leaveTypes.length > 0 ? (
                      formData.leaveTypes.map(type => (
                        <span key={type} className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 animate-in zoom-in-95 duration-200 shadow-sm shadow-indigo-100">
                          {type}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-indigo-200 transition-colors" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLeaveType(type);
                            }}
                          />
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-sm">Select Leave Type</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-3 ml-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {formData.leaveTypes?.length || 0} Selected
                    </span>
                    <MoreVertical className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isDropdownOpen ? "rotate-180" : "rotate-90")} />
                  </div>
                </div>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-20 py-3 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
                      <div className="px-4 pb-2 mb-2 border-b border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Types</span>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (formData.leaveTypes?.length === availableLeaveTypes.length) {
                              setFormData({ ...formData, leaveTypes: [] });
                            } else {
                              setFormData({ ...formData, leaveTypes: [...availableLeaveTypes] });
                            }
                          }}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
                        >
                          {formData.leaveTypes?.length === availableLeaveTypes.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {availableLeaveTypes.map(type => (
                          <div 
                            key={type}
                            className={cn(
                              "px-4 py-2.5 text-sm cursor-pointer transition-all flex items-center justify-between mx-2 rounded-xl mb-1",
                              formData.leaveTypes?.includes(type) 
                                ? "bg-indigo-50 text-indigo-700 font-bold" 
                                : "text-slate-600 hover:bg-slate-50"
                            )}
                            onClick={() => toggleLeaveType(type)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                formData.leaveTypes?.includes(type) ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"
                              )}>
                                {formData.leaveTypes?.includes(type) && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                              {type}
                            </div>
                            {formData.leaveTypes?.includes(type) && (
                              <span className="text-[10px] font-bold text-indigo-400 uppercase">Active</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
          searchPlaceholder="Search leave groups..."
          className="border-none shadow-none px-4"
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Leave Group Records</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Group Name</th>
                <th className="px-6 py-4 font-bold">Leave Type Count</th>
                <th className="px-6 py-4 font-bold">Total Leave</th>
                <th className="px-6 py-4 font-bold">Employee Count</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{record.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {record.leaveTypes.map(type => (
                        <span key={type} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                          {type}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">
                        {record.leaveTypes.length} Types
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{record.totalLeave} Days</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Users className="w-4 h-4 text-slate-400" />
                      {record.employeeCount} Employees
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
        title="Delete Leave Group"
        message={`Are you sure you want to delete the leave group ${deleteModal.record?.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
