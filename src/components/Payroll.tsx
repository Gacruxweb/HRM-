import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  FileText,
  Edit,
  Trash2,
  Check
} from 'lucide-react';
import { MOCK_PAYROLL } from '../mockData';
import { cn } from '../lib/utils';
import ActionMenu, { ActionItem } from './ActionMenu';
import SearchFilterBar from './SearchFilterBar';
import PayrollSetting from './PayrollSetting';
import { Settings } from 'lucide-react';

export default function Payroll() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('table');
  const [showSetting, setShowSetting] = useState(false);

  const getPayrollActions = (record: any): ActionItem[] => [
    { label: 'View Payslip', icon: FileText, onClick: () => console.log('View', record.id) },
    { label: 'Mark as Paid', icon: Check, onClick: () => console.log('Paid', record.id) },
    { label: 'Edit Salary', icon: Edit, onClick: () => console.log('Edit', record.id) },
    { label: 'Download PDF', icon: Download, onClick: () => console.log('Download', record.id) },
    { label: 'Delete Record', icon: Trash2, onClick: () => console.log('Delete', record.id), variant: 'danger' },
  ];

  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredPayroll = MOCK_PAYROLL.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    const matchesMonth = monthFilter === 'All' || record.month === monthFilter;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  if (showSetting) {
    return <PayrollSetting onBack={() => setShowSetting(false)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Payroll Management</h2>
          <p className="text-slate-500 mt-1">Process salaries, bonuses, and view payment history.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => setShowSetting(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4 text-indigo-500" />
            Payroll Setting
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'TOTAL MONTHLY PAYROLL', value: '$142,500.00', subValue: '+4.2% from last month', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'PAYMENTS PROCESSED', value: '42 / 45', subValue: '3 pending approvals', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'NEXT PAY DATE', value: 'April 30, 2024', subValue: 'In 22 days', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className={cn("text-xs font-bold", stat.color)}>{stat.subValue}</p>
            </div>
            <div className={cn("p-3 rounded-2xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search employee name or ID..."
          displayMode={displayMode}
          onDisplayModeChange={setDisplayMode}
          onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
          isFilterActive={statusFilter !== 'All' || monthFilter !== 'All'}
          className="border-none shadow-none px-4"
          rightElement={
            isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                    <select 
                      className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Month</label>
                    <select 
                      className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={monthFilter}
                      onChange={(e) => setMonthFilter(e.target.value)}
                    >
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      setStatusFilter('All');
                      setMonthFilter('All');
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {displayMode === 'grid' ? (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPayroll.map((record) => (
                <div key={record.id} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-slate-900">{record.employeeName}</p>
                      <p className="text-xs text-slate-500">ID: {record.employeeId}</p>
                    </div>
                    <ActionMenu items={getPayrollActions(record)} />
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Month</span>
                      <span className="font-bold text-slate-900">{record.month} {record.year}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Net Pay</span>
                      <span className="font-bold text-indigo-600">${record.netPay.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      record.status === 'Paid' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {record.status}
                    </span>
                    <button className="text-[10px] font-bold text-indigo-600 hover:underline">View Payslip</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Employee</th>
                    <th className="px-6 py-4 font-semibold">Month</th>
                    <th className="px-6 py-4 font-semibold">Basic Salary</th>
                    <th className="px-6 py-4 font-semibold">Bonus</th>
                    <th className="px-6 py-4 font-semibold">Deductions</th>
                    <th className="px-6 py-4 font-semibold">Net Pay</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayroll.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{record.employeeName}</p>
                        <p className="text-xs text-slate-500">ID: {record.employeeId}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{record.month} {record.year}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">${record.basicSalary.toLocaleString()}</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">+${record.bonus.toLocaleString()}</td>
                      <td className="px-6 py-4 text-rose-600 font-medium">-${record.deductions.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-900 font-bold">${record.netPay.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-bold",
                          record.status === 'Paid' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        )}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionMenu items={getPayrollActions(record)} className="inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
