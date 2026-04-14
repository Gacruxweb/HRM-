import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  CreditCard, 
  Wallet, 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  Users,
  Banknote,
  CalendarDays,
  Scale,
  Download
} from 'lucide-react';
import { cn } from '../lib/utils';
import PayrollPolicyView from './PayrollPolicyView';
import PayrollCycleView from './PayrollCycleView';

interface PayrollSettingProps {
  onBack: () => void;
}

export default function PayrollSetting({ onBack }: PayrollSettingProps) {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  if (activeSubView === 'payroll-cycle') {
    return <PayrollCycleView onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'salary-components') {
    const components = [
      { name: 'Basic Salary', type: 'Earning', calc: 'Fixed', value: '100%', status: 'Active' },
      { name: 'House Rent Allowance (HRA)', type: 'Earning', calc: 'Percentage', value: '40% of Basic', status: 'Active' },
      { name: 'Conveyance Allowance', type: 'Earning', calc: 'Fixed', value: '$200', status: 'Active' },
      { name: 'Medical Allowance', type: 'Earning', calc: 'Fixed', value: '$150', status: 'Active' },
      { name: 'Internet Allowance', type: 'Earning', calc: 'Fixed', value: '$50', status: 'Active' },
      { name: 'Shift Differential', type: 'Earning', calc: 'Percentage', value: '10% of Basic', status: 'Active' },
      { name: 'Performance Bonus', type: 'Earning', calc: 'Variable', value: 'Based on Rating', status: 'Active' },
      { name: 'Income Tax (TDS)', type: 'Deduction', calc: 'Percentage', value: 'As per Slabs', status: 'Active' },
      { name: 'Provident Fund (PF)', type: 'Deduction', calc: 'Percentage', value: '12% of Basic', status: 'Active' },
      { name: 'Professional Tax', type: 'Deduction', calc: 'Fixed', value: '$20', status: 'Active' },
      { name: 'Health Insurance', type: 'Deduction', calc: 'Fixed', value: '$50', status: 'Active' },
      { name: 'Loan Recovery', type: 'Deduction', calc: 'Fixed', value: 'Variable', status: 'Active' },
    ];

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setActiveSubView(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="hover:text-slate-900 cursor-pointer" onClick={() => setActiveSubView(null)}>Payroll Setting</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-600 font-bold">Salary Components</span>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Salary Components</h2>
              <p className="text-slate-500 mt-1">Configure earnings and deductions for payroll calculation.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm">
              Add Component
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Component Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Calculation</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {components.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        c.type === 'Earning' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.calc}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.value}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {c.status}
                      </span>
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

  if (activeSubView === 'bank-settings') {
    const bankDetails = {
      companyName: 'TechFlow Solutions Inc.',
      bankName: 'Global Commerce Bank',
      accountNumber: '**** **** 8829',
      routingNumber: '123456789',
      swiftCode: 'GCBUSA33',
      branch: 'Main Street, New York',
    };

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setActiveSubView(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="hover:text-slate-900 cursor-pointer" onClick={() => setActiveSubView(null)}>Payroll Setting</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-600 font-bold">Bank Settings</span>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Company Bank Details</h2>
              <p className="text-slate-500 mt-1">Manage the primary account for salary disbursements.</p>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
              Update Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Banknote className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Primary Disbursement Account</p>
                <h3 className="text-xl font-bold mb-1">{bankDetails.bankName}</h3>
                <p className="text-slate-400 text-sm mb-12">{bankDetails.branch}</p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Account Number</p>
                    <p className="text-lg font-mono tracking-wider">{bankDetails.accountNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">SWIFT / BIC</p>
                    <p className="text-lg font-mono tracking-wider">{bankDetails.swiftCode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Payment Gateway Status</h4>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Stripe Connect</p>
                      <p className="text-xs text-slate-500">Linked & Verified</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Connected</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Security Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Require 2FA for Payroll Runs</span>
                    <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Email Notification on Disbursement</span>
                    <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubView === 'payslip-template') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setActiveSubView(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="hover:text-slate-900 cursor-pointer" onClick={() => setActiveSubView(null)}>Payroll Setting</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-600 font-bold">Payslip Template</span>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Payslip Customization</h2>
              <p className="text-slate-500 mt-1">Design how your employees see their salary breakdown.</p>
            </div>
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Preview Template
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">General Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs font-medium text-slate-700">Show Company Logo</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs font-medium text-slate-700">Display Leave Balance</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs font-medium text-slate-700">Show Attendance Summary</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Primary Color</h4>
                <div className="flex gap-3">
                  {['#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb'].map(color => (
                    <button 
                      key={color} 
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        color === '#4f46e5' ? "border-slate-900 scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="bg-white shadow-2xl rounded-lg p-10 max-w-2xl mx-auto aspect-[1/1.4] flex flex-col">
                  <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                    <div>
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg mb-4"></div>
                      <h3 className="text-lg font-bold text-slate-900">TechFlow Solutions Inc.</h3>
                      <p className="text-[10px] text-slate-500">123 Business Ave, New York, NY 10001</p>
                    </div>
                    <div className="text-right">
                      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">Payslip</h2>
                      <p className="text-[10px] font-bold text-slate-400">APRIL 2024</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Employee Details</p>
                      <p className="text-sm font-bold text-slate-900">Johnathan Doe</p>
                      <p className="text-xs text-slate-500">Senior Software Engineer</p>
                      <p className="text-xs text-slate-500">Emp ID: TF-001</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Payment Info</p>
                      <p className="text-xs text-slate-500">Bank: Global Commerce Bank</p>
                      <p className="text-xs text-slate-500">A/C: **** 8829</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-900 uppercase border-b border-slate-100 pb-1">Earnings</p>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Basic Salary</span><span className="font-medium">$5,000.00</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">HRA</span><span className="font-medium">$2,000.00</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Conveyance</span><span className="font-medium">$200.00</span></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-900 uppercase border-b border-slate-100 pb-1">Deductions</p>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">Income Tax</span><span className="font-medium">$850.00</span></div>
                        <div className="flex justify-between text-xs"><span className="text-slate-500">PF</span><span className="font-medium">$600.00</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t-2 border-slate-900 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Payable</p>
                      <h3 className="text-3xl font-black text-slate-900">$5,750.00</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-medium text-slate-400 italic">This is a system generated document.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubView === 'policy') {
    return <PayrollPolicyView onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'tax-rules') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => setActiveSubView(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="hover:text-slate-900 cursor-pointer" onClick={() => setActiveSubView(null)}>Payroll Setting</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-600 font-bold">Tax Rules</span>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tax Rules & Slabs</h2>
          <p className="text-slate-500">Define income tax brackets and deduction rules.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Income Range</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tax Rate</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { range: '$0 - $10,000', rate: '0%', desc: 'Tax-free allowance' },
                  { range: '$10,001 - $30,000', rate: '10%', desc: 'Standard bracket' },
                  { range: '$30,001 - $70,000', rate: '20%', desc: 'Middle income bracket' },
                  { range: '$70,001+', rate: '30%', desc: 'High income bracket' },
                ].map((slab, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{slab.range}</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">{slab.rate}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{slab.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Payroll Management</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Payroll Setting</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Payroll Configuration</h2>
          <p className="text-slate-500 mt-1">Manage salary structures, tax rules, and payment cycles.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Components', value: '18', sub: '12 Earnings, 6 Deductions', icon: Banknote, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Tax Brackets', value: '5', sub: 'Current FY 2024-25', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Next Run Date', value: 'Apr 30', sub: 'Monthly Cycle', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-xs text-slate-500">{stat.sub}</p>
            </div>
            <div className={cn("p-4 rounded-2xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Payroll Management Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: 'Salary Components', icon: Layers, color: 'bg-blue-500', onClick: () => setActiveSubView('salary-components') },
            { label: 'Payroll Cycle', icon: CalendarDays, color: 'bg-emerald-500', onClick: () => setActiveSubView('payroll-cycle') },
            { label: 'Tax Rules', icon: ShieldCheck, color: 'bg-purple-500', onClick: () => setActiveSubView('tax-rules') },
            { label: 'Bank Settings', icon: Wallet, color: 'bg-rose-500', onClick: () => setActiveSubView('bank-settings') },
            { label: 'Payslip Template', icon: FileText, color: 'bg-amber-500', onClick: () => setActiveSubView('payslip-template') },
            { label: 'Payroll Policy', icon: Scale, color: 'bg-indigo-500', onClick: () => setActiveSubView('policy') },
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 hover:border-indigo-100 transition-all group w-full"
            >
              <div className={cn("p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-slate-100", action.color)}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Configuration Changes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Payroll Updates</h3>
          <div className="space-y-4">
            {[
              { title: 'HRA Component Updated', desc: 'Increased HRA percentage for Metro cities', time: '1 day ago', icon: CheckCircle2, color: 'text-emerald-500' },
              { title: 'Tax Slab Revision', desc: 'Updated slabs according to new finance bill', time: '4 days ago', icon: ShieldCheck, color: 'text-blue-500' },
              { title: 'Bank Account Sync', desc: 'Updated employee bank details for 5 members', time: '1 week ago', icon: Wallet, color: 'text-indigo-500' },
              { title: 'New Salary Component', desc: 'Added "Internet Allowance" for remote employees', time: '2 weeks ago', icon: Layers, color: 'text-purple-500' },
              { title: 'Payroll Cycle Change', desc: 'Modified cutoff date for Contractor Bi-weekly cycle', time: '3 weeks ago', icon: CalendarDays, color: 'text-amber-500' },
            ].map((update, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className={cn("p-2 rounded-lg bg-white shadow-sm h-fit", update.color)}>
                  <update.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{update.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{update.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">System Health</h3>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-700">Tax Calculation Engine</span>
                <span className="text-xs font-bold text-emerald-600">Active</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[100%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-3">All tax rules are up to date.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-700">Bank Gateway Sync</span>
                <span className="text-xs font-bold text-indigo-600">95%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-[95%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-3">3 bank accounts need verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
