import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Edit,
  Trash2,
  MoreVertical,
  Upload,
  FileText,
  Globe,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';
import ConfirmationModal from './ConfirmationModal';

interface DocumentRecord {
  id: string;
  title: string;
  category: string;
  remarks: string;
  attachment?: string;
}

interface PassportRecord {
  id: string;
  passportNo: string;
  passportType: string;
  issueDate: string;
  expireDate: string;
  country: string;
  attachment?: string;
  reminder: boolean;
}

interface CategoryRecord {
  id: string;
  name: string;
  description: string;
}

interface DocumentPassportViewProps {
  employee: any;
  onBack: () => void;
}

export default function DocumentPassportView({ employee, onBack }: DocumentPassportViewProps) {
  const [activeTab, setActiveTab] = useState<'document' | 'passport' | 'category'>('document');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Document State
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    { id: '1', title: 'Bachelor of Computer Science', category: 'Academic Certificate', remarks: 'Graduated with honors from University of Dhaka' },
    { id: '2', title: 'AWS Certified Solutions Architect', category: 'Professional Certificate', remarks: 'Valid until December 2025' },
    { id: '3', title: 'National ID Card', category: 'Identity Document', remarks: 'Permanent NID - Valid for lifetime' },
  ]);
  const [docFormData, setDocFormData] = useState<Partial<DocumentRecord>>({ title: '', category: '', remarks: '' });
  const [isDocEditing, setIsDocEditing] = useState(false);
  const [docEditingId, setDocEditingId] = useState<string | null>(null);

  // Passport State
  const [passports, setPassports] = useState<PassportRecord[]>([
    { id: '1', country: 'Bangladesh', passportNo: 'BN0245678', passportType: 'Ordinary', issueDate: '2020-03-15', expireDate: '2030-03-14', reminder: true },
    { id: '2', country: 'United States', passportNo: 'US789456123', passportType: 'Official', issueDate: '2022-06-20', expireDate: '2027-06-19', reminder: false },
  ]);
  const [passportFormData, setPassportFormData] = useState<Partial<PassportRecord>>({ 
    passportNo: '', passportType: '', issueDate: '', expireDate: '', country: '', reminder: false 
  });
  const [isPassportEditing, setIsPassportEditing] = useState(false);
  const [passportEditingId, setPassportEditingId] = useState<string | null>(null);

  // Category State
  const [categories, setCategories] = useState<CategoryRecord[]>([
    { id: '1', name: 'Academic Certificate', description: 'Educational qualification documents' },
    { id: '2', name: 'Professional Certificate', description: 'Work-related certifications' },
    { id: '3', name: 'Identity Document', description: 'Government issued IDs' },
  ]);
  const [categoryFormData, setCategoryFormData] = useState<Partial<CategoryRecord>>({ name: '', description: '' });
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [categoryEditingId, setCategoryEditingId] = useState<string | null>(null);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'document' | 'passport' | 'category' | null;
    id: string | null;
    name: string | null;
  }>({
    isOpen: false,
    type: null,
    id: null,
    name: null
  });

  // Document Handlers
  const handleDocSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDocEditing && docEditingId) {
      setDocuments(prev => prev.map(d => d.id === docEditingId ? { ...d, ...docFormData as DocumentRecord } : d));
    } else {
      const newDoc: DocumentRecord = {
        ...docFormData as DocumentRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setDocuments([...documents, newDoc]);
    }
    resetDocForm();
  };

  const resetDocForm = () => {
    setDocFormData({ title: '', category: '', remarks: '' });
    setIsDocEditing(false);
    setDocEditingId(null);
  };

  const handleDocEdit = (doc: DocumentRecord) => {
    setDocFormData(doc);
    setIsDocEditing(true);
    setDocEditingId(doc.id);
  };

  // Passport Handlers
  const handlePassportSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPassportEditing && passportEditingId) {
      setPassports(prev => prev.map(p => p.id === passportEditingId ? { ...p, ...passportFormData as PassportRecord } : p));
    } else {
      const newPassport: PassportRecord = {
        ...passportFormData as PassportRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setPassports([...passports, newPassport]);
    }
    resetPassportForm();
  };

  const resetPassportForm = () => {
    setPassportFormData({ passportNo: '', passportType: '', issueDate: '', expireDate: '', country: '', reminder: false });
    setIsPassportEditing(false);
    setPassportEditingId(null);
  };

  const handlePassportEdit = (p: PassportRecord) => {
    setPassportFormData(p);
    setIsPassportEditing(true);
    setPassportEditingId(p.id);
  };

  // Category Handlers
  const handleCategorySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCategoryEditing && categoryEditingId) {
      setCategories(prev => prev.map(c => c.id === categoryEditingId ? { ...c, ...categoryFormData as CategoryRecord } : c));
    } else {
      const newCategory: CategoryRecord = {
        ...categoryFormData as CategoryRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setCategories([...categories, newCategory]);
    }
    resetCategoryForm();
  };

  const resetCategoryForm = () => {
    setCategoryFormData({ name: '', description: '' });
    setIsCategoryEditing(false);
    setCategoryEditingId(null);
  };

  const handleCategoryEdit = (c: CategoryRecord) => {
    setCategoryFormData(c);
    setIsCategoryEditing(true);
    setCategoryEditingId(c.id);
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'document' && deleteModal.id) {
      setDocuments(prev => prev.filter(d => d.id !== deleteModal.id));
    } else if (deleteModal.type === 'passport' && deleteModal.id) {
      setPassports(prev => prev.filter(p => p.id !== deleteModal.id));
    } else if (deleteModal.type === 'category' && deleteModal.id) {
      setCategories(prev => prev.filter(c => c.id !== deleteModal.id));
    }
    setDeleteModal({ isOpen: false, type: null, id: null, name: null });
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
        <span className="text-indigo-600 font-bold">Document & Passport</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {employee.name} (EM000{employee.id})
        </h2>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('document')}
          className={cn(
            "px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === 'document' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Document
        </button>
        <button 
          onClick={() => setActiveTab('passport')}
          className={cn(
            "px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === 'passport' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Passport
        </button>
        <button 
          onClick={() => setActiveTab('category')}
          className={cn(
            "px-8 py-2.5 rounded-xl text-sm font-bold transition-all",
            activeTab === 'category' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Category
        </button>
      </div>

      {activeTab === 'document' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Add Document Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">{isDocEditing ? 'Edit Document' : 'Add Document'}</h3>
            </div>
            <div className="p-8">
              <form onSubmit={handleDocSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Title <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter Title"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={docFormData.title}
                      onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Category <span className="text-rose-500">*</span></label>
                    <select 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={docFormData.category}
                      onChange={(e) => setDocFormData({ ...docFormData, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Document Attachment</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm flex items-center">
                        Choose File
                      </div>
                      <button type="button" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all">
                        <Upload className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Remarks</label>
                    <textarea 
                      placeholder="Enter Remarks"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      value={docFormData.remarks}
                      onChange={(e) => setDocFormData({ ...docFormData, remarks: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Info
                  </button>
                  {isDocEditing && (
                    <button 
                      type="button"
                      onClick={resetDocForm}
                      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Document Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Document Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Title</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Remarks</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{doc.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{doc.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{doc.remarks}</td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setActiveMenuId(activeMenuId === doc.id ? null : doc.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === doc.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                              <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button 
                                  onClick={() => { handleDocEdit(doc); setActiveMenuId(null); }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button 
                                  onClick={() => { 
                                    setDeleteModal({ isOpen: true, type: 'document', id: doc.id, name: doc.title }); 
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
      )}

      {activeTab === 'passport' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Add Passport Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">{isPassportEditing ? 'Edit Passport' : 'Add Passport'}</h3>
            </div>
            <div className="p-8">
              <form onSubmit={handlePassportSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Passport No <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter Here"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passportFormData.passportNo}
                      onChange={(e) => setPassportFormData({ ...passportFormData, passportNo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Passport Type <span className="text-rose-500">*</span></label>
                    <select 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passportFormData.passportType}
                      onChange={(e) => setPassportFormData({ ...passportFormData, passportType: e.target.value })}
                    >
                      <option value="">Enter Here</option>
                      <option value="Ordinary">Ordinary</option>
                      <option value="Official">Official</option>
                      <option value="Diplomatic">Diplomatic</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Issue Date <span className="text-rose-500">*</span></label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passportFormData.issueDate}
                      onChange={(e) => setPassportFormData({ ...passportFormData, issueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Expire Date <span className="text-rose-500">*</span></label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passportFormData.expireDate}
                      onChange={(e) => setPassportFormData({ ...passportFormData, expireDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Country <span className="text-rose-500">*</span></label>
                    <select 
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passportFormData.country}
                      onChange={(e) => setPassportFormData({ ...passportFormData, country: e.target.value })}
                    >
                      <option value="">Select Country</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Passport Attachment</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm flex items-center">
                        Choose File
                      </div>
                      <button type="button" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-all">
                        <Upload className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="reminder"
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    checked={passportFormData.reminder}
                    onChange={(e) => setPassportFormData({ ...passportFormData, reminder: e.target.checked })}
                  />
                  <label htmlFor="reminder" className="text-sm font-medium text-slate-600">Enable Reminder Notification</label>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Info
                  </button>
                  {isPassportEditing && (
                    <button 
                      type="button"
                      onClick={resetPassportForm}
                      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Passport Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Passport Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Country</th>
                    <th className="px-6 py-4 font-bold">Passport No</th>
                    <th className="px-6 py-4 font-bold">Passport Type</th>
                    <th className="px-6 py-4 font-bold">Issue Date</th>
                    <th className="px-6 py-4 font-bold">Expire Date</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {passports.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{p.country}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.passportNo}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.passportType}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.issueDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.expireDate}</td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setActiveMenuId(activeMenuId === p.id ? null : p.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === p.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                              <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button 
                                  onClick={() => { handlePassportEdit(p); setActiveMenuId(null); }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button 
                                  onClick={() => { 
                                    setDeleteModal({ isOpen: true, type: 'passport', id: p.id, name: p.passportNo }); 
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
      )}

      {activeTab === 'category' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Add Category Form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">{isCategoryEditing ? 'Edit Category' : 'Add Category'}</h3>
            </div>
            <div className="p-8">
              <form onSubmit={handleCategorySave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Category Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter Category Name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea 
                      placeholder="Enter Description"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Info
                  </button>
                  {isCategoryEditing && (
                    <button 
                      type="button"
                      onClick={resetCategoryForm}
                      className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Category Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Category Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Category Name</th>
                    <th className="px-6 py-4 font-bold">Description</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{cat.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">{cat.description}</td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setActiveMenuId(activeMenuId === cat.id ? null : cat.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === cat.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                              <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button 
                                  onClick={() => { handleCategoryEdit(cat); setActiveMenuId(null); }}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button 
                                  onClick={() => { 
                                    setDeleteModal({ isOpen: true, type: 'category', id: cat.id, name: cat.name }); 
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
      )}

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: null })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.type === 'document' ? 'Document' : deleteModal.type === 'passport' ? 'Passport' : 'Category'}`}
        message={`Are you sure you want to delete ${deleteModal.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
}
