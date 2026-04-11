import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_EMPLOYEES } from '../mockData';

interface ShiftRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (request: any) => void;
  type: 'Swap' | 'Change';
  shifts: any[];
  initialRequesterId?: string;
  isAdmin?: boolean;
}

export default function ShiftRequestModal({ isOpen, onClose, onSave, type, shifts, initialRequesterId, isAdmin }: ShiftRequestModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    requestFromId: initialRequesterId || '',
    shiftId: '',
    requestToId: '',
    newShiftId: '',
    remarks: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fromEmp = MOCK_EMPLOYEES.find(e => e.id === formData.requestFromId);
    const toEmp = MOCK_EMPLOYEES.find(e => e.id === formData.requestToId);
    const currentShift = shifts.find(s => s.id === formData.shiftId);
    const newShift = shifts.find(s => s.id === formData.newShiftId);

    onSave({
      ...formData,
      type,
      requestFromName: fromEmp?.name || '',
      shiftName: currentShift?.name || '',
      requestToName: toEmp?.name || '',
      newShiftName: newShift?.name || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      isAdminCreated: isAdmin
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Add Shift {type} Request</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Select Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="date"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Request From *</label>
            <select 
              required
              disabled={!!initialRequesterId}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer disabled:opacity-60"
              value={formData.requestFromId}
              onChange={e => setFormData({ ...formData, requestFromId: e.target.value })}
            >
              <option value="">Select employee</option>
              {MOCK_EMPLOYEES.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Current Shift *</label>
            <select 
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
              value={formData.shiftId}
              onChange={e => setFormData({ ...formData, shiftId: e.target.value })}
            >
              <option value="">Select shift</option>
              {shifts.map(shift => (
                <option key={shift.id} value={shift.id}>{shift.name}</option>
              ))}
            </select>
          </div>

          {type === 'Swap' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Request To *</label>
              <select 
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={formData.requestToId}
                onChange={e => setFormData({ ...formData, requestToId: e.target.value })}
              >
                <option value="">Select employee</option>
                {MOCK_EMPLOYEES.filter(e => e.id !== formData.requestFromId).map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">New Shift *</label>
              <select 
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={formData.newShiftId}
                onChange={e => setFormData({ ...formData, newShiftId: e.target.value })}
              >
                <option value="">Select new shift</option>
                {shifts.filter(s => s.id !== formData.shiftId).map(shift => (
                  <option key={shift.id} value={shift.id}>{shift.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Remarks</label>
            <textarea 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none h-24"
              placeholder="Add any additional notes..."
              value={formData.remarks}
              onChange={e => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
