import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  FileText, 
  CheckCircle2, 
  Plus, 
  X,
  Layout
} from 'lucide-react';
import { Role } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface RoleFormProps {
  role?: Role;
  onBack: () => void;
  onSave: (role: Partial<Role>) => void;
}

export default function RoleForm({ role, onBack, onSave }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    department: role?.department || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });
  const [newPermission, setNewPermission] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Operations'];

  const handleAddPermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPermission.trim() && !formData.permissions.includes(newPermission.trim())) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, newPermission.trim()]
      });
      setNewPermission('');
    }
  };

  const removePermission = (perm: string) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.filter(p => p !== perm)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      onSave(formData);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {role ? 'Edit Role' : 'Create New Role'}
          </h2>
          <p className="text-slate-500 mt-1">
            {role ? `Update details for the ${role.name} role.` : 'Define a new job role and its associated permissions.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Role Name</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
              <div className="relative">
                <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea 
                  required
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Describe the responsibilities and requirements for this role..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Permissions & Access</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Add a permission (e.g. Code Access, Payroll, etc.)"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPermission(e)}
                />
                <button 
                  type="button"
                  onClick={handleAddPermission}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.permissions.map((perm, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100">
                    {perm}
                    <button 
                      type="button"
                      onClick={() => removePermission(perm)}
                      className="hover:text-indigo-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.permissions.length === 0 && (
                  <p className="text-sm text-slate-400 italic">No permissions added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
          {isSaved && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              Role Saved Successfully!
            </motion.div>
          )}
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaved}
            className={cn(
              "px-8 py-2.5 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2",
              isSaved ? "bg-emerald-500 shadow-emerald-100" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
            )}
          >
            {isSaved ? 'Saved' : (role ? 'Update Role' : 'Create Role')}
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
