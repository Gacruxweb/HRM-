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
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal, { ModalVariant } from './ConfirmationModal';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  gender: string;
  nidSsn: string;
  dob: string;
  profession: string;
  contact: string;
  isEmergency: boolean;
}

interface FamilyInfoViewProps {
  employee: any;
  onBack: () => void;
}

export default function FamilyInfoView({ employee, onBack }: FamilyInfoViewProps) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Sarah', relationship: 'Spouse', gender: 'Female', nidSsn: '1234567890123', dob: '1992-05-15', profession: 'Teacher', contact: '+880 1712-345678', isEmergency: true },
    { id: '2', name: 'Ayesha', relationship: 'Daughter', gender: 'Female', nidSsn: '9876543210987', dob: '2015-08-20', profession: 'Student', contact: '-', isEmergency: false },
    { id: '3', name: 'Abdul', relationship: 'Father', gender: 'Male', nidSsn: '5555999977778', dob: '1960-03-10', profession: 'Retired', contact: '+880 1798-765432', isEmergency: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewMember, setViewMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: '',
    gender: '',
    nidSsn: '',
    dob: '',
    profession: '',
    contact: '',
    isEmergency: false
  });

  // Modal State for Deletion
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    member: FamilyMember | null;
  }>({
    isOpen: false,
    member: null
  });

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingId) {
      setFamilyMembers(prev => prev.map(m => m.id === editingId ? { ...m, ...formData as FamilyMember } : m));
    } else {
      const newMember: FamilyMember = {
        ...formData as FamilyMember,
        id: Math.random().toString(36).substr(2, 9)
      };
      setFamilyMembers([...familyMembers, newMember]);
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      relationship: '',
      gender: '',
      nidSsn: '',
      dob: '',
      profession: '',
      contact: '',
      isEmergency: false
    });
  };

  const handleEdit = (member: FamilyMember) => {
    setFormData(member);
    setIsEditing(true);
    setEditingId(member.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (member: FamilyMember) => {
    setDeleteModal({ isOpen: true, member });
  };

  const confirmDelete = () => {
    if (deleteModal.member) {
      setFamilyMembers(prev => prev.filter(m => m.id !== deleteModal.member?.id));
      setDeleteModal({ isOpen: false, member: null });
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
        <span className="text-indigo-600 font-bold">Employee Family members</span>
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
          <h3 className="text-lg font-bold text-slate-900">Family Members</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Relationship</th>
                <th className="px-6 py-4 font-bold">Gender</th>
                <th className="px-6 py-4 font-bold">NID/SSN</th>
                <th className="px-6 py-4 font-bold">Date of Birth</th>
                <th className="px-6 py-4 font-bold">Profession</th>
                <th className="px-6 py-4 font-bold">Contact</th>
                <th className="px-6 py-4 font-bold">Emergency Contact</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {familyMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.relationship}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.gender}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.nidSsn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.dob}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.profession}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.contact}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      member.isEmergency ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {member.isEmergency ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === member.id ? null : member.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === member.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button 
                              onClick={() => {
                                setViewMember(member);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button 
                              onClick={() => {
                                handleEdit(member);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (!member.isEmergency) {
                                  handleDeleteClick(member);
                                  setActiveMenuId(null);
                                }
                              }}
                              disabled={member.isEmergency}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors",
                                member.isEmergency 
                                  ? "text-slate-300 cursor-not-allowed" 
                                  : "text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                              )}
                              title={member.isEmergency ? "Cannot delete emergency contact" : "Delete member"}
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

      {/* Add Family Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Family Member' : 'Add Family Member'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMember} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter Name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Relationship <span className="text-rose-500">*</span></label>
                  <select 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  >
                    <option value="">Select Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gender <span className="text-rose-500">*</span></label>
                  <select 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">NID/SSN</label>
                  <input 
                    type="text" 
                    placeholder="Enter NID/SSN"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.nidSsn}
                    onChange={(e) => setFormData({ ...formData, nidSsn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date of Birth <span className="text-rose-500">*</span></label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profession</label>
                  <input 
                    type="text" 
                    placeholder="Enter Profession"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact No</label>
                <input 
                  type="text" 
                  placeholder="Enter Contact"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="emergency"
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  checked={formData.isEmergency}
                  onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                />
                <label htmlFor="emergency" className="text-sm font-medium text-slate-600">Emergency Contact</label>
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

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, member: null })}
        onConfirm={confirmDelete}
        title="Delete Family Member"
        message={`Are you sure you want to delete ${deleteModal.member?.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />

      {/* View Details Modal */}
      {viewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">Family Member Details</h3>
              <button onClick={() => setViewMember(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Relationship</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.relationship}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gender</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.gender}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NID/SSN</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.nidSsn || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.dob}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Profession</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.profession || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact No</p>
                  <p className="text-sm font-bold text-slate-900">{viewMember.contact || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Emergency Contact</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    viewMember.isEmergency ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {viewMember.isEmergency ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={() => setViewMember(null)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
