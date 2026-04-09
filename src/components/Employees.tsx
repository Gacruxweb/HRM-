import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
  Edit,
  UserX,
  Trash2,
  Eye
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../mockData';
import { cn } from '../lib/utils';
import ActionMenu, { ActionItem } from './ActionMenu';
import EmployeeProfile from './EmployeeProfile';
import AddEmployee from './AddEmployee';
import ConfirmationModal, { ModalVariant } from './ConfirmationModal';

interface EmployeesProps {
  onAddEmployee: () => void;
}

export default function Employees({ onAddEmployee }: EmployeesProps) {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'table' | 'profile' | 'edit'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: ModalVariant;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'info',
    onConfirm: () => {},
  });

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];
  const statuses = ['All', 'Active', 'On Leave', 'Terminated'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const handleAction = (action: string, emp: any) => {
    setSelectedEmployee(emp);
    switch (action) {
      case 'view':
        setView('profile');
        break;
      case 'edit':
        setView('edit');
        break;
      case 'status':
        setModalConfig({
          isOpen: true,
          title: 'Change Employee Status',
          message: `Are you sure you want to toggle the status for ${emp.name}? This will change it from ${emp.status} to ${emp.status === 'Active' ? 'On Leave' : 'Active'}.`,
          variant: 'warning',
          onConfirm: () => {
            setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: e.status === 'Active' ? 'On Leave' : 'Active' } : e));
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
        break;
      case 'terminate':
        setModalConfig({
          isOpen: true,
          title: 'Terminate Employment',
          message: `CRITICAL: You are about to terminate the employment of ${emp.name}. This action will revoke their access and mark them as Terminated. This cannot be easily undone.`,
          variant: 'danger',
          onConfirm: () => {
            setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: 'Terminated' } : e));
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
        break;
      case 'delete':
        setModalConfig({
          isOpen: true,
          title: 'Delete Employee Record',
          message: `Are you sure you want to PERMANENTLY delete the record for ${emp.name}? All historical data associated with this employee will be lost forever.`,
          variant: 'danger',
          onConfirm: () => {
            setEmployees(prev => prev.filter(e => e.id !== emp.id));
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        });
        break;
    }
  };

  const getEmployeeActions = (emp: any): ActionItem[] => [
    { label: 'View Profile', icon: Eye, onClick: () => handleAction('view', emp) },
    { label: 'Edit Details', icon: Edit, onClick: () => handleAction('edit', emp) },
    { label: 'Change Status', icon: User, onClick: () => handleAction('status', emp) },
    { label: 'Terminate', icon: UserX, onClick: () => handleAction('terminate', emp), variant: 'danger' },
    { label: 'Delete Record', icon: Trash2, onClick: () => handleAction('delete', emp), variant: 'danger' },
  ];

  if (view === 'profile' && selectedEmployee) {
    return <EmployeeProfile employee={selectedEmployee} onBack={() => setView('grid')} />;
  }

  if (view === 'edit' && selectedEmployee) {
    return (
      <AddEmployee 
        employee={selectedEmployee} 
        onBack={() => setView('grid')} 
        onSave={(updatedData) => {
          setEmployees(prev => prev.map(e => e.id === selectedEmployee.id ? { ...e, ...updatedData, name: `${updatedData.firstName} ${updatedData.lastName}` } : e));
          setView('grid');
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Employee Directory</h2>
          <p className="text-slate-500 mt-1">Manage and view all team members in one place.</p>
        </div>
        <button 
          onClick={onAddEmployee}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Employee
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, role, or department..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2",
              (statusFilter !== 'All' || deptFilter !== 'All') && "border-indigo-500 text-indigo-600 bg-indigo-50"
            )}
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                  <select 
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                  >
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                  <select 
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <button 
                  onClick={() => {
                    setStatusFilter('All');
                    setDeptFilter('All');
                    setIsFilterOpen(false);
                  }}
                  className="w-full py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl p-1 flex">
            <button 
              onClick={() => setView('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === 'grid' ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button 
              onClick={() => setView('table')}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === 'table' ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <img 
                    src={emp.avatar} 
                    alt={emp.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <ActionMenu items={getEmployeeActions(emp)} />
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{emp.name}</h3>
                  <p className="text-sm font-medium text-slate-500">{emp.role}</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Joined {emp.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-bold",
                  emp.status === 'Active' ? "bg-emerald-100 text-emerald-700" : 
                  emp.status === 'Terminated' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                )}>
                  {emp.status}
                </span>
                <button 
                  onClick={() => handleAction('view', emp)}
                  className="text-indigo-600 text-sm font-bold hover:text-indigo-700"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-semibold text-slate-900">{emp.name}</p>
                        <p className="text-sm text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{emp.department}</td>
                  <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold",
                      emp.status === 'Active' ? "bg-emerald-50 text-emerald-700" : 
                      emp.status === 'Terminated' ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                    )}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu items={getEmployeeActions(emp)} className="inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <ConfirmationModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        confirmText={modalConfig.variant === 'danger' ? 'Proceed' : 'Confirm'}
      />
    </div>
  );
}
