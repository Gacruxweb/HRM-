import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  ArrowLeftRight, 
  RotateCcw, 
  History,
  Plus,
  Search,
  Check,
  Ban
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_SHIFT_REQUESTS, MOCK_SHIFTS } from '../mockData';
import ShiftRequestModal from './ShiftRequestModal';

interface EmployeeShiftViewProps {
  employee: any;
  onBack: () => void;
  isAdmin?: boolean;
}

export default function EmployeeShiftView({ employee, onBack, isAdmin }: EmployeeShiftViewProps) {
  const [requests, setRequests] = useState(MOCK_SHIFT_REQUESTS);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<'Swap' | 'Change'>('Swap');

  const employeeRequests = requests.filter(r => r.requestFromId === employee.id);
  const currentShift = MOCK_SHIFTS.find(s => s.name === employee.currentShift);

  const handleAddRequest = (newRequest: any) => {
    setRequests(prev => [{ ...newRequest, id: (prev.length + 1).toString() }, ...prev]);
    setIsRequestModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition-all shadow-sm hover:shadow-md group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Shift Management</h2>
            <p className="text-slate-500 text-sm">Manage your work schedule and requests</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setRequestType('Swap'); setIsRequestModalOpen(true); }}
            className="px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowLeftRight className="w-4 h-4 text-blue-500" />
            Swap Shift
          </button>
          <button 
            onClick={() => { setRequestType('Change'); setIsRequestModalOpen(true); }}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            Request Change
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Shift & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Shift</h3>
            
            {currentShift ? (
              <div className="space-y-6">
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                      <Clock className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{currentShift.name}</h4>
                    <p className="text-indigo-600 font-bold text-sm">{currentShift.startTime} - {currentShift.endTime}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">Shift Type</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{currentShift.type}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">Duration</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">8 Hours</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Notes</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    {currentShift.notes}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm italic">No active shift assigned</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Requests */}
        <div className="lg:col-span-2 space-y-10">
          {/* Pending Requests */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">My Pending Requests</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {employeeRequests.filter(r => r.status === 'Pending').length > 0 ? (
                employeeRequests.filter(r => r.status === 'Pending').map(req => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2.5 rounded-xl",
                          req.type === 'Swap' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {req.type === 'Swap' ? <ArrowLeftRight className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Shift {req.type}</h4>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                            From {new Date(req.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current</p>
                        <p className="text-sm font-bold text-slate-900">{req.shiftName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {req.type === 'Swap' ? 'Swap With' : 'Requested'}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {req.type === 'Swap' ? req.requestToName : req.newShiftName}
                        </p>
                      </div>
                    </div>

                    {req.remarks && (
                      <p className="text-xs text-slate-500 italic leading-relaxed">"{req.remarks}"</p>
                    )}

                    {req.isAdminCreated && (
                      <div className="pt-2 border-t border-slate-50">
                        <p className="text-[10px] text-slate-400 font-medium italic">Created by admin</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-slate-400 text-sm">No pending requests</p>
                </div>
              )}
            </div>
          </div>

          {/* History */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Request History</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {employeeRequests.filter(r => r.status !== 'Pending').length > 0 ? (
                employeeRequests.filter(r => r.status !== 'Pending').map(req => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden opacity-80 grayscale-[0.2] hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400">
                          {req.type === 'Swap' ? <ArrowLeftRight className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-600">Shift {req.type}</h4>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                            From {new Date(req.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        req.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      )}>
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current</p>
                        <p className="text-sm font-bold text-slate-900">{req.shiftName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {req.type === 'Swap' ? 'Swap With' : 'Requested'}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {req.type === 'Swap' ? req.requestToName : req.newShiftName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <p className="text-slate-400 text-sm">No request history</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShiftRequestModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSave={handleAddRequest}
        type={requestType}
        shifts={MOCK_SHIFTS}
        initialRequesterId={employee.id}
        isAdmin={isAdmin}
      />
    </div>
  );
}
