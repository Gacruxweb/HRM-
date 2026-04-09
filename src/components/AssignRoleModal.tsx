import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  User,
  Shield,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_EMPLOYEES } from '../mockData';
import { Role } from '../types';

interface AssignRoleModalProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeId: string) => void;
}

export default function AssignRoleModal({ role, isOpen, onClose, onAssign }: AssignRoleModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedEmpId) {
      setIsSaving(true);
      setTimeout(() => {
        onAssign(selectedEmpId);
        setIsSaving(false);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        >
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Assign Role</h3>
                <p className="text-xs text-slate-500 font-medium">Assigning <span className="text-indigo-600 font-bold">{role.name}</span> to an employee.</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredEmployees.map(emp => (
                <div 
                  key={emp.id}
                  onClick={() => setSelectedEmpId(emp.id)}
                  className={cn(
                    "p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                    selectedEmpId === emp.id 
                      ? "border-indigo-600 bg-indigo-50" 
                      : "border-slate-100 bg-slate-50 hover:border-indigo-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={emp.avatar} 
                      alt="" 
                      className="w-10 h-10 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.role} • {emp.department}</p>
                    </div>
                  </div>
                  {selectedEmpId === emp.id ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-indigo-300" />
                  )}
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 font-medium">No employees found matching your search.</p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Assigning this role will update the employee's title and permissions immediately.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssign}
                disabled={!selectedEmpId || isSaving}
                className={cn(
                  "flex-1 px-6 py-3 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2",
                  !selectedEmpId || isSaving ? "bg-slate-300 shadow-none cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                )}
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Confirm Assignment
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
