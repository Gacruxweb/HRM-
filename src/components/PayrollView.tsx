import React from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Download, 
  FileText, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  Clock,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PayrollViewProps {
  employee: any;
  onBack: () => void;
}

export default function PayrollView({ employee, onBack }: PayrollViewProps) {
  const mockPayslips = [
    { id: '1', month: 'March', year: '2024', basic: 5000, bonus: 500, deductions: 200, net: 5300, status: 'Paid', date: 'Mar 31, 2024' },
    { id: '2', month: 'February', year: '2024', basic: 5000, bonus: 0, deductions: 200, net: 4800, status: 'Paid', date: 'Feb 29, 2024' },
    { id: '3', month: 'January', year: '2024', basic: 5000, bonus: 200, deductions: 200, net: 5000, status: 'Paid', date: 'Jan 31, 2024' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Payroll & Payslips</h2>
          <p className="text-sm text-slate-500">View your salary history and download payslips.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Current Basic Salary', value: '$5,000.00', sub: 'Per Month', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Last Paid Amount', value: '$5,300.00', sub: 'Paid on Mar 31', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Next Pay Date', value: 'Apr 30, 2024', sub: 'In 20 days', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className={cn("text-xs font-bold", stat.color)}>{stat.sub}</p>
            </div>
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Payment History</h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Month/Year</th>
                <th className="px-6 py-4 font-semibold">Basic</th>
                <th className="px-6 py-4 font-semibold">Bonus</th>
                <th className="px-6 py-4 font-semibold">Deductions</th>
                <th className="px-6 py-4 font-semibold">Net Pay</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPayslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{payslip.month} {payslip.year}</td>
                  <td className="px-6 py-4 text-slate-600">${payslip.basic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-emerald-600">+${payslip.bonus.toLocaleString()}</td>
                  <td className="px-6 py-4 text-rose-600">-${payslip.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${payslip.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                      {payslip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
