import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  History
} from 'lucide-react';
import { MOCK_ATTENDANCE } from '../mockData';
import { cn } from '../lib/utils';
import MarkAttendanceModal from './MarkAttendanceModal';
import { AttendanceRecord } from '../types';
import ActionMenu, { ActionItem } from './ActionMenu';

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('table');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getAttendanceActions = (record: AttendanceRecord): ActionItem[] => [
    { label: 'View Details', icon: Eye, onClick: () => console.log('View', record.id) },
    { label: 'Edit Entry', icon: Edit, onClick: () => console.log('Edit', record.id) },
    { label: 'View History', icon: History, onClick: () => console.log('History', record.employeeName) },
    { label: 'Delete Entry', icon: Trash2, onClick: () => console.log('Delete', record.id), variant: 'danger' },
  ];

  const filteredAttendance = attendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    const matchesLocation = locationFilter === 'All' || record.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleSaveAttendance = (newRecord: Omit<AttendanceRecord, 'id'>) => {
    const record: AttendanceRecord = {
      ...newRecord,
      id: (attendanceRecords.length + 1).toString()
    };
    setAttendanceRecords([record, ...attendanceRecords]);
  };

  const stats = [
    { label: 'Present', count: attendanceRecords.filter(r => r.status === 'Present').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Late', count: attendanceRecords.filter(r => r.status === 'Late').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Absent', count: attendanceRecords.filter(r => r.status === 'Absent').length, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Remote', count: attendanceRecords.filter(r => r.location === 'Remote').length, icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Attendance Tracking</h2>
          <p className="text-slate-500 mt-1">Monitor daily check-ins, check-outs, and attendance status.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'PRESENT', count: attendanceRecords.filter(r => r.status === 'Present').length, subValue: 'Active Today', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'LATE', count: attendanceRecords.filter(r => r.status === 'Late').length, subValue: 'Needs Review', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'ABSENT', count: attendanceRecords.filter(r => r.status === 'Absent').length, subValue: 'Today', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'REMOTE', count: attendanceRecords.filter(r => r.location === 'Remote').length, subValue: 'Work From Home', icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.count}</h3>
              <p className={cn("text-xs font-bold", stat.color)}>{stat.subValue}</p>
            </div>
            <div className={cn("p-3 rounded-2xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900">Daily Attendance Log</h3>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search employee..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "p-2 bg-slate-50 rounded-lg text-slate-500 hover:text-slate-700 transition-colors",
                  (statusFilter !== 'All' || locationFilter !== 'All') && "text-indigo-600 bg-indigo-50"
                )}
              >
                <Filter className="w-5 h-5" />
              </button>

              {isFilterOpen && (
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
                        <option value="Present">Present</option>
                        <option value="Late">Late</option>
                        <option value="Absent">Absent</option>
                        <option value="Half Day">Half Day</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</label>
                      <select 
                        className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      >
                        <option value="All">All Locations</option>
                        <option value="Office">Office</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => {
                        setStatusFilter('All');
                        setLocationFilter('All');
                        setIsFilterOpen(false);
                      }}
                      className="w-full py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 flex">
              <button 
                onClick={() => setDisplayMode('grid')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  displayMode === 'grid' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button 
                onClick={() => setDisplayMode('table')}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  displayMode === 'table' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
        {displayMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttendance.map((record) => (
              <div key={record.id} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-slate-900">{record.employeeName}</p>
                    <p className="text-xs text-slate-500">ID: {record.employeeId}</p>
                  </div>
                  <ActionMenu items={getAttendanceActions(record)} />
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Check In</span>
                    <span className="font-bold text-emerald-600">{record.checkIn}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Check Out</span>
                    <span className="font-bold text-rose-600">{record.checkOut || '--:--'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" />
                    {record.location}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    record.status === 'Present' ? "bg-emerald-100 text-emerald-700" : 
                    record.status === 'Late' ? "bg-amber-100 text-amber-700" : 
                    record.status === 'Absent' ? "bg-rose-100 text-rose-700" : "bg-indigo-100 text-indigo-700"
                  )}>
                    {record.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{record.date}</span>
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
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Check In</th>
                  <th className="px-6 py-4 font-semibold">Check Out</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{record.employeeName}</p>
                      <p className="text-xs text-slate-500">ID: {record.employeeId}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{record.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-900 font-medium">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {record.checkIn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-900 font-medium">
                        <Clock className="w-4 h-4 text-rose-500" />
                        {record.checkOut || '--:--'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {record.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold",
                        record.status === 'Present' ? "bg-emerald-50 text-emerald-700" : 
                        record.status === 'Late' ? "bg-amber-50 text-amber-700" : 
                        record.status === 'Absent' ? "bg-rose-50 text-rose-700" : "bg-indigo-50 text-indigo-700"
                      )}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionMenu items={getAttendanceActions(record)} className="inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <MarkAttendanceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveAttendance} 
      />
    </div>
  );
}
