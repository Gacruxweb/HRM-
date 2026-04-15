import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Banknote, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  X,
  Save,
  Calculator
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EmployeeSalaryRecord } from '../types/payroll';
import ActionMenu, { ActionItem } from './ActionMenu';
import SearchFilterBar from './SearchFilterBar';

interface SalaryListViewProps {
  onBack: () => void;
}

export default function SalaryListView({ onBack }: SalaryListViewProps) {
  const [salaries, setSalaries] = useState<EmployeeSalaryRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Sarah Jenkins',
      department: 'Engineering',
      shift: 'Morning Shift',
      baseSalary: 5500,
      lastPaidDate: '2024-03-31',
      overtimeHours: 10,
      overtimeRate: 45,
      deductions: 200,
      allowances: 300,
      netSalary: 6050
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Michael Chen',
      department: 'Design',
      shift: 'Morning Shift',
      baseSalary: 4800,
      lastPaidDate: '2024-03-31',
      overtimeHours: 5,
      overtimeRate: 40,
      deductions: 150,
      allowances: 200,
      netSalary: 5050
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Elena Rodriguez',
      department: 'Marketing',
      shift: 'Evening Shift',
      baseSalary: 4200,
      lastPaidDate: '2024-03-31',
      overtimeHours: 0,
      overtimeRate: 35,
      deductions: 100,
      allowances: 150,
      netSalary: 4250
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSalaryRecord | null>(null);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({
    overtimeHours: 0,
    overtimeRate: 0,
    deductions: 0,
    allowances: 0
  });
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('list');

  const filteredSalaries = salaries.filter(s => 
    s.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (employee: EmployeeSalaryRecord, action: 'view' | 'adjust') => {
    setSelectedEmployee(employee);
    if (action === 'view') {
      setIsDetailsModalOpen(true);
    } else {
      setAdjustmentData({
        overtimeHours: employee.overtimeHours,
        overtimeRate: employee.overtimeRate,
        deductions: employee.deductions,
        allowances: employee.allowances
      });
      setIsAdjustmentModalOpen(true);
    }
  };

  const calculateNetSalary = (base: number, otHours: number, otRate: number, ded: number, allow: number) => {
    return base + (otHours * otRate) + allow - ded;
  };

  const handleSaveAdjustment = () => {
    if (!selectedEmployee) return;

    const updatedNetSalary = calculateNetSalary(
      selectedEmployee.baseSalary,
      adjustmentData.overtimeHours,
      adjustmentData.overtimeRate,
      adjustmentData.deductions,
      adjustmentData.allowances
    );

    setSalaries(prev => prev.map(s => 
      s.id === selectedEmployee.id 
        ? { 
            ...s, 
            ...adjustmentData, 
            netSalary: updatedNetSalary 
          } 
        : s
    ));
    setIsAdjustmentModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Payroll Setting</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Salary List</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Salary List</h2>
          <p className="text-slate-500 mt-1">View and manage employee salary details and adjustments.</p>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search employees, ID or department..."
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        timeFilter={{
          value: timeFilter,
          options: ['All Time', 'This Month', 'Last Month', 'Last 3 Months'],
          onChange: setTimeFilter
        }}
        onFilterClick={() => {}}
      />

      {/* Salary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department & Shift</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Salary</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Salary</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Paid</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSalaries.map((salary) => (
                <tr key={salary.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {salary.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{salary.employeeName}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{salary.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700 font-medium">{salary.department}</p>
                    <p className="text-[10px] text-slate-400">{salary.shift}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">${salary.baseSalary.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-indigo-600">${salary.netSalary.toLocaleString()}</p>
                      {salary.netSalary > salary.baseSalary ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                      ) : salary.netSalary < salary.baseSalary ? (
                        <ArrowDownRight className="w-3 h-3 text-rose-500" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {salary.lastPaidDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu items={[
                      { label: 'View Details', icon: Eye, onClick: () => handleAction(salary, 'view') },
                      { label: 'Salary Adjustment', icon: TrendingUp, onClick: () => handleAction(salary, 'adjust') },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjustment Modal */}
      {isAdjustmentModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-2xl">
                  <Calculator className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Salary Adjustment</h3>
                  <p className="text-sm text-slate-500">{selectedEmployee.employeeName} ({selectedEmployee.employeeId})</p>
                </div>
              </div>
              <button onClick={() => setIsAdjustmentModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overtime Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={adjustmentData.overtimeHours}
                      onChange={(e) => setAdjustmentData({ ...adjustmentData, overtimeHours: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overtime Rate ($/hr)</label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={adjustmentData.overtimeRate}
                      onChange={(e) => setAdjustmentData({ ...adjustmentData, overtimeRate: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest text-rose-500">Deductions ($)</label>
                  <div className="relative">
                    <TrendingDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                      value={adjustmentData.deductions}
                      onChange={(e) => setAdjustmentData({ ...adjustmentData, deductions: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest text-emerald-500">Allowances ($)</label>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input 
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      value={adjustmentData.allowances}
                      onChange={(e) => setAdjustmentData({ ...adjustmentData, allowances: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-3xl text-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Base Salary</span>
                  <span className="font-bold">${selectedEmployee.baseSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Overtime Pay ({adjustmentData.overtimeHours}h × ${adjustmentData.overtimeRate})</span>
                  <span className="text-emerald-400 font-bold">+${(adjustmentData.overtimeHours * adjustmentData.overtimeRate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Allowances</span>
                  <span className="text-emerald-400 font-bold">+${adjustmentData.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm">Deductions</span>
                  <span className="text-rose-400 font-bold">-${adjustmentData.deductions.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-800 mb-6" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Estimated Net Salary</span>
                  <span className="text-2xl font-bold text-indigo-400">
                    ${calculateNetSalary(
                      selectedEmployee.baseSalary,
                      adjustmentData.overtimeHours,
                      adjustmentData.overtimeRate,
                      adjustmentData.deductions,
                      adjustmentData.allowances
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsAdjustmentModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveAdjustment}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Salary Details</h3>
              <button onClick={() => setIsDetailsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  {selectedEmployee.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedEmployee.employeeName}</h4>
                  <p className="text-sm text-slate-500">{selectedEmployee.employeeId} • {selectedEmployee.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Base Salary</p>
                  <p className="text-lg font-bold text-slate-900">${selectedEmployee.baseSalary.toLocaleString()}</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Net Salary</p>
                  <p className="text-lg font-bold text-indigo-600">${selectedEmployee.netSalary.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Month Breakdown</h5>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl text-sm">
                    <span className="text-slate-600">Overtime Pay ({selectedEmployee.overtimeHours}h)</span>
                    <span className="font-bold text-emerald-600">+${(selectedEmployee.overtimeHours * selectedEmployee.overtimeRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl text-sm">
                    <span className="text-slate-600">Allowances</span>
                    <span className="font-bold text-emerald-600">+${selectedEmployee.allowances.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl text-sm">
                    <span className="text-slate-600">Deductions</span>
                    <span className="font-bold text-rose-600">-${selectedEmployee.deductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
