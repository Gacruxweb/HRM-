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
  Upload,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';

interface EducationRecord {
  id: string;
  level: string;
  degree: string;
  institution: string;
  cgpa: string;
  scale: string;
  passingYear: string;
  attachment?: string;
}

interface EducationInfoViewProps {
  employee: any;
  onBack: () => void;
}

export default function EducationInfoView({ employee, onBack }: EducationInfoViewProps) {
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([
    { 
      id: '1', 
      level: 'Bachelor of Science', 
      degree: 'Computer Science & Engineering', 
      institution: 'University of Dhaka', 
      cgpa: '3.85', 
      scale: '4.0', 
      passingYear: '2018',
      attachment: 'certificate_bsc.pdf'
    },
    { 
      id: '2', 
      level: 'Higher Secondary Certificate', 
      degree: 'Science', 
      institution: 'Dhaka College', 
      cgpa: '5.00', 
      scale: '5.0', 
      passingYear: '2014',
      attachment: 'hsc_transcript.pdf'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewRecord, setViewRecord] = useState<EducationRecord | null>(null);
  
  const [formData, setFormData] = useState<Partial<EducationRecord>>({
    level: '',
    degree: '',
    institution: '',
    cgpa: '',
    scale: '4.0',
    passingYear: '',
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: EducationRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      level: '',
      degree: '',
      institution: '',
      cgpa: '',
      scale: '4.0',
      passingYear: '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
      setEducationRecords(prev => prev.map(r => r.id === editingId ? { ...r, ...formData as EducationRecord } : r));
    } else {
      const newRecord: EducationRecord = {
        ...formData as EducationRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setEducationRecords([...educationRecords, newRecord]);
    }
    closeModal();
  };

  const handleEdit = (record: EducationRecord) => {
    setFormData(record);
    setIsEditing(true);
    setEditingId(record.id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      setEducationRecords(prev => prev.filter(r => r.id !== deleteModal.record?.id));
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

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
        <span className="text-indigo-600 font-bold">Education</span>
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
          <h3 className="text-lg font-bold text-slate-900">Education Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Education Level</th>
                <th className="px-6 py-4 font-bold">Subject/Degree</th>
                <th className="px-6 py-4 font-bold">Institution</th>
                <th className="px-6 py-4 font-bold">CGPA</th>
                <th className="px-6 py-4 font-bold">Passing Year</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {educationRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{record.level}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.degree}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.institution}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.cgpa} / {record.scale}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.passingYear}</td>
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
              <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Education' : 'Add Education'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education <span className="text-rose-500">*</span></label>
                  <select 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="">Select Education</option>
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject/Degree <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Subject/Degree"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CGPA <span className="text-rose-500">*</span></label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      required
                      placeholder="Enter CGPA"
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={formData.cgpa}
                      onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    />
                    <select 
                      className="w-24 px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={formData.scale}
                      onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                    >
                      <option value="4.0">4.0</option>
                      <option value="5.0">5.0</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">University/Institution <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter University/Institution"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Passing Year <span className="text-rose-500">*</span></label>
                  <select 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.passingYear}
                    onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attachment</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm flex items-center">
                      {formData.attachment || 'No file chosen'}
                    </div>
                    <button type="button" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all">
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
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
              <h3 className="text-xl font-bold text-slate-900">Education Details</h3>
              <button onClick={() => setViewRecord(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Education Level</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.level}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject/Degree</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.degree}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Institution</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.institution}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CGPA</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.cgpa} / {viewRecord.scale}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Passing Year</p>
                  <p className="text-sm font-bold text-slate-900">{viewRecord.passingYear}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Attachment</p>
                  {viewRecord.attachment ? (
                    <div className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-bold">{viewRecord.attachment}</span>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-slate-400">No attachment</p>
                  )}
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
        title="Delete Education Record"
        message={`Are you sure you want to delete this education record? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
