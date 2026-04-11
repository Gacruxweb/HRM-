import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  User, 
  TrendingUp,
  Mail,
  MoreVertical,
  Calendar,
  Briefcase,
  UserPlus,
  Eye,
  UserMinus,
  AlertCircle,
  RotateCcw,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Department, Employee } from '../types';
import { MOCK_EMPLOYEES } from '../mockData';
import AssignMemberModal from './AssignMemberModal';
import ActionMenu, { ActionItem } from './ActionMenu';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DepartmentDetailsProps {
  department: Department;
  onBack: () => void;
  onViewProfile: (employee: Employee) => void;
}

const performanceData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.5 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.7 },
  { month: 'May', score: 4.8 },
];

export default function DepartmentDetails({ department, onBack, onViewProfile }: DepartmentDetailsProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [removingEmp, setRemovingEmp] = useState<Employee | null>(null);
  const [undoInfo, setUndoInfo] = useState<{ emp: Employee; timeLeft: number } | null>(null);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const deptEmployees = employees.filter(emp => emp.department === department.name);

  useEffect(() => {
    if (undoInfo && undoInfo.timeLeft > 0) {
      undoTimerRef.current = setTimeout(() => {
        setUndoInfo(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
    } else if (undoInfo && undoInfo.timeLeft === 0) {
      setUndoInfo(null);
    }
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    };
  }, [undoInfo]);

  const handleRemoveClick = (emp: Employee) => {
    setRemovingEmp(emp);
  };

  const confirmRemoval = () => {
    if (removingEmp) {
      const empToUndo = { ...removingEmp };
      setEmployees(prev => prev.map(e => e.id === removingEmp.id ? { ...e, department: '' } : e));
      setUndoInfo({ emp: empToUndo, timeLeft: 15 });
      setRemovingEmp(null);
    }
  };

  const handleUndo = () => {
    if (undoInfo) {
      setEmployees(prev => prev.map(e => e.id === undoInfo.emp.id ? { ...e, department: department.name } : e));
      setUndoInfo(null);
    }
  };

  const getMemberActions = (emp: Employee): ActionItem[] => [
    { 
      label: 'View Profile', 
      icon: Eye, 
      onClick: () => onViewProfile(emp) 
    },
    { 
      label: 'Remove from Dept', 
      icon: UserMinus, 
      onClick: () => handleRemoveClick(emp),
      variant: 'danger'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{department.name}</h2>
          <p className="text-slate-500">Comprehensive overview of the department's metrics and team.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Department Manager</p>
              <h3 className="text-lg font-bold text-slate-900">{department.manager}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Annual Budget</p>
              <h3 className="text-lg font-bold text-slate-900">${department.budget.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 rounded-xl">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Employees</p>
              <h3 className="text-lg font-bold text-slate-900">{department.employeeCount} Members</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Employee List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Department Members</h3>
              <button 
                onClick={() => setIsAssignModalOpen(true)}
                className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                Add member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Employee</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deptEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-semibold text-slate-900">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{emp.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          emp.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionMenu items={getMemberActions(emp)} />
                      </td>
                    </tr>
                  ))}
                  {deptEmployees.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No employees found in this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Performance Trend</h3>
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} domain={[0, 5]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4">Average monthly performance score (out of 5.0)</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold">
                  <span>APR</span>
                  <span>15</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Quarterly Review</p>
                  <p className="text-xs text-indigo-100">10:00 AM - 11:30 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold">
                  <span>MAY</span>
                  <span>02</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Team Building</p>
                  <p className="text-xs text-indigo-100">All Day Event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAssignModalOpen && (
        <AssignMemberModal 
          department={department}
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={(empIds) => {
            setEmployees(prev => prev.map(emp => 
              empIds.includes(emp.id) ? { ...emp, department: department.name } : emp
            ));
          }}
        />
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {removingEmp && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRemovingEmp(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center border border-slate-200"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserMinus className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Remove Member?</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-slate-700">{removingEmp.name}</span> from the {department.name} department?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setRemovingEmp(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmRemoval}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Undo Toast */}
      <AnimatePresence>
        {undoInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[120] w-full max-w-md px-4"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-indigo-500 transition-all duration-1000 ease-linear"
                    style={{ height: `${(undoInfo.timeLeft / 15) * 100}%`, top: 'auto' }}
                  />
                  <span className="relative z-10 font-bold text-xs">{undoInfo.timeLeft}s</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{undoInfo.emp.name} removed</p>
                  <p className="text-xs text-slate-400">Member has been unassigned.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleUndo}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Undo
                </button>
                <button 
                  onClick={() => setUndoInfo(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
