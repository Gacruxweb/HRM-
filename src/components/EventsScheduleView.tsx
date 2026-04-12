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
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EventRecord } from '../types';
import ActionMenu, { ActionItem } from './ActionMenu';
import ConfirmationModal from './ConfirmationModal';
import SearchFilterBar from './SearchFilterBar';
import CustomPeriodModal from './CustomPeriodModal';

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
      title: 'Project Deadline', 
      date: 'Jan 10, 2025', 
      startTime: '05:00 PM', 
      endTime: '', 
      location: 'Remote', 
      type: 'Deadline',
      description: 'Final submission for the Q1 project.'
    },
    { 
      id: '3', 
      title: 'Company Holiday', 
      date: 'Jan 15, 2025', 
      startTime: 'All Day', 
      endTime: '', 
      location: 'Office Closed', 
      type: 'Holiday',
      description: 'Public holiday observation.'
    },
    { 
      id: '4', 
      title: 'UX Review Session', 
      date: 'Jan 18, 2025', 
      startTime: '02:00 PM', 
      endTime: '03:30 PM', 
      location: 'Design Lab', 
      type: 'Meeting',
      description: 'Reviewing the latest wireframes for the mobile app.'
    },
    { 
      id: '5', 
      title: 'Backend Architecture', 
      date: 'Jan 20, 2025', 
      startTime: '11:00 AM', 
      endTime: '12:30 PM', 
      location: 'Meeting Room 4', 
      type: 'Workshop',
      description: 'Discussing the migration to microservices.'
    },
    { 
      id: '6', 
      title: 'Quarterly Planning', 
      date: 'Jan 25, 2025', 
      startTime: '09:00 AM', 
      endTime: '05:00 PM', 
      location: 'Grand Ballroom', 
      type: 'Meeting',
      description: 'Setting goals for the next quarter.'
    },
    { 
      id: '7', 
      title: 'Code Freeze', 
      date: 'Jan 30, 2025', 
      startTime: '06:00 PM', 
      endTime: '', 
      location: 'System-wide', 
      type: 'Deadline',
      description: 'No more code changes allowed for the upcoming release.'
    },
    { 
      id: '8', 
      title: 'Security Audit', 
      date: 'Feb 2, 2025', 
      startTime: '10:00 AM', 
      endTime: '04:00 PM', 
      location: 'IT Office', 
      type: 'Workshop',
      description: 'Annual security assessment and penetration testing.'
    },
    { 
      id: '9', 
      title: 'Product Launch', 
      date: 'Feb 10, 2025', 
      startTime: '10:00 AM', 
      endTime: '11:00 AM', 
      location: 'Main Hall', 
      type: 'Meeting',
      description: 'Official launch event for the new product line.'
    },
    { 
      id: '10', 
      title: 'Valentine\'s Day', 
      date: 'Feb 14, 2025', 
      startTime: 'All Day', 
      endTime: '', 
      location: 'Office Wide', 
      type: 'Other',
      description: 'Small celebration in the breakroom.'
    },
    { 
      id: '11', 
      title: 'Marketing Sync', 
      date: 'Feb 18, 2025', 
      startTime: '03:00 PM', 
      endTime: '04:00 PM', 
      location: 'Conference Room B', 
      type: 'Meeting',
      description: 'Aligning on the Q2 marketing campaign.'
    },
    { 
      id: '12', 
      title: 'API Documentation', 
      date: 'Feb 22, 2025', 
      startTime: '01:00 PM', 
      endTime: '03:00 PM', 
      location: 'Remote', 
      type: 'Workshop',
      description: 'Updating the public API docs.'
    },
    { 
      id: '13', 
      title: 'Sprint Retrospective', 
      date: 'Feb 28, 2025', 
      startTime: '04:00 PM', 
      endTime: '05:00 PM', 
      location: 'Meeting Room 1', 
      type: 'Meeting',
      description: 'Discussing what went well and what can be improved.'
    },
    { 
      id: '14', 
      title: 'Budget Approval', 
      date: 'Mar 5, 2025', 
      startTime: '10:00 AM', 
      endTime: '', 
      location: 'Finance Office', 
      type: 'Deadline',
      description: 'Final deadline for department budget submissions.'
    },
    { 
      id: '15', 
      title: 'Town Hall Meeting', 
      date: 'Mar 12, 2025', 
      startTime: '02:00 PM', 
      endTime: '03:30 PM', 
      location: 'Auditorium', 
      type: 'Meeting',
      description: 'Company-wide update from the CEO.'
    },
    { 
      id: '16', 
      title: 'St. Patrick\'s Day', 
      date: 'Mar 17, 2025', 
      startTime: 'All Day', 
      endTime: '', 
      location: 'Office Wide', 
      type: 'Other',
      description: 'Wear green day!'
    },
    { 
      id: '17', 
      title: 'Client Presentation', 
      date: 'Mar 22, 2025', 
      startTime: '11:00 AM', 
      endTime: '12:00 PM', 
      location: 'Boardroom', 
      type: 'Meeting',
      description: 'Presenting the project proposal to the key client.'
    },
    { 
      id: '18', 
      title: 'Frontend Workshop', 
      date: 'Mar 28, 2025', 
      startTime: '01:00 PM', 
      endTime: '04:00 PM', 
      location: 'Training Room', 
      type: 'Workshop',
      description: 'Learning the latest features of React 19.'
    },
    { 
      id: '19', 
      title: 'Tax Filing Deadline', 
      date: 'Apr 15, 2025', 
      startTime: '05:00 PM', 
      endTime: '', 
      location: 'Finance Office', 
      type: 'Deadline',
      description: 'Final day for corporate tax filings.'
    },
    { 
      id: '20', 
      title: 'Easter Monday', 
      date: 'Apr 21, 2025', 
      startTime: 'All Day', 
      endTime: '', 
      location: 'Office Closed', 
      type: 'Holiday',
      description: 'Public holiday observation.'
    },
    { 
      id: '21', 
      title: 'Earth Day Event', 
      date: 'Apr 22, 2025', 
      startTime: '10:00 AM', 
      endTime: '12:00 PM', 
      location: 'Local Park', 
      type: 'Other',
      description: 'Community cleanup and tree planting.'
    },
    { 
      id: '22', 
      title: 'Sales Training', 
      date: 'Apr 28, 2025', 
      startTime: '09:00 AM', 
      endTime: '01:00 PM', 
      location: 'Conference Room C', 
      type: 'Workshop',
      description: 'New sales techniques and CRM training.'
    },
    { 
      id: '23', 
      title: 'Labor Day', 
      date: 'May 1, 2025', 
      startTime: 'All Day', 
      endTime: '', 
      location: 'Office Closed', 
      type: 'Holiday',
      description: 'International Workers\' Day.'
    },
    { 
      id: '24', 
      title: 'Q2 Strategy Meeting', 
      date: 'Apr 05, 2025', 
      startTime: '10:00 AM', 
      endTime: '12:00 PM', 
      location: 'Board Room', 
      type: 'Meeting',
      description: 'Discussing goals and targets for the second quarter.'
    },
    { 
      id: '25', 
      title: 'Security Audit', 
      date: 'Apr 12, 2025', 
      startTime: '09:00 AM', 
      endTime: '05:00 PM', 
      location: 'Server Room', 
      type: 'Other',
      description: 'Annual infrastructure security assessment.'
    },
    { 
      id: '26', 
      title: 'Team Lunch', 
      date: 'Apr 18, 2025', 
      startTime: '12:30 PM', 
      endTime: '02:00 PM', 
      location: 'Main Cafeteria', 
      type: 'Other',
      description: 'Monthly team bonding lunch.'
    },
    { 
      id: '27', 
      title: 'Client Presentation', 
      date: 'Apr 25, 2025', 
      startTime: '02:00 PM', 
      endTime: '03:30 PM', 
      location: 'Conference Room A', 
      type: 'Meeting',
      description: 'Presenting the new product roadmap to key stakeholders.'
    },
    { 
      id: '28', 
      title: 'System Maintenance', 
      date: 'May 04, 2025', 
      startTime: '11:00 PM', 
      endTime: '03:00 AM', 
      location: 'Remote', 
      type: 'Other',
      description: 'Scheduled database maintenance and updates.'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('All Time');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCustomDateModalOpen, setIsCustomDateModalOpen] = useState(false);
  const [eventTypes, setEventTypes] = useState<string[]>(['Meeting', 'Workshop', 'Holiday', 'Deadline', 'Other']);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [pendingDelete, setPendingDelete] = useState<{ type: string; timer: NodeJS.Timeout } | null>(null);
  const [undoCountdown, setUndoCountdown] = useState(0);
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
    const matchesLocation = locationFilter === 'All' || event.location === locationFilter;
    
    const eventDate = new Date(event.date);
    const matchesStartDate = !startDateFilter || eventDate >= new Date(startDateFilter);
    const matchesEndDate = !endDateFilter || eventDate <= new Date(endDateFilter);

    return matchesSearch && matchesType && matchesLocation && matchesStartDate && matchesEndDate;
  });

  const uniqueLocations = Array.from(new Set(events.map(e => e.location))).sort();

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

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'Meeting': 
        return {
          cardBg: 'bg-[#fcf8ff]',
          leftBar: 'bg-gradient-to-b from-[#8b5cf6] to-[#d8b4fe]',
          badge: 'bg-[#f3e8ff] text-[#8b5cf6]',
          icon: 'text-[#8b5cf6]'
        };
      case 'Deadline': 
        return {
          cardBg: 'bg-[#fff8f9]',
          leftBar: 'bg-gradient-to-b from-[#e11d48] to-[#fda4af]',
          badge: 'bg-[#ffe4e6] text-[#e11d48]',
          icon: 'text-[#e11d48]'
        };
      case 'Holiday': 
        return {
          cardBg: 'bg-[#f8faff]',
          leftBar: 'bg-gradient-to-b from-[#2563eb] to-[#93c5fd]',
          badge: 'bg-[#dbeafe] text-[#2563eb]',
          icon: 'text-[#2563eb]'
        };
      default: 
        return {
          cardBg: 'bg-slate-50',
          leftBar: 'bg-slate-300',
          badge: 'bg-slate-100 text-slate-600',
          icon: 'text-slate-400'
        };
    }
  };

  const handleDeleteType = (typeToDelete: string) => {
    if (pendingDelete) {
      clearTimeout(pendingDelete.timer);
    }

    setUndoCountdown(15);
    const timer = setTimeout(() => {
      setEventTypes(prev => prev.filter(t => t !== typeToDelete));
      setPendingDelete(null);
      setUndoCountdown(0);
    }, 15000);

    setPendingDelete({ type: typeToDelete, timer });

    // Countdown interval
    const interval = setInterval(() => {
      setUndoCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUndoDelete = () => {
    if (pendingDelete) {
      clearTimeout(pendingDelete.timer);
      setPendingDelete(null);
      setUndoCountdown(0);
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
                <div className="flex gap-2">
                  <select 
                    required
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsAddingType(true)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Type
                  </button>
                </div>
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
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        isFilterActive={typeFilter !== 'All' || locationFilter !== 'All'}
        className="border-none shadow-none px-4"
        middleElement={
          <div className="relative">
            <select 
              className="pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none text-sm font-bold text-slate-600 min-w-[140px]"
              value={timeFilter}
              onChange={(e) => {
                const value = e.target.value;
                setTimeFilter(value);
                if (value === 'Custom') {
                  setIsCustomDateModalOpen(true);
                } else if (value === 'All Time') {
                  setStartDateFilter('');
                  setEndDateFilter('');
                } else {
                  const today = new Date();
                  if (value === 'Today') {
                    const dateStr = today.toISOString().split('T')[0];
                    setStartDateFilter(dateStr);
                    setEndDateFilter(dateStr);
                  } else if (value === 'This Month') {
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    setStartDateFilter(firstDay.toISOString().split('T')[0]);
                    setEndDateFilter(lastDay.toISOString().split('T')[0]);
                  }
                }
              }}
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom Period</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        }
        rightElement={
          isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Type</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium text-slate-600"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium text-slate-600"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="All">All Locations</option>
                    {uniqueLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => {
                      setTypeFilter('All');
                      setLocationFilter('All');
                      setStartDateFilter('');
                      setEndDateFilter('');
                      setTimeFilter('All Time');
                    }}
                    className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )
        }
      />

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const style = getEventStyle(event.type);
          return (
            <div 
              key={event.id} 
              className={cn(
                "rounded-[24px] shadow-sm overflow-hidden hover:shadow-md transition-all relative group border border-slate-100",
                style.cardBg
              )}
            >
              {/* Left Bar */}
              <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", style.leftBar)} />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-slate-900 pr-4">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", 
                      style.badge
                    )}>
                      {event.type}
                    </span>
                    <ActionMenu items={getEventActions(event)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <div className="mt-6 pt-6 border-t border-slate-200/50">
                    <p className="text-xs text-slate-400 italic line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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

      <CustomPeriodModal 
        isOpen={isCustomDateModalOpen}
        onClose={() => {
          setIsCustomDateModalOpen(false);
          if (!startDateFilter) setTimeFilter('All Time');
        }}
        onApply={(from, to) => {
          setStartDateFilter(from);
          setEndDateFilter(to);
          setIsCustomDateModalOpen(false);
        }}
        initialFrom={startDateFilter}
        initialTo={endDateFilter}
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
                  <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", getEventStyle(viewingEvent.type).badge)}>
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
                  className="w-full py-3 bg-[#4f39f6] text-white rounded-2xl font-bold hover:bg-[#4332d1] transition-all"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Type Modal */}
      {isAddingType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddingType(false)} />
          <div className="bg-white rounded-[24px] w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Manage Event Types</h3>
              <button onClick={() => setIsAddingType(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Add New Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">New Type Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Seminar"
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                  />
                  <button 
                    onClick={() => {
                      if (newTypeName.trim() && !eventTypes.includes(newTypeName.trim())) {
                        setEventTypes([...eventTypes, newTypeName.trim()]);
                        setNewTypeName('');
                      }
                    }}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Undo Notification */}
              {pendingDelete && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-xs font-bold">
                      {undoCountdown}
                    </div>
                    <p className="text-sm text-rose-700 font-medium">Deleting "{pendingDelete.type}"...</p>
                  </div>
                  <button 
                    onClick={handleUndoDelete}
                    className="px-3 py-1.5 bg-white text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 border border-rose-200 transition-all"
                  >
                    Undo
                  </button>
                </div>
              )}

              {/* Existing Types List */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Existing Types</label>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {eventTypes.map(type => (
                    <div key={type} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-slate-200 transition-all">
                      <span className="text-sm font-medium text-slate-700">{type}</span>
                      <button 
                        onClick={() => handleDeleteType(type)}
                        disabled={pendingDelete?.type === type}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          pendingDelete?.type === type 
                            ? "text-slate-300 cursor-not-allowed" 
                            : "text-slate-400 hover:bg-rose-50 hover:text-rose-600 opacity-0 group-hover:opacity-100"
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setIsAddingType(false)}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
