import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Calendar, UserPlus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'request';
  read: boolean;
  icon: React.ReactNode;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Leave Request Approved',
    message: 'Your annual leave request for April 15-20 has been approved by Sarah Chen.',
    time: '2 hours ago',
    type: 'success',
    read: false,
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
  },
  {
    id: '2',
    title: 'New Team Member',
    message: 'Michael Scott has joined the Sales department as Regional Manager.',
    time: '5 hours ago',
    type: 'info',
    read: false,
    icon: <UserPlus className="w-5 h-5 text-indigo-500" />
  },
  {
    id: '3',
    title: 'Upcoming Event',
    message: 'Quarterly Team Building is scheduled for next Friday at 2:00 PM.',
    time: '1 day ago',
    type: 'request',
    read: true,
    icon: <Calendar className="w-5 h-5 text-amber-500" />
  },
  {
    id: '4',
    title: 'Attendance Reminder',
    message: 'Please remember to clock out for your lunch break.',
    time: '2 days ago',
    type: 'warning',
    read: true,
    icon: <Clock className="w-5 h-5 text-rose-500" />
  },
  {
    id: '5',
    title: 'Policy Update',
    message: 'The Remote Work Policy has been updated. Please review the changes.',
    time: '3 days ago',
    type: 'info',
    read: true,
    icon: <AlertCircle className="w-5 h-5 text-slate-500" />
  }
];

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({ isOpen, onClose }: NotificationSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
                  <p className="text-xs text-slate-500 font-medium">You have 2 unread messages</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Mark all as read
              </button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-600 transition-colors">
                Clear all
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {MOCK_NOTIFICATIONS.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer group relative",
                    notification.read 
                      ? "bg-white border-slate-100 hover:border-slate-200" 
                      : "bg-indigo-50/30 border-indigo-100 hover:border-indigo-200 shadow-sm"
                  )}
                >
                  {!notification.read && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-indigo-600 rounded-full" />
                  )}
                  <div className="flex gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      notification.read ? "bg-slate-50" : "bg-white shadow-sm"
                    )}>
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/30">
              <button 
                className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                onClick={onClose}
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
