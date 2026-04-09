import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X,
  Building2,
  User,
  DollarSign,
  FileText
} from 'lucide-react';
import { Department } from '../types';

interface DepartmentFormProps {
  onBack: () => void;
  onSave: (dept: Partial<Department>) => void;
  department?: Department;
}

export default function DepartmentForm({ onBack, onSave, department }: DepartmentFormProps) {
  const [formData, setFormData] = useState({
    name: department?.name || '',
    manager: department?.manager || '',
    budget: department?.budget?.toString() || '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...department,
      name: formData.name,
      manager: formData.manager,
      budget: Number(formData.budget),
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {department ? 'Edit Department' : 'Add New Department'}
          </h2>
          <p className="text-slate-500">
            {department ? `Update details for ${department.name}` : 'Create a new organizational unit for your company.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              Department Name
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Engineering, Marketing"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              Department Manager
            </label>
            <input 
              type="text" 
              required
              placeholder="Select a manager..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              Annual Budget ($)
            </label>
            <input 
              type="number" 
              required
              placeholder="e.g. 500000"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Description
            </label>
            <textarea 
              rows={4}
              placeholder="Describe the department's core responsibilities..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Save className="w-5 h-5" />
            {department ? 'Update Department' : 'Create Department'}
          </button>
        </div>
      </form>
    </div>
  );
}
