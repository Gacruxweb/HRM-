import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Settings
} from 'lucide-react';
import { MOCK_LEAVE_REQUESTS } from '../mockData';
import { cn } from '../lib/utils';
import NewLeaveRequestModal from './NewLeaveRequestModal';
import ActionMenu, { ActionItem } from './ActionMenu';
import LeaveSetting from './LeaveSetting';

export default function Leave() {
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('table');
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return <LeaveSetting onBack={() => setShowSettings(false)} />;
  }

  const getLeaveActions = (request: any): ActionItem[] => [
    { label: 'Approve Request', icon: Check, onClick: () => console.log('Approve', request.id) },
    { label: 'Reject Request', icon: X, onClick: () => console.log('Reject', request.id), variant: 'danger' },
    { label: 'View Details', icon: Eye, onClick: () => console.log('View', request.id) },
    { label: 'Edit Request', icon: Edit, onClick: () => console.log('Edit', request.id) },
    { label: 'Delete Request', icon: Trash2, onClick: () => console.log('Delete', request.id), variant: 'danger' },
  ];

  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
    const matchesType = typeFilter === 'All' || request.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const handleSaveRequest = (newRequest: any) => {
    setRequests([newRequest, ...requests]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Leave Tracking</h2>
          <p className="text-slate-500 mt-1">Monitor and manage employee time-off requests.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowSettings(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Leave Setting
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Leave Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'PENDING', count: requests.filter(r => r.status === 'Pending').length, subValue: 'Needs Review', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'APPROVED', count: requests.filter(r => r.status === 'Approved').length, subValue: 'This Month', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'REJECTED', count: requests.filter(r => r.status === 'Rejected').length, subValue: 'This Month', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'ON LEAVE TODAY', count: 5, subValue: 'Active Today', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Recent Requests</h3>
          <div className="flex gap-2 relative">
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
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "p-2 bg-slate-50 rounded-lg text-slate-500 hover:text-slate-700 transition-colors",
                (statusFilter !== 'All' || typeFilter !== 'All') && "text-indigo-600 bg-indigo-50"
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
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Leave Type</label>
                    <select 
                      className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Annual">Annual</option>
                      <option value="Sick">Sick</option>
                      <option value="Maternity">Maternity</option>
                      <option value="Paternity">Paternity</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => {
                      setStatusFilter('All');
                      setTypeFilter('All');
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
        </div>
        {displayMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-slate-900">{request.employeeName}</p>
                    <p className="text-xs text-slate-500">ID: {request.employeeId}</p>
                  </div>
                  <ActionMenu items={getLeaveActions(request)} />
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Type</span>
                    <span className="px-2 py-0.5 bg-white text-slate-700 rounded text-[10px] font-bold uppercase">{request.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-bold text-slate-900">5 Days</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 italic">"{request.reason}"</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
                    request.status === 'Approved' ? "bg-emerald-100 text-emerald-700" : 
                    request.status === 'Pending' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {request.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{request.startDate}</span>
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
                  <th className="px-6 py-4 font-semibold">Leave Type</th>
                  <th className="px-6 py-4 font-semibold">Duration</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{request.employeeName}</p>
                      <p className="text-xs text-slate-500">ID: {request.employeeId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 font-medium">{request.startDate} to {request.endDate}</p>
                      <p className="text-xs text-slate-500">5 Days</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm max-w-xs truncate">{request.reason}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit",
                        request.status === 'Approved' ? "bg-emerald-50 text-emerald-700" : 
                        request.status === 'Pending' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {request.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                        {request.status === 'Pending' && <Clock className="w-3 h-3" />}
                        {request.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionMenu items={getLeaveActions(request)} className="inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <NewLeaveRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveRequest} 
      />
    </div>
  );
}
