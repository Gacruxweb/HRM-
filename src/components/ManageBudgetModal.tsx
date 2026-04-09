import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Department } from '../types';

interface ManageBudgetModalProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newBudget: number) => void;
}

export default function ManageBudgetModal({ department, isOpen, onClose, onSave }: ManageBudgetModalProps) {
  const [budget, setBudget] = useState(department.budget.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(Number(budget));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  if (!isOpen) return null;

  const currentBudget = department.budget;
  const newBudget = Number(budget) || 0;
  const difference = newBudget - currentBudget;
  const percentChange = ((difference / currentBudget) * 100).toFixed(1);

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
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        >
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manage Budget</h3>
                <p className="text-xs text-slate-500 font-medium">{department.name} Department</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Budget</p>
                  <p className="text-lg font-bold text-slate-900">${(currentBudget / 1000).toFixed(0)}k</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Proposed Change</p>
                  <div className="flex items-center gap-1">
                    {difference !== 0 && (
                      difference > 0 ? (
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-rose-500" />
                      )
                    )}
                    <p className={cn(
                      "text-lg font-bold",
                      difference > 0 ? "text-emerald-600" : difference < 0 ? "text-rose-600" : "text-slate-900"
                    )}>
                      {difference === 0 ? '$0' : `${difference > 0 ? '+' : ''}${(Math.abs(difference) / 1000).toFixed(0)}k`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">New Annual Budget ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="number" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                {difference !== 0 && (
                  <p className={cn(
                    "text-xs font-medium ml-1",
                    difference > 0 ? "text-emerald-600" : "text-rose-600"
                  )}>
                    This represents a {Math.abs(Number(percentChange))}% {difference > 0 ? 'increase' : 'decrease'} from the current budget.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Budget changes will be reflected in the next financial cycle and may require additional approval from the Finance department.
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
                type="submit"
                disabled={isSaving || showSuccess}
                className={cn(
                  "flex-1 px-6 py-3 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2",
                  showSuccess ? "bg-emerald-500 shadow-emerald-100" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                )}
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : showSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Updated
                  </>
                ) : (
                  'Update Budget'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
