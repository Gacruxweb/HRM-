import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  User, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Edit,
  Eye,
  Users,
  ArrowLeftRight,
  RotateCcw,
  Check,
  Ban,
  ChevronDown,
  History
} from 'lucide-react';
import { cn } from '../lib/utils';
import SearchFilterBar from './SearchFilterBar';
import ActionMenu from './ActionMenu';
import ConfirmationModal from './ConfirmationModal';
import { MOCK_EMPLOYEES, MOCK_SHIFT_REQUESTS, MOCK_SHIFTS } from '../mockData';
import { ShiftRequest } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import ShiftRequestModal from './ShiftRequestModal';

interface ShiftFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shift: any) => void;
  initialData?: any;
}

function ShiftFormModal({ isOpen, onClose, onSave, initialData }: ShiftFormModalProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    startTime: '08:00',
    endTime: '17:00',
    type: 'Regular',
    status: 'Active',
    notes: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">{initialData ? 'Edit Shift' : 'Create New Shift'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Shift Name</label>
            <input 
              type="text"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Morning Shift"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Start Time</label>
              <input 
                type="time"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">End Time</label>
              <input 
                type="time"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Shift Type</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Regular">Regular</option>
                <option value="Weekend">Weekend</option>
                <option value="Special">Special</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Shift Notes</label>
            <textarea 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] resize-none"
              placeholder="Add any special instructions or notes for this shift..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              {initialData ? 'Update Shift' : 'Create Shift'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

interface AssignMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeIds: string[]) => void;
  currentEmployees: number;
  shiftName?: string;
}

