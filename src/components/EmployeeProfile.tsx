import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Shield, 
  DollarSign,
  Clock,
  Award,
  FileText,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Users2,
  Bell,
  AlertCircle,
  Star,
  Activity,
  User,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';
import EmployeeInfoView from './EmployeeInfoView';
import BankInfoView from './BankInfoView';
import FamilyInfoView from './FamilyInfoView';
import EducationInfoView from './EducationInfoView';
import EmploymentInfoView from './EmploymentInfoView';
import ContactInfoView from './ContactInfoView';
import SupervisorInfoView from './SupervisorInfoView';
import DocumentPassportView from './DocumentPassportView';

interface EmployeeProfileProps {
  employee: any;
  onBack: () => void;
}

export default function EmployeeProfile({ employee, onBack }: EmployeeProfileProps) {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  if (activeSubView === 'info') {
    return <EmployeeInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'bank') {
    return <BankInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'family') {
    return <FamilyInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'education') {
    return <EducationInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'employment') {
    return <EmploymentInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'contact') {
    return <ContactInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'supervisor') {
    return <SupervisorInfoView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  if (activeSubView === 'documents') {
    return <DocumentPassportView employee={employee} onBack={() => setActiveSubView(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Employees</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer">Employee Profile</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">{employee.name}</span>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
            {employee.name.split(' ').map((n: any) => n[0]).join('')}
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h2 className="text-3xl font-bold text-slate-900">{employee.name}</h2>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold w-fit">
                Active Employee
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-2 text-slate-500">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">{employee.role}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Users2 className="w-4 h-4" />
                <span className="text-sm font-medium">{employee.department}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Joined: {employee.joinDate}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Employee ID: EMP-00{employee.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Leave Balance', value: '18 Days', sub: 'Out of 24', icon: Calendar, color: 'bg-emerald-500' },
          { label: 'Attendance', value: '98.5%', sub: 'Excellent', icon: Clock, color: 'bg-blue-500' },
          { label: 'Current Salary', value: '$85,000', sub: 'Annual', icon: DollarSign, color: 'bg-purple-500' },
          { label: 'Performance', value: '4.8/5.0', sub: 'Outstanding', icon: Star, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
              <p className={cn("text-xs font-bold mt-1", 
                stat.color === 'bg-emerald-500' ? 'text-emerald-600' : 
                stat.color === 'bg-blue-500' ? 'text-blue-600' :
                stat.color === 'bg-purple-500' ? 'text-purple-600' : 'text-orange-600'
              )}>{stat.sub}</p>
            </div>
            <div className={cn("p-3 rounded-xl", stat.color)}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Employee Info', icon: User, color: 'bg-blue-500', onClick: () => setActiveSubView('info') },
            { label: 'Status', icon: Activity, color: 'bg-emerald-500' },
            { label: 'Bank Info', icon: CreditCard, color: 'bg-purple-500', onClick: () => setActiveSubView('bank') },
            { label: 'Family', icon: Users2, color: 'bg-pink-500', onClick: () => setActiveSubView('family') },
            { label: 'Education', icon: GraduationCap, color: 'bg-indigo-500', onClick: () => setActiveSubView('education') },
            { label: 'Employment', icon: Briefcase, color: 'bg-orange-500', onClick: () => setActiveSubView('employment') },
            { label: 'Contact', icon: Smartphone, color: 'bg-teal-500', onClick: () => setActiveSubView('contact') },
            { label: 'Supervisor', icon: User, color: 'bg-sky-500', onClick: () => setActiveSubView('supervisor') },
            { label: 'Document & Passport', icon: FileText, color: 'bg-rose-500', onClick: () => setActiveSubView('documents') },
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all group"
            >
              <div className={cn("p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform", action.color)}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-700 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { title: 'Leave Request Approved', desc: 'Your leave request for Dec 25-27 has been approved', time: '2 hours ago', color: 'bg-emerald-500' },
              { title: 'Payslip Available', desc: 'Your payslip for December 2024 is now available', time: '1 day ago', color: 'bg-blue-500' },
              { title: 'Training Session', desc: 'New training session scheduled for next week', time: '2 days ago', color: 'bg-amber-500' },
              { title: 'Performance Review', desc: 'Your annual performance review has been submitted', time: '1 week ago', color: 'bg-emerald-500' },
            ].map((activity, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 flex gap-4">
                <div className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", activity.color)} />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{activity.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Reminders */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-slate-900" />
            <h3 className="text-lg font-bold text-slate-900">Notifications & Reminders</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Update Bank Information', desc: 'Please update your bank details by end of month', date: 'Due: Dec 31, 2024', priority: 'high' },
              { title: 'Complete Training Module', desc: 'Complete the mandatory security training', date: 'Due: Jan 15, 2025', priority: 'medium' },
              { title: 'Document Renewal', desc: 'Your passport expires in 6 months', date: 'Due: Jun 30, 2025', priority: 'low' },
              { title: 'Health Checkup', desc: 'Annual health checkup is due', date: 'Due: Jan 10, 2025', priority: 'medium' },
            ].map((notif, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{notif.desc}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2">
                    <Calendar className="w-3 h-3" />
                    {notif.date}
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  notif.priority === 'high' ? "bg-rose-100 text-rose-600" :
                  notif.priority === 'medium' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                )}>
                  {notif.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events & Schedule */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Events & Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Team Meeting', date: 'Jan 5, 2025', time: '10:00 AM - 11:00 AM', loc: 'Conference Room A', type: 'meeting', color: 'border-purple-500 bg-purple-50' },
            { title: 'Project Deadline', date: 'Jan 10, 2025', time: '5:00 PM', loc: 'Remote', type: 'deadline', color: 'border-rose-500 bg-rose-50' },
            { title: 'Company Holiday', date: 'Jan 15, 2025', time: 'All Day', loc: 'Office Closed', type: 'holiday', color: 'border-blue-500 bg-blue-50' },
          ].map((event, i) => (
            <div key={i} className={cn("p-6 rounded-2xl border-l-4 shadow-sm", event.color)}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-900">{event.title}</h4>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  event.type === 'meeting' ? "bg-purple-200 text-purple-700" :
                  event.type === 'deadline' ? "bg-rose-200 text-rose-700" : "bg-blue-200 text-blue-700"
                )}>
                  {event.type}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.loc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
