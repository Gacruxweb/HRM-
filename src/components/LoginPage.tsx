import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, User, ShieldCheck, UserCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'employee') => void;
}

const LoginIllustration = () => (
  <div className="relative w-full max-w-lg aspect-square">
    <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {/* Background Decorative Circles */}
      <circle cx="400" cy="400" r="380" fill="white" fillOpacity="0.03" />
      <circle cx="400" cy="400" r="300" fill="white" fillOpacity="0.05" />

      {/* Floating Gears */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ originX: "650px", originY: "250px" }}
      >
        <path d="M685 250L678.5 238.7L685 227.5L673.7 221L667.2 209.7L655.9 216.2L644.7 209.7L638.2 221L626.9 227.5L633.4 238.7L626.9 250L633.4 261.3L626.9 272.5L638.2 279L644.7 290.3L655.9 283.8L667.2 290.3L673.7 279L685 272.5L678.5 261.3L685 250Z" fill="white" fillOpacity="0.2" />
      </motion.g>
      
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ originX: "720px", originY: "380px" }}
      >
        <path d="M740 380L735.7 372.5L740 365L732.5 360.7L728.2 353.2L720.7 357.5L713.2 353.2L708.9 360.7L701.4 365L705.7 372.5L701.4 380L705.7 387.5L701.4 395L708.9 399.3L713.2 406.8L720.7 402.5L728.2 406.8L732.5 399.3L740 395L735.7 387.5L740 380Z" fill="white" fillOpacity="0.15" />
      </motion.g>

      {/* Floating Credit Card */}
      <motion.g
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="250" y="180" width="180" height="110" rx="12" fill="#1E40AF" fillOpacity="0.8" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="270" y="200" width="40" height="30" rx="6" fill="#F97316" />
        <rect x="270" y="250" width="100" height="8" rx="4" fill="white" fillOpacity="0.3" />
      </motion.g>

      {/* Smartphone */}
      <rect x="330" y="240" width="220" height="440" rx="24" fill="#0F172A" />
      <rect x="340" y="250" width="200" height="420" rx="18" fill="#2563EB" />
      
      {/* Phone Screen Content */}
      <circle cx="440" cy="340" r="35" fill="white" />
      <path d="M440 325C445.523 325 450 329.477 450 335C450 340.523 445.523 345 440 345C434.477 345 430 340.523 430 335C430 329.477 434.477 325 440 325ZM440 348C448.284 348 455 352.477 455 358V360H425V358C425 352.477 431.716 348 440 348Z" fill="#2563EB" />
      
      <rect x="370" y="395" width="140" height="18" rx="9" fill="white" fillOpacity="0.9" />
      <rect x="370" y="425" width="140" height="18" rx="9" fill="white" fillOpacity="0.9" />
      <rect x="410" y="460" width="60" height="16" rx="8" fill="#F97316" />

      {/* Lock Icon on Screen */}
      <g transform="translate(400, 520)">
        <rect x="0" y="30" width="80" height="65" rx="8" fill="white" />
        <path d="M15 30V20C15 8.9543 23.9543 0 35 0C46.0457 0 55 8.9543 55 20V30" stroke="white" strokeWidth="10" fill="none" />
        <circle cx="40" cy="62" r="6" fill="#2563EB" />
        <rect x="37" y="62" width="6" height="12" fill="#2563EB" />
      </g>

      {/* Character (Woman) */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Legs */}
        <path d="M220 680L210 500L235 500L245 680H220Z" fill="#0F172A" />
        <path d="M275 680L285 500L260 500L250 680H275Z" fill="#0F172A" />
        {/* Shoes */}
        <rect x="210" y="680" width="30" height="10" rx="5" fill="white" />
        <rect x="255" y="680" width="30" height="10" rx="5" fill="white" />
        {/* Body */}
        <path d="M210 500C210 460 230 420 250 420C270 420 290 460 290 500H210Z" fill="white" />
        {/* Arms */}
        <path d="M210 460L180 540L195 550L220 470" fill="white" />
        <path d="M290 460L320 420L335 430L300 470" fill="white" />
        {/* Head */}
        <circle cx="250" cy="390" r="30" fill="#FDBA74" />
        <path d="M220 390C220 360 280 360 280 390C280 420 220 420 220 390Z" fill="#0F172A" /> {/* Hair */}
        <rect x="220" y="370" width="60" height="30" rx="15" fill="#0F172A" /> {/* Hair top */}
      </motion.g>

      {/* Shield */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        transform="translate(500, 480)"
      >
        <path d="M0 15C0 15 0 0 45 0C90 0 90 15 90 15V80C90 110 45 140 45 140C45 140 0 110 0 80V15Z" fill="#3B82F6" stroke="white" strokeWidth="4" />
        <path d="M25 70L40 85L70 55" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      {/* Clouds */}
      <motion.g
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M150 300C150 280 170 270 185 270C200 270 215 285 215 300H150Z" fill="white" fillOpacity="0.2" />
        <path d="M600 150C600 135 615 125 625 125C635 125 645 135 645 150H600Z" fill="white" fillOpacity="0.2" />
      </motion.g>
    </svg>
  </div>
);

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
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0052FF] relative items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full flex flex-col items-center"
        >
          <LoginIllustration />
          <div className="mt-8 text-white text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Secure HR Management</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Your data is protected with enterprise-grade security. 
              Sign in to manage your workforce efficiently.
            </p>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="max-w-md w-full space-y-8">
          {/* Logo & Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-[#0052FF] rounded-2xl shadow-xl shadow-blue-100"
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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[#0052FF] transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#0052FF] focus:bg-white outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-bold text-[#0052FF] hover:text-blue-700">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-[#0052FF] transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#0052FF] focus:bg-white outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#0052FF] text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group"
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
                    role === 'admin' ? "bg-blue-50 border-blue-200 text-[#0052FF]" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-xs font-bold">Admin User</span>
                </button>
                <button 
                  onClick={() => fillCredentials('employee')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                    role === 'employee' ? "bg-blue-50 border-blue-200 text-[#0052FF]" : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
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
            Don't have an account? <button className="font-bold text-[#0052FF] hover:text-blue-700">Contact HR</button>
          </p>
        </div>
      </div>
    </div>
  );
}
