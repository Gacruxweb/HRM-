import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  DollarSign, 
  MoreVertical, 
  Plus,
  ArrowUpRight,
  Edit,
  Trash2,
  Eye,
  PieChart
} from 'lucide-react';
import { MOCK_DEPARTMENTS } from '../mockData';
import { cn } from '../lib/utils';
import DepartmentForm from './DepartmentForm';
import DepartmentDetails from './DepartmentDetails';
import ManageBudgetModal from './ManageBudgetModal';
import { Department } from '../types';
import ActionMenu, { ActionItem } from './ActionMenu';
import SearchFilterBar from './SearchFilterBar';

export default function Departments() {
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'details'>('list');
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('grid');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const getDeptActions = (dept: Department): ActionItem[] => [
    { label: 'View Details', icon: Eye, onClick: () => handleViewDetails(dept) },
    { label: 'Edit Department', icon: Edit, onClick: () => {
      setSelectedDept(dept);
      setView('edit');
    }},
    { label: 'Manage Budget', icon: PieChart, onClick: () => {
      setSelectedDept(dept);
      setIsBudgetModalOpen(true);
    }},
    { label: 'Delete Department', icon: Trash2, onClick: () => {
      setDepartments(departments.filter(d => d.id !== dept.id));
    }, variant: 'danger' },
  ];

  const handleAddDepartment = (newDept: Partial<Department>) => {
    const dept: Department = {
      id: (departments.length + 1).toString(),
      name: newDept.name || '',
      manager: newDept.manager || '',
      employeeCount: 0,
      budget: newDept.budget || 0,
    };
    setDepartments([...departments, dept]);
    setView('list');
  };

  const handleEditDepartment = (updatedDept: Partial<Department>) => {
    setDepartments(departments.map(d => d.id === updatedDept.id ? { ...d, ...updatedDept } : d));
    setView('list');
    setSelectedDept(null);
  };

  const handleUpdateBudget = (newBudget: number) => {
    if (selectedDept) {
      setDepartments(departments.map(d => d.id === selectedDept.id ? { ...d, budget: newBudget } : d));
    }
  };

  const handleViewDetails = (dept: Department) => {
    setSelectedDept(dept);
    setView('details');
  };

  const filteredDepartments = departments.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === 'add') {
    return <DepartmentForm onBack={() => setView('list')} onSave={handleAddDepartment} />;
  }

  if (view === 'edit' && selectedDept) {
    return <DepartmentForm department={selectedDept} onBack={() => setView('list')} onSave={handleEditDepartment} />;
  }

  if (view === 'details' && selectedDept) {
    return <DepartmentDetails department={selectedDept} onBack={() => setView('list')} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Department Management</h2>
          <p className="text-slate-500 mt-1">Organize your company structure and budgets.</p>
        </div>
        <button 
          onClick={() => setView('add')}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Department
        </button>
      </div>

      <SearchFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search departments or managers..."
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        className="border-none shadow-none px-4"
      />

      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <div 
              key={dept.id} 
              onClick={() => handleViewDetails(dept)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all cursor-pointer"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <ActionMenu items={getDeptActions(dept)} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{dept.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Managed by <span className="font-semibold text-slate-700">{dept.manager}</span></p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                      <Users className="w-3 h-3" />
                      Employees
                    </div>
                    <p className="text-xl font-bold text-slate-900">{dept.employeeCount}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                      <DollarSign className="w-3 h-3" />
                      Budget
                    </div>
                    <p className="text-xl font-bold text-slate-900">${(dept.budget / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/dept-${dept.id}-${i}/40/40`} 
                      alt="" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  {dept.employeeCount > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      +{dept.employeeCount - 4}
                    </div>
                  )}
                </div>
                <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">
                  Details
                  <ArrowUpRight className="w-4 h-4" />
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
                <th className="px-6 py-4 font-semibold">Department Name</th>
                <th className="px-6 py-4 font-semibold">Manager</th>
                <th className="px-6 py-4 font-semibold">Employees</th>
                <th className="px-6 py-4 font-semibold">Budget</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleViewDetails(dept)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <Building2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="font-bold text-slate-900">{dept.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{dept.manager}</td>
                  <td className="px-6 py-4 text-slate-600">{dept.employeeCount} Members</td>
                  <td className="px-6 py-4 text-slate-600 font-bold">${(dept.budget / 1000).toFixed(0)}k</td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu items={getDeptActions(dept)} className="inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isBudgetModalOpen && selectedDept && (
        <ManageBudgetModal 
          department={selectedDept}
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          onSave={handleUpdateBudget}
        />
      )}
    </div>
  );
}

