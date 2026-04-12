import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  User,
  AlertCircle,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_EMPLOYEES } from '../mockData';
import { Department } from '../types';

interface AssignMemberModalProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeIds: string[]) => void;
}

export default function AssignMemberModal({ department, isOpen, onClose, onAssign }: AssignMemberModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpIds, setSelectedEmpIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deptFilter, setDeptFilter] = useState('All Department');
  const [confirmingEmpId, setConfirmingEmpId] = useState<string | null>(null);

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All Department' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleToggleEmployee = (empId: string) => {
    const isSelected = selectedEmpIds.includes(empId);
    const emp = MOCK_EMPLOYEES.find(e => e.id === empId);
    const isAssignedToOther = emp && emp.department && emp.department !== department.name;

    if (!isSelected && isAssignedToOther) {
      setConfirmingEmpId(empId);
      return;
    }

    setSelectedEmpIds(prev => 
      isSelected 
        ? prev.filter(id => id !== empId) 
        : [...prev, empId]
    );
  };

  const confirmReassignment = () => {
    if (confirmingEmpId) {
      setSelectedEmpIds(prev => [...prev, confirmingEmpId]);
      setConfirmingEmpId(null);
    }
  };

  const handleAssign = () => {
    if (selectedEmpIds.length > 0) {
      setIsSaving(true);
      setTimeout(() => {
        onAssign(selectedEmpIds);
        setIsSaving(false);
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Assign Members</h3>
              <p className="text-sm text-slate-500">{department.employeeCount} members currently assigned</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm appearance-none"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option>All Department</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Human Resources</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {filteredEmployees.map(emp => {
                const isAlreadyInDept = emp.department === department.name;
                const isAssignedToOther = emp.department && emp.department !== department.name;

                return (
                  <div 
                    key={emp.id}
                    onClick={() => handleToggleEmployee(emp.id)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                      selectedEmpIds.includes(emp.id) 
                        ? "border-indigo-600 bg-indigo-50" 
                        : "border-slate-50 bg-white hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={emp.avatar} 
                        alt="" 
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-base font-bold text-slate-900">{emp.name}</p>
                        <p className="text-xs text-slate-500">
                          <span className="font-medium text-slate-700">{emp.department}</span> • {emp.role}
                        </p>
                        {isAssignedToOther && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-600">
                            <AlertCircle className="w-3 h-3" />
                            Already in {emp.department}
                          </div>
                        )}
                        {isAlreadyInDept && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-indigo-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            In this department
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedEmpIds.includes(emp.id) ? (
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedEmpIds.some(id => {
              const emp = MOCK_EMPLOYEES.find(e => e.id === id);
              return emp && emp.department && emp.department !== department.name;
            }) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Some selected members are already assigned to other departments. Assigning them here will change their department.
                </p>
              </motion.div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssign}
                disabled={selectedEmpIds.length === 0 || isSaving}
                className={cn(
                  "flex-1 px-6 py-4 text-white rounded-2xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2",
                  selectedEmpIds.length === 0 || isSaving ? "bg-slate-300 shadow-none cursor-not-allowed" : "bg-[#A5A6F6] hover:bg-[#9394E5] shadow-indigo-100"
                )}
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Assign'
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {confirmingEmpId && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-[2px]"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-w-[320px] text-center"
                >
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Change Department?</h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {MOCK_EMPLOYEES.find(e => e.id === confirmingEmpId)?.name} is already in 
                    <span className="font-bold text-slate-700"> {MOCK_EMPLOYEES.find(e => e.id === confirmingEmpId)?.department}</span>. 
                    Do you want to move them to {department.name}?
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setConfirmingEmpId(null)}
                      className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmReassignment}
                      className="flex-1 py-3 px-4 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100"
                    >
                      Confirm
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
