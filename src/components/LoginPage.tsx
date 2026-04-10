import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, User, ShieldCheck, UserCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'employee') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'employee'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo purposes
    if (email && password) {
      onLogin(role);
    }
  };

  const fillCredentials = (type: 'admin' | 'employee') => {
    if (type === 'admin') {
      setEmail('admin@siegecode.com');
      setPassword('admin123');
      setRole('admin');
    } else {
      setEmail('employee@siegecode.com');
      setPassword('employee123');
      setRole('employee');
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans overflow-hidden">
      {/* Left Side: Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800 opacity-90" />
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg"
        >
          <img 
            src="https://storage.googleapis.com/firebasestorage.googleapis.com/v0/b/ais-dev-3tpv4mxbvcr6czwqs5bmwu.appspot.com/o/user_uploads%2F661674271952%2F661674271952_1744323728000_login-illustration.png?alt=media" 
            alt="Login Illustration" 
            className="w-full h-auto rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="mt-12 text-white">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Streamline Your HR Operations</h1>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Manage employees, payroll, and performance all in one secure place. 
              Efficiency meets simplicity.
            </p>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="max-w-md w-full space-y-8">
          {/* Logo & Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100"
            >
              <ShieldCheck className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold text-slate-900 tracking-tight"
              >
                Welcome Back
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-slate-500 font-medium"
              >
                Please enter your details to sign in
              </motion.p>
            </div>
          </div>

          {/* Login Form */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Quick Access Buttons */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Access Demo</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => fillCredentials('admin')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                    role === 'admin' ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-xs font-bold">Admin User</span>
                </button>
                <button 
                  onClick={() => fillCredentials('employee')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                    role === 'employee' ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <UserCircle className="w-6 h-6" />
                  <span className="text-xs font-bold">Employee</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="text-center lg:text-left text-sm text-slate-500">
            Don't have an account? <button className="font-bold text-indigo-600 hover:text-indigo-700">Contact HR</button>
          </p>
        </div>
      </div>
    </div>
  );
}
