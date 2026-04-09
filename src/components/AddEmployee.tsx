import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Shield,
  ArrowLeft,
  Upload,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface AddEmployeeProps {
  onBack: () => void;
  onSave: (employee: any) => void;
  employee?: any;
}

export default function AddEmployee({ onBack, onSave, employee }: AddEmployeeProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: employee?.name?.split(' ')[0] || '',
    lastName: employee?.name?.split(' ')[1] || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    role: employee?.role || '',
    salary: employee?.salary || '85000',
    joiningDate: employee?.joinDate || '',
    status: employee?.status || 'Active',
    address: employee?.address || '',
    city: employee?.city || '',
    country: employee?.country || '',
    emergencyContact: employee?.emergencyContact || '',
    emergencyPhone: employee?.emergencyPhone || '',
    reportingManager: employee?.reportingManager || ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      onSave(formData);
    }, 1500);
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Job Details', icon: Briefcase },
    { id: 3, title: 'Contact & Address', icon: MapPin },
    { id: 4, title: 'Management', icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <p className="text-slate-500 mt-1">
              {employee ? `Update details for ${employee.name}` : 'Fill in the details to onboard a new team member.'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                step >= s.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-400'
              }`}>
                <s.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                step >= s.id ? 'text-indigo-600' : 'text-slate-400'
              }`}>{s.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-slate-100 mx-4 relative">
                <div 
                  className="absolute inset-0 bg-indigo-600 transition-all duration-500" 
                  style={{ width: step > s.id ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
        >
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-4">
                <div className="relative group">
                  <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center text-slate-400 group-hover:border-indigo-400 group-hover:bg-indigo-50 transition-all cursor-pointer overflow-hidden">
                    <Upload className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold uppercase">Upload Photo</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Department</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select 
                    name="department"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Role / Designation</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="role"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Senior Developer"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Annual Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="number" 
                    name="salary"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="85000"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Joining Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="date" 
                    name="joiningDate"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <textarea 
                    name="address"
                    rows={3}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder="123 Business Ave, Suite 100"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="city"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. San Francisco"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Country</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="country"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. USA"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Emergency Contact Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="emergencyContact"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Emergency Contact Name"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Emergency Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    name="emergencyPhone"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Emergency Phone Number"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex gap-4 items-start">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-indigo-900 font-bold">Management Assignment</h4>
                  <p className="text-indigo-700 text-sm mt-1">Assign a reporting manager to oversee this employee's performance and approvals.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Reporting Manager</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select 
                    name="reportingManager"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                    value={formData.reportingManager}
                    onChange={handleChange}
                  >
                    <option value="">Select Manager</option>
                    <option value="Sarah Johnson">Sarah Johnson (HR Director)</option>
                    <option value="Michael Chen">Michael Chen (Engineering Lead)</option>
                    <option value="Emily Rodriguez">Emily Rodriguez (Design Lead)</option>
                    <option value="David Kim">David Kim (Sales Manager)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Review Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                    <p className="text-sm font-bold text-slate-700">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Role & Dept</p>
                    <p className="text-sm font-bold text-slate-700">{formData.role} - {formData.department}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <button
            type="button"
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1 || isSaved}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              step === 1 || isSaved ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Previous Step
          </button>
          
          <div className="flex items-center gap-4">
            {isSaved && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                Saved Successfully!
              </motion.div>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(prev => Math.min(4, prev + 1))}
                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSaved}
                className={cn(
                  "px-8 py-2.5 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2",
                  isSaved ? "bg-emerald-500 shadow-emerald-100" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100"
                )}
              >
                {isSaved ? 'Saved' : 'Save Employee'}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
