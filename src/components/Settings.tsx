import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  Palette, 
  Globe, 
  Lock, 
  Mail, 
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Layout,
  Type
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);
  const [theme, setTheme] = useState('light');
  const [density, setDensity] = useState('comfortable');

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const sections = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-slate-500 mt-1">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                  activeSection === section.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <section.icon className="w-5 h-5" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              {activeSection === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">User Profile</h3>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative group">
                        <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 font-bold text-2xl border-4 border-white shadow-lg overflow-hidden">
                          AD
                        </div>
                        <button className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold rounded-3xl">
                          Change
                        </button>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Admin User</h4>
                        <p className="text-sm text-slate-500">HR Director • Siegecode HRM HQ</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue="Admin User"
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue="admin@siegecode.com"
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                        <input 
                          type="tel" 
                          defaultValue="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
                        <input 
                          type="text" 
                          defaultValue="HR Director"
                          className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Appearance Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-4 block">Theme Preference</label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { id: 'light', label: 'Light', icon: Sun },
                            { id: 'dark', label: 'Dark', icon: Moon },
                            { id: 'system', label: 'System', icon: Monitor },
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTheme(t.id)}
                              className={cn(
                                "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                                theme === t.id 
                                  ? "border-indigo-600 bg-indigo-50 text-indigo-600" 
                                  : "border-slate-100 bg-slate-50 text-slate-500 hover:border-indigo-200"
                              )}
                            >
                              <t.icon className="w-6 h-6" />
                              <span className="text-xs font-bold uppercase tracking-wider">{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-slate-700 mb-4 block">Interface Density</label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: 'comfortable', label: 'Comfortable', desc: 'More spacing, easier to read', icon: Layout },
                            { id: 'compact', label: 'Compact', desc: 'More data on screen', icon: Type },
                          ].map((d) => (
                            <button
                              key={d.id}
                              onClick={() => setDensity(d.id)}
                              className={cn(
                                "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                                density === d.id 
                                  ? "border-indigo-600 bg-indigo-50" 
                                  : "border-slate-100 bg-slate-50 hover:border-indigo-200"
                              )}
                            >
                              <div className={cn(
                                "p-2 rounded-lg",
                                density === d.id ? "bg-indigo-600 text-white" : "bg-white text-slate-400"
                              )}>
                                <d.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className={cn("text-sm font-bold", density === d.id ? "text-indigo-900" : "text-slate-700")}>{d.label}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{d.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Email Notifications', desc: 'Receive daily summaries and important alerts via email.' },
                        { title: 'Push Notifications', desc: 'Get real-time updates in your browser.' },
                        { title: 'Leave Requests', desc: 'Notify when a new leave request is submitted.' },
                        { title: 'Payroll Alerts', desc: 'Alert when payroll processing is complete.' },
                      ].map((n, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-500">{n.desc}</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                            <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Security Settings</h3>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                            <input 
                              type="password" 
                              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                            <input 
                              type="password" 
                              className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {isSaved && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Changes saved successfully!
                  </motion.div>
                )}
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all">
                  Discard
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
