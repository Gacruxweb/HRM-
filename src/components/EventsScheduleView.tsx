import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  Save, 
  X,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EventRecord } from '../types';
import ActionMenu, { ActionItem } from './ActionMenu';
import ConfirmationModal from './ConfirmationModal';
import SearchFilterBar from './SearchFilterBar';

interface EventsScheduleViewProps {
  onBack: () => void;
}

export default function EventsScheduleView({ onBack }: EventsScheduleViewProps) {
  const [events, setEvents] = useState<EventRecord[]>([
    { 
      id: '1', 
      title: 'Team Meeting', 
      date: 'Jan 5, 2025', 
      startTime: '10:00 AM', 
      endTime: '11:00 AM', 
      location: 'Conference Room A', 
      type: 'Meeting',
      description: 'Weekly sync with the engineering team.'
    },
    { 
      id: '2', 
      title: 'Design Workshop', 
      date: 'Jan 12, 2025', 
      startTime: '02:00 PM', 
      endTime: '04:00 PM', 
      location: 'Creative Studio', 
      type: 'Workshop',
      description: 'Brainstorming session for the new UI redesign.'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EventRecord | null>(null);
  const [formData, setFormData] = useState<Partial<EventRecord>>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'Meeting',
    description: ''
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    record: EventRecord | null;
  }>({
    isOpen: false,
    record: null
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...formData as EventRecord } : ev));
      setEditingEvent(null);
    } else {
      const newEvent: EventRecord = {
        ...formData as EventRecord,
        id: Math.random().toString(36).substr(2, 9)
      };
      setEvents([newEvent, ...events]);
    }
    setIsAddingEvent(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      type: 'Meeting',
      description: ''
    });
  };

  const handleEdit = (event: EventRecord) => {
    setFormData(event);
    setEditingEvent(event);
    setIsAddingEvent(true);
  };

  const confirmDelete = () => {
    if (deleteModal.record) {
      setEvents(prev => prev.filter(ev => ev.id !== deleteModal.record?.id));
      setDeleteModal({ isOpen: false, record: null });
    }
  };

  const getEventActions = (event: EventRecord): ActionItem[] => [
    { label: 'View Details', icon: Eye, onClick: () => setViewingEvent(event) },
    { label: 'Edit Event', icon: Edit, onClick: () => handleEdit(event) },
    { label: 'Delete Event', icon: Trash2, onClick: () => setDeleteModal({ isOpen: true, record: event }), variant: 'danger' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Meeting': return 'bg-[#f3e8ff] text-[#8b5cf6]';
      case 'Workshop': return 'bg-blue-50 text-blue-600';
      case 'Holiday': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Events & Schedule</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Events & Schedule</h2>
          <p className="text-slate-500 mt-1">Organize team meetings, workshops, and company events.</p>
        </div>
        <button 
          onClick={() => { setIsAddingEvent(true); setEditingEvent(null); resetForm(); }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </button>
      </div>

      {isAddingEvent && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
            <button onClick={() => setIsAddingEvent(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Event Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Team Meeting"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Event Type <span className="text-rose-500">*</span></label>
                <select 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Date <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="Jan 5, 2025"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Time <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="10:00 AM"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Time <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="11:00 AM"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Location <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                required
                placeholder="e.g. Conference Room A"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea 
                rows={3}
                placeholder="Briefly describe the event..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsAddingEvent(false)}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
              >
                <Save className="w-4 h-4" />
                {editingEvent ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <SearchFilterBar 
        searchTerm={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search events by title or location..."
        onFilterClick={() => {}} // We'll keep the simple select for now or move it to rightElement
        className="border-none shadow-none px-4"
        rightElement={
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select 
              className="pl-10 pr-8 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none text-sm font-medium text-slate-600"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Meeting">Meetings</option>
              <option value="Workshop">Workshops</option>
              <option value="Holiday">Holidays</option>
              <option value="Other">Other</option>
            </select>
          </div>
        }
      />

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all border-l-[6px] border-l-[#8b5cf6] group relative"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider", 
                    event.type === 'Meeting' ? "bg-[#f3e8ff] text-[#8b5cf6]" : getTypeColor(event.type)
                  )}>
                    {event.type}
                  </span>
                  <ActionMenu items={getEventActions(event)} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[#475569]">
                  <Calendar className="w-5 h-5 text-[#64748b]" />
                  <span className="text-lg font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-4 text-[#475569]">
                  <Clock className="w-5 h-5 text-[#64748b]" />
                  <span className="text-lg font-medium">{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-4 text-[#475569]">
                  <MapPin className="w-5 h-5 text-[#64748b]" />
                  <span className="text-lg font-medium">{event.location}</span>
                </div>
              </div>

              {event.description && (
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <p className="text-xs text-slate-500 italic line-clamp-2">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No events found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, record: null })}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete the event "${deleteModal.record?.title}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
      />

      {/* View Details Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setViewingEvent(null)} />
          <div className="bg-white rounded-[32px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="h-32 bg-indigo-600 relative">
              <button 
                onClick={() => setViewingEvent(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute -bottom-8 left-8">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="p-8 pt-12">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{viewingEvent.title}</h3>
                  <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", getTypeColor(viewingEvent.type))}>
                    {viewingEvent.type}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {viewingEvent.date}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      {viewingEvent.startTime} - {viewingEvent.endTime}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                  <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    {viewingEvent.location}
                  </div>
                </div>

                {viewingEvent.description && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</p>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {viewingEvent.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => setViewingEvent(null)}
                  className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
