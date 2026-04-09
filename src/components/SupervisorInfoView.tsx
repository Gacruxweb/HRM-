import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  User,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';

interface SupervisorRecord {
  id: string;
  name: string;
  employeeCode: string;
  isDirect: boolean;
  effectiveDate: string;
}

interface SupervisorInfoViewProps {
  employee: any;
  onBack: () => void;
}

export default function SupervisorInfoView({ employee, onBack }: SupervisorInfoViewProps) {
  const [records, setRecords] = useState<SupervisorRecord[]>([
    { id: '1', name: 'Emom', employeeCode: 'MM001', isDirect: true, effectiveDate: '01/01/2026' },
    { id: '2', name: 'Piyash', employeeCode: 'MM0015', isDirect: false, effectiveDate: '01/01/2026' },
  ]);

  const [formData, setFormData] = useState({
    selectedEmployee: '',
    effectiveDate: '',
    isDirect: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: SupervisorRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { 
        ...r, 
        name: formData.selectedEmployee, // In a real app, we'd fetch the name from the selected ID
        isDirect: formData.isDirect,
        effectiveDate: formData.effectiveDate 
      } : r));
    } else {
      const newRecord: SupervisorRecord = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.selectedEmployee,
        employeeCode: 'MM' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        isDirect: formData.isDirect,
        effectiveDate: formData.effectiveDate
      };
      setRecords([...records, newRecord]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ selectedEmployee: '', effectiveDate: '', isDirect: false });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (record: SupervisorRecord) => {
    setFormData({
      selectedEmployee: record.name,
      effectiveDate: record.effectiveDate,
      isDirect: record.isDirect
    });
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
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Employees</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Employee Profile</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>{employee.name}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Supervisor</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {employee.name} (EM000{employee.id})
        </h2>
      </div>

      {/* Add Supervisor Form Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Supervisor' : 'Add Supervisor'}</h3>
        </div>
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Employee <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.selectedEmployee}
                  onChange={(e) => setFormData({ ...formData, selectedEmployee: e.target.value })}
                >
                  <option value="">Select Employee</option>
                  <option value="Emom">Emom</option>
                  <option value="Piyash">Piyash</option>
                  <option value="Sarah">Sarah</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Effective Date <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="directSupervisor"
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                checked={formData.isDirect}
                onChange={(e) => setFormData({ ...formData, isDirect: e.target.checked })}
              />
              <label htmlFor="directSupervisor" className="text-sm font-medium text-slate-600">Direct Supervisor</label>
            </div>

            <div className="flex gap-3">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Info
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

      {/* Supervisor Records Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Supervisor Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Employee Code</th>
                <th className="px-6 py-4 font-bold">Direct Supervisor</th>
                <th className="px-6 py-4 font-bold">Effective Date</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.employeeCode}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.isDirect ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.effectiveDate}</td>
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
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button 
                              onClick={() => {
                                handleEdit(record);
                                setActiveMenuId(null);
                              }}
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

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, record: null })}
        onConfirm={confirmDelete}
        title="Delete Supervisor Record"
        message={`Are you sure you want to remove ${deleteModal.record?.name} as a supervisor? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
