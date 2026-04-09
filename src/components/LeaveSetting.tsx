import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Layers, 
  Users, 
  FileText, 
  Palmtree, 
  Activity,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';
import LeaveYearView from './LeaveYearView';

interface LeaveSettingProps {
  onBack: () => void;
}

export default function LeaveSetting({ onBack }: LeaveSettingProps) {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  if (activeSubView === 'leave-year') {
    return <LeaveYearView onBack={() => setActiveSubView(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Leave Tracking</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Leave Setting</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Leave Configuration</h2>
          <p className="text-slate-500 mt-1">Manage global leave rules, policies, and holiday calendars.</p>
        </div>
      </div>

      {/* Stats Row - Dashboard Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Policies', value: '12', sub: 'Across 4 groups', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Upcoming Holidays', value: '3', sub: 'In the next 30 days', icon: Palmtree, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Adjustments', value: '8', sub: 'Manual corrections', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
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

      {/* Quick Actions Section - Similar to Employee Profile */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Leave Management Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: 'Leave Year', icon: Calendar, color: 'bg-blue-500', onClick: () => setActiveSubView('leave-year') },
            { label: 'Leave Type', icon: Layers, color: 'bg-emerald-500' },
            { label: 'Leave Group', icon: Users, color: 'bg-purple-500' },
            { label: 'Leave Policy', icon: FileText, color: 'bg-rose-500' },
            { label: 'Holiday Setup', icon: Palmtree, color: 'bg-amber-500' },
            { label: 'Leave Status', icon: Activity, color: 'bg-teal-500' },
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 hover:border-indigo-100 transition-all group"
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
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Policy Updates</h3>
          <div className="space-y-4">
            {[
              { title: 'Annual Leave Carryover', desc: 'Updated carryover limit from 5 to 10 days', time: '2 days ago', icon: CheckCircle2, color: 'text-emerald-500' },
              { title: 'New Holiday Added', desc: 'Added "Company Foundation Day" to calendar', time: '1 week ago', icon: Calendar, color: 'text-blue-500' },
              { title: 'Sick Leave Policy', desc: 'Modified medical certificate requirement rules', time: '2 weeks ago', icon: FileText, color: 'text-indigo-500' },
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
                <span className="text-sm font-bold text-slate-700">Leave Balance Sync</span>
                <span className="text-xs font-bold text-emerald-600">Healthy</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[98%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-3">Last synced: Today at 04:00 AM</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-700">Policy Compliance</span>
                <span className="text-xs font-bold text-indigo-600">100%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-full"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-3">All active requests follow current policies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon since ShieldCheck isn't in standard lucide-react sometimes
function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
