/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Departments from './components/Departments';
import Attendance from './components/Attendance';
import Leave from './components/Leave';
import Payroll from './components/Payroll';
import Performance from './components/Performance';
import AddEmployee from './components/AddEmployee';
import Roles from './components/Roles';
import Settings from './components/Settings';
import EmployeeProfile from './components/EmployeeProfile';
import EventsScheduleView from './components/EventsScheduleView';
import NotificationSidebar from './components/NotificationSidebar';
import LoginPage from './components/LoginPage';
import { 
  Bell, 
  Search, 
  User,
  Menu,
  X,
  LogOut,
  Settings as SettingsIcon,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'employee'>('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogin = (role: 'admin' | 'employee') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    const employeeData = {
      id: userRole === 'admin' ? 'AD001' : 'EM001',
      name: userRole === 'admin' ? 'Admin User' : 'Employee User',
      role: userRole === 'admin' ? 'HR Director' : 'Product Designer',
      department: userRole === 'admin' ? 'Human Resources' : 'Design',
      email: userRole === 'admin' ? 'admin@siegecode.com' : 'employee@siegecode.com',
      avatar: `https://picsum.photos/seed/${userRole}/200/200`,
      joinDate: 'Jan 15, 2022',
      status: 'Active'
    };

    switch (activeTab) {
      case 'dashboard': 
        if (userRole === 'employee') {
          return <EmployeeProfile employee={employeeData} onBack={() => setActiveTab('dashboard')} isDashboard={true} />;
        }
        return <Dashboard onNavigate={setActiveTab} />;
      case 'employees': return (
        <Employees 
          onAddEmployee={() => setActiveTab('add-employee')} 
          userRole={userRole}
        />
      );
      case 'roles': return <Roles />;
      case 'add-employee': return (
        <AddEmployee 
          onBack={() => setActiveTab('employees')} 
          onSave={(data) => {
            console.log('Saving employee:', data);
            setActiveTab('employees');
          }} 
        />
      );
      case 'departments': return <Departments />;
      case 'attendance': return <Attendance />;
      case 'leave': return <Leave />;
      case 'payroll': return <Payroll />;
      case 'performance': return <Performance />;
      case 'settings': return <Settings />;
      case 'events-schedule': return <EventsScheduleView onBack={() => setActiveTab('dashboard')} />;
      case 'profile': return (
        <EmployeeProfile 
          employee={employeeData} 
          onBack={() => setActiveTab('dashboard')} 
          isDashboard={userRole === 'employee'}
        />
      );
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search anything..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold">
                  {userRole === 'admin' ? 'AD' : 'EM'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {userRole === 'admin' ? 'Admin User' : 'Employee User'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {userRole === 'admin' ? 'HR Director' : 'Product Designer'}
                  </p>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isProfileOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 overflow-hidden"
                    >
                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setActiveTab('profile');
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          View Profile
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('settings');
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                        >
                          <SettingsIcon className="w-4 h-4" />
                          Account Settings
                        </button>
                      </div>
                      <div className="border-t border-slate-100 p-2">
                        <button 
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="p-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
          <p>© 2026 Siegecode HRM. All rights reserved. Built for modern HR teams.</p>
        </footer>

        <NotificationSidebar 
          isOpen={isNotificationsOpen} 
          onClose={() => setIsNotificationsOpen(false)} 
        />
      </div>
    </div>
  );
}

