import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  User, 
  TrendingUp,
  Mail,
  MoreVertical,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Department, Employee } from '../types';
import { MOCK_EMPLOYEES } from '../mockData';
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
}

const performanceData = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.5 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.7 },
  { month: 'May', score: 4.8 },
];

export default function DepartmentDetails({ department, onBack }: DepartmentDetailsProps) {
  const deptEmployees = MOCK_EMPLOYEES.filter(emp => emp.department === department.name);

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
              <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
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
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
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
    </div>
  );
}
