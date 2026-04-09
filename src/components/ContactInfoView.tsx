import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Save,
  Smartphone
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ContactInfoViewProps {
  employee: any;
  onBack: () => void;
}

export default function ContactInfoView({ employee, onBack }: ContactInfoViewProps) {
  const [formData, setFormData] = useState({
    mobile: '01701645144',
    telephone: '',
    personalEmail: '',
    presentAddress: {
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    permanentAddress: {
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: ''
    },
    sameAsPresent: false
  });

  const handleSameAsPresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsPresent: checked,
      permanentAddress: checked ? { ...prev.presentAddress } : prev.permanentAddress
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Employees</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>Employee Profile</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-slate-900 cursor-pointer" onClick={onBack}>{employee.name}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-600 font-bold">Contact info</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {employee.name} (EM000{employee.id})
        </h2>
      </div>

      {/* Contact Details Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mobile <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Telephone</label>
              <input 
                type="text" 
                placeholder="Enter Telephone Number"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Personal Email</label>
              <input 
                type="email" 
                placeholder="Enter Email Address"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.personalEmail}
                onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Present Address Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Present Address</h3>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Address</label>
            <textarea 
              placeholder="Enter Address"
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              value={formData.presentAddress.address}
              onChange={(e) => setFormData({ 
                ...formData, 
                presentAddress: { ...formData.presentAddress, address: e.target.value } 
              })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Country</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.presentAddress.country}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  presentAddress: { ...formData.presentAddress, country: e.target.value } 
                })}
              >
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">State</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.presentAddress.state}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  presentAddress: { ...formData.presentAddress, state: e.target.value } 
                })}
              >
                <option value="">Select State</option>
                <option value="Dhaka">Dhaka</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">City</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.presentAddress.city}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  presentAddress: { ...formData.presentAddress, city: e.target.value } 
                })}
              >
                <option value="">Select City</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Westminster">Westminster</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Zip Code</label>
              <input 
                type="text" 
                placeholder="Enter Zip Code"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.presentAddress.zipCode}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  presentAddress: { ...formData.presentAddress, zipCode: e.target.value } 
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Permanent Address Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Permanent Address</h3>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="sameAsPresent"
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              checked={formData.sameAsPresent}
              onChange={handleSameAsPresentChange}
            />
            <label htmlFor="sameAsPresent" className="text-sm font-medium text-slate-600">Same as present address</label>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Address</label>
            <textarea 
              placeholder="Enter Address"
              rows={3}
              disabled={formData.sameAsPresent}
              className={cn(
                "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none",
                formData.sameAsPresent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-slate-50"
              )}
              value={formData.permanentAddress.address}
              onChange={(e) => setFormData({ 
                ...formData, 
                permanentAddress: { ...formData.permanentAddress, address: e.target.value } 
              })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Country</label>
              <select 
                disabled={formData.sameAsPresent}
                className={cn(
                  "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                  formData.sameAsPresent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-slate-50"
                )}
                value={formData.permanentAddress.country}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  permanentAddress: { ...formData.permanentAddress, country: e.target.value } 
                })}
              >
                <option value="">Select Country</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">State</label>
              <select 
                disabled={formData.sameAsPresent}
                className={cn(
                  "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                  formData.sameAsPresent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-slate-50"
                )}
                value={formData.permanentAddress.state}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  permanentAddress: { ...formData.permanentAddress, state: e.target.value } 
                })}
              >
                <option value="">Select State</option>
                <option value="Dhaka">Dhaka</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">City</label>
              <select 
                disabled={formData.sameAsPresent}
                className={cn(
                  "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                  formData.sameAsPresent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-slate-50"
                )}
                value={formData.permanentAddress.city}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  permanentAddress: { ...formData.permanentAddress, city: e.target.value } 
                })}
              >
                <option value="">Select City</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Westminster">Westminster</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Zip Code</label>
              <input 
                type="text" 
                placeholder="Enter Zip Code"
                disabled={formData.sameAsPresent}
                className={cn(
                  "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                  formData.sameAsPresent ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-slate-50"
                )}
                value={formData.permanentAddress.zipCode}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  permanentAddress: { ...formData.permanentAddress, zipCode: e.target.value } 
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
          <Save className="w-4 h-4" />
          Save info
        </button>
        <button 
          onClick={onBack}
          className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
