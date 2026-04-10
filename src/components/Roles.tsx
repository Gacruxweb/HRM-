import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserPlus,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { MOCK_ROLES, MOCK_EMPLOYEES } from '../mockData';
import { cn } from '../lib/utils';
import ActionMenu, { ActionItem } from './ActionMenu';
import { Role } from '../types';
import RoleForm from './RoleForm';
import AssignRoleModal from './AssignRoleModal';
import ConfirmationModal, { ModalVariant } from './ConfirmationModal';
import SearchFilterBar from './SearchFilterBar';

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('grid');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const departments = ['All', ...Array.from(new Set(roles.map(r => r.department)))];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || role.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleAddRole = (newRole: Partial<Role>) => {
    const role: Role = {
      id: (roles.length + 1).toString(),
      name: newRole.name || '',
      department: newRole.department || '',
      description: newRole.description || '',
      permissions: newRole.permissions || [],
      employeeCount: 0,
    };
    setRoles([...roles, role]);
    setView('list');
  };

  const handleEditRole = (updatedRole: Partial<Role>) => {
    setRoles(roles.map(r => r.id === selectedRole?.id ? { ...r, ...updatedRole } : r));
    setView('list');
    setSelectedRole(null);
  };

  const handleDeleteRole = (role: Role) => {
    setModalConfig({
      isOpen: true,
      title: 'Delete Role',
      message: `Are you sure you want to delete the "${role.name}" role? This action cannot be undone and may affect employees assigned to this role.`,
      variant: 'danger',
      onConfirm: () => {
        setRoles(roles.filter(r => r.id !== role.id));
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const getRoleActions = (role: Role): ActionItem[] => [
    { 
      label: 'Edit Role', 
      icon: Edit, 
      onClick: () => {
        setSelectedRole(role);
        setView('edit');
      } 
    },
    { 
      label: 'Assign to Employee', 
      icon: UserPlus, 
      onClick: () => {
        setSelectedRole(role);
        setIsAssignModalOpen(true);
      } 
    },
    { 
      label: 'Delete Role', 
      icon: Trash2, 
      onClick: () => handleDeleteRole(role),
      variant: 'danger' 
    },
  ];

  if (view === 'add') {
    return <RoleForm onBack={() => setView('list')} onSave={handleAddRole} />;
  }

  if (view === 'edit' && selectedRole) {
    return <RoleForm role={selectedRole} onBack={() => setView('list')} onSave={handleEditRole} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Employee Roles</h2>
          <p className="text-slate-500 mt-1">Define and manage job roles and permissions.</p>
        </div>
        <button 
          onClick={() => setView('add')}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Role
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Roles', count: roles.length, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Assigned Roles', count: roles.reduce((acc, r) => acc + r.employeeCount, 0), icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Unassigned Roles', count: roles.filter(r => r.employeeCount === 0).length, icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.count}</h3>
              </div>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <SearchFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search roles or descriptions..."
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        isFilterActive={deptFilter !== 'All'}
        className="border-none shadow-none px-4"
        rightElement={
          isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                  <select 
                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => {
                    setDeptFilter('All');
                    setIsFilterOpen(false);
                  }}
                  className="w-full py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )
        }
      />

      {/* Roles Display */}
      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                    <Shield className="w-6 h-6 text-indigo-600" />
                  </div>
                  <ActionMenu items={getRoleActions(role)} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{role.name}</h3>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">{role.department}</p>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{role.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Employees</span>
                    <span className="font-bold text-slate-900">{role.employeeCount}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.slice(0, 3).map((perm, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        +{role.permissions.length - 3} More
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setSelectedRole(role);
                    setIsAssignModalOpen(true);
                  }}
                  className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign Role
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
                <th className="px-6 py-4 font-semibold">Role Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Employees</th>
                <th className="px-6 py-4 font-semibold">Permissions</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Shield className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{role.name}</p>
                        <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{role.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{role.department}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{role.employeeCount} Members</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 2).map((perm, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {perm}
                        </span>
                      ))}
                      {role.permissions.length > 2 && (
                        <span className="text-[10px] font-bold text-slate-400">+{role.permissions.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu items={getRoleActions(role)} className="inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAssignModalOpen && selectedRole && (
        <AssignRoleModal 
          role={selectedRole} 
          isOpen={isAssignModalOpen} 
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={(empId) => {
            setRoles(roles.map(r => r.id === selectedRole.id ? { ...r, employeeCount: r.employeeCount + 1 } : r));
            setIsAssignModalOpen(false);
          }}
        />
      )}

      <ConfirmationModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
      />
    </div>
  );
}