function AssignMemberModal({ isOpen, onClose, onAssign, currentEmployees, shiftName }: AssignMemberModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [assignSearch, setAssignSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [shiftChangeConfirm, setShiftChangeConfirm] = useState<{ isOpen: boolean; employeeId: string | null }>({
    isOpen: false,
    employeeId: null
  });
  const [removeConfirm, setRemoveConfirm] = useState<{ isOpen: boolean; employeeId: string | null }>({
    isOpen: false,
    employeeId: null
  });
  const [undoAlert, setUndoAlert] = useState<{ isOpen: boolean; employeeId: string | null; timeLeft: number }>({
    isOpen: false,
    employeeId: null,
    timeLeft: 15
  });
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (undoAlert.isOpen && undoAlert.timeLeft > 0) {
      timer = setInterval(() => {
        setUndoAlert(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (undoAlert.timeLeft === 0) {
      setUndoAlert(prev => ({ ...prev, isOpen: false }));
    }
    return () => clearInterval(timer);
  }, [undoAlert.isOpen, undoAlert.timeLeft]);

  if (!isOpen) return null;

  const departments = ['All', ...Array.from(new Set(MOCK_EMPLOYEES.map(emp => emp.department)))];

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(assignSearch.toLowerCase()) ||
      emp.role.toLowerCase().includes(assignSearch.toLowerCase());
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const toggleEmployee = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
      return;
    }

    const employee = MOCK_EMPLOYEES.find(e => e.id === id);
    if (employee?.currentShift === shiftName && !removedIds.includes(id)) {
      setRemoveConfirm({ isOpen: true, employeeId: id });
    } else if (employee?.currentShift && !removedIds.includes(id)) {
      setShiftChangeConfirm({ isOpen: true, employeeId: id });
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const confirmShiftChange = () => {
    if (shiftChangeConfirm.employeeId) {
      setSelectedIds(prev => [...prev, shiftChangeConfirm.employeeId!]);
      setShiftChangeConfirm({ isOpen: false, employeeId: null });
    }
  };

  const confirmRemoval = () => {
    if (removeConfirm.employeeId) {
      const empId = removeConfirm.employeeId;
      setRemovedIds(prev => [...prev, empId]);
      setUndoAlert({ isOpen: true, employeeId: empId, timeLeft: 15 });
      setRemoveConfirm({ isOpen: false, employeeId: null });
    }
  };

  const handleUndo = () => {
    if (undoAlert.employeeId) {
      setRemovedIds(prev => prev.filter(id => id !== undoAlert.employeeId));
    }
    setUndoAlert({ isOpen: false, employeeId: null, timeLeft: 15 });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Assign Members</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentEmployees - removedIds.length} members currently assigned</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="p-4 border-b border-slate-50 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={assignSearch}
              onChange={e => setAssignSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredEmployees.map(emp => (
            <button 
              key={emp.id}
              onClick={() => toggleEmployee(emp.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all border",
                selectedIds.includes(emp.id) ? "bg-indigo-50 border-indigo-200" : "bg-white border-transparent hover:bg-slate-50"
              )}
            >
              <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                <p className="text-xs text-slate-500">{emp.department} • {emp.role}</p>
                {emp.currentShift && !removedIds.includes(emp.id) && (
                  <p className="text-[10px] text-indigo-600 font-bold mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {emp.currentShift === shiftName ? "In this shift" : emp.currentShift}
                  </p>
                )}
              </div>
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                selectedIds.includes(emp.id) ? "bg-indigo-600 border-indigo-600" : "border-slate-200"
              )}>
                {selectedIds.includes(emp.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => onAssign(selectedIds)}
            disabled={selectedIds.length === 0}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            Assign {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
          </button>
        </div>
        
        <ConfirmationModal 
          isOpen={shiftChangeConfirm.isOpen}
          onClose={() => setShiftChangeConfirm({ isOpen: false, employeeId: null })}
          onConfirm={confirmShiftChange}
          title="Change Shift"
          message={`This member is already assigned to ${MOCK_EMPLOYEES.find(e => e.id === shiftChangeConfirm.employeeId)?.currentShift}. Are you sure you want to change their shift?`}
          variant="warning"
          confirmText="Change Shift"
        />

        <ConfirmationModal 
          isOpen={removeConfirm.isOpen}
          onClose={() => setRemoveConfirm({ isOpen: false, employeeId: null })}
          onConfirm={confirmRemoval}
          title="Remove from Shift"
          message={`Are you sure you want to remove ${MOCK_EMPLOYEES.find(e => e.id === removeConfirm.employeeId)?.name} from ${shiftName}?`}
          variant="danger"
          confirmText="Remove Member"
        />

        <AnimatePresence>
          {undoAlert.isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-24 left-4 right-4 z-[120]"
            >
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Member removed successfully</p>
                    <p className="text-[10px] text-slate-400">Undo available for {undoAlert.timeLeft}s</p>
                  </div>
                </div>
                <button 
                  onClick={handleUndo}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors"
                >
                  Undo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface ShiftDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
  onShowAllMembers: () => void;
}

function ShiftDetailsModal({ isOpen, onClose, shift, onShowAllMembers }: ShiftDetailsModalProps) {
  if (!isOpen || !shift) return null;

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  // For demo purposes, we'll show some random employees as assigned
  const assignedEmployees = MOCK_EMPLOYEES.slice(0, 3);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{shift.name}</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{shift.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm border border-transparent hover:border-slate-100">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Schedule</p>
              <p className="text-sm font-bold text-slate-900">
                {shift.startTime && shift.endTime ? `${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}` : shift.time}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shift Type</p>
              <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase">
                {shift.type}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
              <span className={cn(
                "inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                shift.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              )}>
                {shift.status}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Members</p>
              <p className="text-sm font-bold text-slate-900">{shift.employees} Assigned</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Assigned Members
              </h4>
              <span className="text-xs text-slate-500 font-medium">Showing {assignedEmployees.length} of {shift.employees}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignedEmployees.map(emp => (
                <div key={emp.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{emp.role}</p>
                  </div>
                </div>
              ))}
              {shift.employees > assignedEmployees.length && (
                <button 
                  onClick={onShowAllMembers}
                  className="flex items-center justify-center p-3 bg-white border border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <p className="text-xs text-slate-400 font-medium group-hover:text-indigo-600">+{shift.employees - assignedEmployees.length} more members</p>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100/50">
            <h4 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Shift Notes
            </h4>
            <p className="text-xs text-indigo-700 leading-relaxed">
              {shift.notes || "No special notes or instructions provided for this shift."}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50/30">
          <button 
            onClick={onClose}
            className="w-full px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface FullMemberListModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
}

function FullMemberListModal({ isOpen, onClose, shift }: FullMemberListModalProps) {
  const [search, setSearch] = useState('');
  
  if (!isOpen || !shift) return null;

  // Mocking all assigned employees for the shift
  const allAssigned = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Shift Members</h3>
            <p className="text-xs text-slate-500 mt-0.5">{shift.name} • {shift.employees} total</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="p-4 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {allAssigned.map(emp => (
            <div key={emp.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
              <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                <p className="text-xs text-slate-500">{emp.department} • {emp.role}</p>
                {emp.currentShift && (
                  <p className="text-[10px] text-indigo-600 font-bold mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {emp.currentShift === shift.name ? "In this shift" : emp.currentShift}
                  </p>
                )}
              </div>
            </div>
          ))}
          {allAssigned.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">No members found matching your search.</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Close List
          </button>
        </div>
      </motion.div>
    </div>
  );
}



export default function Shift() {
  const [shifts, setShifts] = useState(MOCK_SHIFTS);
  const [requests, setRequests] = useState<ShiftRequest[]>(MOCK_SHIFT_REQUESTS);
  const [activeTab, setActiveTab] = useState<'shifts' | 'requests'>('shifts');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Modals State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<'Swap' | 'Change'>('Swap');

  const [editingShift, setEditingShift] = useState<any>(null);
  const [assigningShift, setAssigningShift] = useState<any>(null);
  const [viewingShift, setViewingShift] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; shiftId: string | null }>({
    isOpen: false,
    shiftId: null
  });

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || shift.status === statusFilter;
    const matchesType = typeFilter === 'All' || shift.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.requestFromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.requestToName && req.requestToName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesType = typeFilter === 'All' || req.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const handleSaveShift = (formData: any) => {
    if (editingShift) {
      setShifts(prev => prev.map(s => s.id === editingShift.id ? { ...s, ...formData } : s));
    } else {
      const newShift = {
        ...formData,
        id: `SH00${shifts.length + 1}`,
        employees: 0
      };
      setShifts(prev => [...prev, newShift]);
    }
    setIsFormOpen(false);
    setEditingShift(null);
  };

  const handleDeleteShift = () => {
    if (deleteConfirm.shiftId) {
      setShifts(prev => prev.filter(s => s.id !== deleteConfirm.shiftId));
      setDeleteConfirm({ isOpen: false, shiftId: null });
    }
  };

  const handleAssignMembers = (employeeIds: string[]) => {
    if (assigningShift) {
      setShifts(prev => prev.map(s => s.id === assigningShift.id ? { ...s, employees: s.employees + employeeIds.length } : s));
      setIsAssignOpen(false);
      setAssigningShift(null);
    }
  };

  const handleSaveRequest = (requestData: any) => {
    const newRequest: ShiftRequest = {
      ...requestData,
      id: `REQ00${requests.length + 1}`
    };
    setRequests(prev => [newRequest, ...prev]);
    setIsRequestModalOpen(false);
  };

  const handleRequestAction = (id: string, status: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Shift Management</h2>
          <p className="text-slate-500 mt-1">Configure and assign work shifts for your team.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button 
            onClick={() => {
              setRequestType('Swap');
              setIsRequestModalOpen(true);
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Swap Request
          </button>
          <button 
            onClick={() => {
              setRequestType('Change');
              setIsRequestModalOpen(true);
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Change Request
          </button>
          <button 
            onClick={() => {
              setEditingShift(null);
              setIsFormOpen(true);
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Shift
          </button>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('shifts')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === 'shifts' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Shifts
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === 'requests' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          Requests
          {requests.filter(r => r.status === 'Pending').length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full">
              {requests.filter(r => r.status === 'Pending').length}
            </span>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <SearchFilterBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder={activeTab === 'shifts' ? "Search shifts..." : "Search requests..."}
            onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border-none shadow-none px-4"
          />
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 z-[60] mt-3 w-72 p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-6"
              >
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      {activeTab === 'shifts' ? (
                        <>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </>
                      ) : (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {activeTab === 'shifts' ? 'Shift Type' : 'Request Type'}
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                      value={typeFilter}
                      onChange={e => setTypeFilter(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      {activeTab === 'shifts' ? (
                        <>
                          <option value="Regular">Regular</option>
                          <option value="Weekend">Weekend</option>
                          <option value="Special">Special</option>
                        </>
                      ) : (
                        <>
                          <option value="Swap">Swap</option>
                          <option value="Change">Change</option>
                        </>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setStatusFilter('All');
                    setTypeFilter('All');
                    setSearchTerm('');
                  }}
                  className="w-full pt-2 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors text-center"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeTab === 'shifts' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'ACTIVE SHIFTS', count: shifts.filter(s => s.status === 'Active').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'TOTAL EMPLOYEES', count: shifts.reduce((acc, s) => acc + s.employees, 0), icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'INACTIVE SHIFTS', count: shifts.filter(s => s.status === 'Inactive').length, icon: AlertCircle, color: 'text-slate-400', bg: 'bg-slate-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.count}</h3>
                </div>
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Shift Name</th>
                      <th className="px-6 py-4 font-semibold">Time Schedule</th>
                      <th className="px-6 py-4 font-semibold">Shift Type</th>
                      <th className="px-6 py-4 font-semibold text-center">Employees</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredShifts.map((shift) => (
                      <tr key={shift.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                              <Clock className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="font-bold text-slate-900">{shift.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                          {shift.startTime && shift.endTime ? `${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}` : shift.time}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                            {shift.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-600 text-sm font-bold">{shift.employees}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            shift.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                          )}>
                            {shift.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionMenu items={[
                            { label: 'View Details', icon: Eye, onClick: () => {
                              setViewingShift(shift);
                              setIsDetailsOpen(true);
                            } },
                            { label: 'Edit Shift', icon: Edit, onClick: () => {
                              setEditingShift(shift);
                              setIsFormOpen(true);
                            } },
                            { label: 'Assign Members', icon: Users, onClick: () => {
                              setAssigningShift(shift);
                              setIsAssignOpen(true);
                            } },
                            { label: 'Delete Shift', icon: Trash2, onClick: () => {
                              setDeleteConfirm({ isOpen: true, shiftId: shift.id });
                            }, variant: 'danger' },
                          ]} className="inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-10">
          {filteredRequests.filter(r => r.status === 'Pending').length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pending Requests</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequests.filter(r => r.status === 'Pending').map(req => {
                  const requester = MOCK_EMPLOYEES.find(e => e.id === req.requestFromId);
                  const targetMember = req.requestToId ? MOCK_EMPLOYEES.find(e => e.id === req.requestToId) : null;

                  return (
                    <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2.5 rounded-xl",
                            req.type === 'Swap' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                          )}>
                            {req.type === 'Swap' ? <ArrowLeftRight className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">Shift {req.type} Request</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                From {new Date(req.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                          {req.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Request From</p>
                          <div className="flex items-center gap-2">
                            <img 
                              src={requester?.avatar || `https://ui-avatars.com/api/?name=${req.requestFromName}&background=random`} 
                              alt="" 
                              className="w-8 h-8 rounded-full object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900 hover:text-indigo-600 hover:underline cursor-pointer transition-colors">
                                {req.requestFromName}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Clock className="w-2.5 h-2.5 text-indigo-500" />
                                <p className="text-[10px] text-slate-500 font-medium">{req.shiftName}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {req.type === 'Swap' ? 'Swap With' : 'New Shift'}
                          </p>
                          <div className="flex items-center gap-2">
                            {req.type === 'Swap' ? (
                              <>
                                <img 
                                  src={targetMember?.avatar || `https://ui-avatars.com/api/?name=${req.requestToName}&background=random`} 
                                  alt="" 
                                  className="w-8 h-8 rounded-full object-cover border border-slate-100"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <p className="text-sm font-bold text-slate-900 hover:text-indigo-600 hover:underline cursor-pointer transition-colors">
                                    {req.requestToName}
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <User className="w-2.5 h-2.5 text-indigo-500" />
                                    <p className="text-[10px] text-slate-500 font-medium">Target Member</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                  <Clock className="w-4 h-4 text-indigo-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{req.newShiftName}</p>
                                  <p className="text-[10px] text-slate-500 font-medium">Permanent Change</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {req.remarks && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="text-xs text-slate-600 leading-relaxed italic">"{req.remarks}"</p>
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleRequestAction(req.id, 'Approved')}
                            className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRequestAction(req.id, 'Rejected')}
                            className="flex-1 py-2.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Ban className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                        {req.isAdminCreated && (
                          <p className="text-[10px] text-slate-400 font-medium italic ml-1">Created by admin</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredRequests.filter(r => r.status !== 'Pending').length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <History className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Request History</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequests.filter(r => r.status !== 'Pending').map(req => {
                  const requester = MOCK_EMPLOYEES.find(e => e.id === req.requestFromId);
                  const targetMember = req.requestToId ? MOCK_EMPLOYEES.find(e => e.id === req.requestToId) : null;

                  return (
                    <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden opacity-80 grayscale-[0.2] hover:opacity-100 hover:grayscale-0 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2.5 rounded-xl bg-slate-50 text-slate-400"
                          )}>
                            {req.type === 'Swap' ? <ArrowLeftRight className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-600">Shift {req.type} Request</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                From {new Date(req.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          req.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}>
                          {req.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Request From</p>
                          <div className="flex items-center gap-2">
                            <img 
                              src={requester?.avatar || `https://ui-avatars.com/api/?name=${req.requestFromName}&background=random`} 
                              alt="" 
                              className="w-8 h-8 rounded-full object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900 hover:text-indigo-600 hover:underline cursor-pointer transition-colors">
                                {req.requestFromName}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">{req.shiftName}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {req.type === 'Swap' ? 'Swap With' : 'New Shift'}
                          </p>
                          <div className="flex items-center gap-2">
                            {req.type === 'Swap' ? (
                              <>
                                <img 
                                  src={targetMember?.avatar || `https://ui-avatars.com/api/?name=${req.requestToName}&background=random`} 
                                  alt="" 
                                  className="w-8 h-8 rounded-full object-cover border border-slate-100"
                                  referrerPolicy="no-referrer"
                                />
                                <p className="text-sm font-bold text-slate-900 hover:text-indigo-600 hover:underline cursor-pointer transition-colors">
                                  {req.requestToName}
                                </p>
                              </>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                  <Clock className="w-4 h-4 text-slate-300" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">{req.newShiftName}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredRequests.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No requests found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      )}
    </div>

    <ShiftFormModal 
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingShift(null);
        }}
        onSave={handleSaveShift}
        initialData={editingShift}
      />

      <AssignMemberModal 
        isOpen={isAssignOpen}
        onClose={() => {
          setIsAssignOpen(false);
          setAssigningShift(null);
        }}
        onAssign={handleAssignMembers}
        currentEmployees={assigningShift?.employees || 0}
        shiftName={assigningShift?.name}
      />

      <ShiftDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setViewingShift(null);
        }}
        shift={viewingShift}
        onShowAllMembers={() => {
          setIsDetailsOpen(false);
          setIsMemberListOpen(true);
        }}
      />

      <FullMemberListModal 
        isOpen={isMemberListOpen}
        onClose={() => {
          setIsMemberListOpen(false);
          setViewingShift(null);
        }}
        shift={viewingShift}
      />

      <ConfirmationModal 
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, shiftId: null })}
        onConfirm={handleDeleteShift}
        title="Delete Shift"
        message="Are you sure you want to delete this shift? This action cannot be undone and may affect employee schedules."
        variant="danger"
        confirmText="Delete Shift"
      />

      <ShiftRequestModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSave={handleSaveRequest}
        type={requestType}
        shifts={shifts}
        isAdmin={true}
      />
    </div>
  );
}
