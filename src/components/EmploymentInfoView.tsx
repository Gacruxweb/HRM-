import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  MoreVertical,
  Eye,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';

interface WorkHistory {
  id: string;
  companyName: string;
  address: string;
  jobTitle: string;
  lastSalary: string;
  startDate: string;
  endDate: string;
  remarks: string;
}

interface EmploymentInfoViewProps {
  employee: any;
  onBack: () => void;
}

export default function EmploymentInfoView({ employee, onBack }: EmploymentInfoViewProps) {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([
    { 
      id: '1', 
      companyName: 'Tech Solutions Ltd', 
      address: 'Dhaka, Bangladesh', 
      jobTitle: 'Senior Software Engineer', 
      lastSalary: '75000', 
      startDate: '2019-01-01', 
      endDate: '2023-12-31',
      remarks: 'Left for better opportunity'
    },
    { 
      id: '2', 
      companyName: 'Innovation Hub', 
      address: 'Chittagong, Bangladesh', 
      jobTitle: 'Software Developer', 
      lastSalary: '50000', 
      startDate: '2016-06-01', 
      endDate: '2018-12-31',
      remarks: 'Career growth'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewRecord, setViewRecord] = useState<WorkHistory | null>(null);
  
  const [formData, setFormData] = useState<Partial<WorkHistory>>({
    companyName: '',
    address: '',
    jobTitle: '',
    lastSalary: '',
    startDate: '',
    endDate: '',
    remarks: ''
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: WorkHistory | null;
  }>({
    isOpen: false,
    record: null
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      companyName: '',
      address: '',
      jobTitle: '',
      lastSalary: '',
      startDate: '',
      endDate: '',
      remarks: ''
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setWorkHistory(prev => prev.map(r => r.id === editingId ? { ...r, ...formData as WorkHistory } : r));
    } else {
      const newRecord: WorkHistory = {
        ...formData as WorkHistory,
        id: Math.random().toString(36).substr(2, 9)
      };
      setWorkHistory([...workHistory, newRecord]);
    }
    closeModal();
  };

  const handleEdit = (record: WorkHistory) => {
    setFormData(record);
    setIsEditing(true);
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      setWorkHistory(prev => prev.filter(r => r.id !== deleteModal.record?.id));
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
        <span className="text-indigo-600 font-bold">Employment</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {employee.name} (EM000{employee.id})
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Work History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Company Name</th>
                <th className="px-6 py-4 font-bold">Job Title</th>
                <th className="px-6 py-4 font-bold">Duration</th>
                <th className="px-6 py-4 font-bold">Last Salary</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workHistory.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{record.companyName}</p>
                    <p className="text-xs text-slate-500">{record.address}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.jobTitle}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.startDate} to {record.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">${record.lastSalary}</td>
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
                              onClick={() => { setViewRecord(record); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button 
                              onClick={() => { handleEdit(record); setActiveMenuId(null); }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button 
                              onClick={() => { setDeleteModal({ isOpen: true, record }); setActiveMenuId(null); }}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Work History' : 'Add Work History'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Company Name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Address"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Title <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Job Title"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Salary</label>
                  <input 
                    type="text" 
                    placeholder="Enter Last Salary"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.lastSalary}
                    onChange={(e) => setFormData({ ...formData, lastSalary: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Start Date <span className="text-rose-500">*</span></label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">End Date <span className="text-rose-500">*</span></label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remarks</label>
                <textarea 
                  placeholder="Enter Remarks"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Info
                </button>
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Work History Details</h3>
              <button onClick={() => setViewRecord(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Company Name</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.companyName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.address}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Job Title</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.jobTitle}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Salary</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.lastSalary ? `$${viewRecord.lastSalary}` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start Date</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.startDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">End Date</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.endDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Remarks</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.remarks || 'No remarks'}</p>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={() => setViewRecord(null)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, record: null })}
        onConfirm={confirmDelete}
        title="Delete Work History"
        message={`Are you sure you want to delete this work history record? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
