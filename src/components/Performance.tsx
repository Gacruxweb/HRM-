import React, { useState } from 'react';
import { 
  Star, 
  TrendingUp, 
  TrendingDown,
  Target, 
  MessageSquare, 
  Plus,
  Search,
  ChevronRight,
  Filter,
  User,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  ShoppingCart,
  Percent,
  BarChart3,
  Building2,
  Settings2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { MOCK_REVIEWS, MOCK_BRANCH_PERFORMANCE } from '../mockData';
import { cn } from '../lib/utils';
import ActionMenu, { ActionItem } from './ActionMenu';
import ConfirmationModal, { ModalVariant } from './ConfirmationModal';

interface ManagementAssessment {
  id: string;
  title: string;
  date: string;
  status: 'Draft' | 'In Progress' | 'Published' | 'Archived';
  type: string;
  description: string;
}

export default function Performance() {
  const [activeTab, setActiveTab] = useState<'employees' | 'branches' | 'management'>('employees');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('grid');

  // Management Assessments State
  const [managementAssessments, setManagementAssessments] = useState<ManagementAssessment[]>([
    { id: '1', title: 'Q1 Regional Sales Audit', date: '2024-03-15', status: 'Published', type: 'Audit', description: 'Comprehensive audit of sales performance across all regional branches for Q1.' },
    { id: '2', title: 'Annual KPI Benchmark 2024', date: '2024-01-10', status: 'Draft', type: 'Benchmark', description: 'Setting the standard KPIs for the upcoming fiscal year based on market trends.' },
    { id: '3', title: 'Marketing Agent Commission Review', date: '2024-03-20', status: 'In Progress', type: 'Review', description: 'Reviewing commission structures and payouts for marketing agents.' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentAssessment, setCurrentAssessment] = useState<Partial<ManagementAssessment>>({});
  
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    id: string;
  }>({ isOpen: false, id: '' });

  const handleAddAssessment = () => {
    setCurrentAssessment({
      title: '',
      type: 'Audit',
      status: 'Draft',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditAssessment = (assessment: ManagementAssessment) => {
    setCurrentAssessment(assessment);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewAssessment = (assessment: ManagementAssessment) => {
    setCurrentAssessment(assessment);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteAssessment = (id: string) => {
    setConfirmModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    setManagementAssessments(prev => prev.filter(a => a.id !== confirmModal.id));
    setConfirmModal({ isOpen: false, id: '' });
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newAssessment: ManagementAssessment = {
        ...currentAssessment as ManagementAssessment,
        id: (managementAssessments.length + 1).toString(),
      };
      setManagementAssessments([...managementAssessments, newAssessment]);
    } else {
      setManagementAssessments(prev => prev.map(a => a.id === currentAssessment.id ? currentAssessment as ManagementAssessment : a));
    }
    setIsModalOpen(false);
  };

  const getManagementActions = (assessment: ManagementAssessment): ActionItem[] => [
    { label: 'View Details', icon: Eye, onClick: () => handleViewAssessment(assessment) },
    { label: 'Edit Assessment', icon: Edit, onClick: () => handleEditAssessment(assessment) },
    { label: 'Delete Assessment', icon: Trash2, onClick: () => handleDeleteAssessment(assessment.id), variant: 'danger' },
  ];

  const getPerformanceActions = (review: any): ActionItem[] => [
    { label: 'View Full Report', icon: Eye, onClick: () => console.log('View', review.id) },
    { label: 'Edit Review', icon: Edit, onClick: () => console.log('Edit', review.id) },
    { label: 'Calculate Commission', icon: DollarSign, onClick: () => console.log('Commission', review.commission) },
    { label: 'Delete Review', icon: Trash2, onClick: () => console.log('Delete', review.id), variant: 'danger' },
  ];

  const filteredReviews = MOCK_REVIEWS.filter(review => {
    const matchesSearch = review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'All' || Math.floor(review.rating).toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const tabs = [
    { id: 'employees', label: 'Employee Performance', icon: User },
    { id: 'branches', label: 'Branch Performance', icon: Building2 },
    { id: 'management', label: 'Central Management', icon: Settings2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Redesign</h2>
          <p className="text-slate-500 mt-1">Super Shop KPI tracking and branch-level analytics.</p>
        </div>
        <button 
          onClick={activeTab === 'management' ? handleAddAssessment : () => console.log('New Assessment')}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Assessment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2",
              activeTab === tab.id 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'employees' && (
        <div className="space-y-8">
          {/* Employee KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'AVG. SPE', value: '$10,500', subValue: 'Out of $12k', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'AVG. ATV', value: '$41.8', subValue: 'Excellent', icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'AVG. CSAT', value: '4.6/5', subValue: 'Outstanding', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'TOTAL COMMISSION', value: '$1,050', subValue: 'This Month', icon: Percent, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className={cn("text-xs font-bold", stat.color)}>{stat.subValue}</p>
                </div>
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            ))}
          </div>

          {/* Employee Performance List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Marketing Agents Performance</h3>
              <div className="flex gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 flex">
                  <button 
                    onClick={() => setDisplayMode('grid')}
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      displayMode === 'grid' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button 
                    onClick={() => setDisplayMode('table')}
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      displayMode === 'table' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  </button>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search agents..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {displayMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
                            {review.employeeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{review.employeeName}</h4>
                            <p className="text-sm text-slate-500">Last Assessment: {review.date}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commission</p>
                              <p className="text-lg font-bold text-emerald-600">${review.commission}</p>
                            </div>
                            <ActionMenu items={getPerformanceActions(review)} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">SPE</p>
                            <p className="text-sm font-bold text-slate-900">${review.spe}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ATV</p>
                            <p className="text-sm font-bold text-slate-900">${review.atv}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CSAT</p>
                            <p className="text-sm font-bold text-slate-900">{review.csat}/5</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <p className="text-sm font-bold text-slate-900">{review.rating}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-500">Sales Target Progress</span>
                            <span className="text-indigo-600">${review.actualSales} / ${review.salesTarget}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((review.actualSales! / review.salesTarget!) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Agent</th>
                      <th className="px-6 py-4 font-semibold text-center">SPE</th>
                      <th className="px-6 py-4 font-semibold text-center">ATV</th>
                      <th className="px-6 py-4 font-semibold text-center">CSAT</th>
                      <th className="px-6 py-4 font-semibold text-center">Rating</th>
                      <th className="px-6 py-4 font-semibold text-right">Commission</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReviews.map((review) => (
                      <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{review.employeeName}</p>
                          <p className="text-xs text-slate-500">{review.date}</p>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-slate-900">${review.spe}</td>
                        <td className="px-6 py-4 text-center font-bold text-slate-900">${review.atv}</td>
                        <td className="px-6 py-4 text-center font-bold text-slate-900">{review.csat}/5</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="font-bold text-slate-900">{review.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-600">${review.commission}</td>
                        <td className="px-6 py-4 text-right">
                          <ActionMenu items={getPerformanceActions(review)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'branches' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'AVG. SHRINKAGE', value: '1.65%', subValue: 'Target: <1.5%', icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'AVG. TURNOVER', value: '10.45%', subValue: 'Industry Avg: 12%', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'NETWORK CSAT', value: '4.45/5', subValue: 'Excellent', icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className={cn("text-xs font-bold", stat.color)}>{stat.subValue}</p>
                </div>
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {MOCK_BRANCH_PERFORMANCE.map((branch) => (
              <div key={branch.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-indigo-600">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{branch.branchName}</h4>
                      <p className="text-sm text-slate-500">Performance Report • {branch.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-200">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="space-y-6">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Metrics</h5>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-sm font-bold text-slate-600">Inventory Shrinkage</span>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-lg font-bold", branch.inventoryShrinkage > 1.5 ? "text-rose-600" : "text-emerald-600")}>
                            {branch.inventoryShrinkage}%
                          </span>
                          {branch.inventoryShrinkage > 1.5 ? <ArrowUpRight className="w-4 h-4 text-rose-500" /> : <ArrowDownRight className="w-4 h-4 text-emerald-500" />}
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-sm font-bold text-slate-600">Turnover Rate</span>
                        <span className="text-lg font-bold text-slate-900">{branch.turnoverRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-sm font-bold text-slate-600">Branch CSAT</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-lg font-bold text-slate-900">{branch.avgCsat}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Qualitative Behavioral Assessment
                      </h5>
                      <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                        <p className="text-slate-700 leading-relaxed italic">"{branch.behavioralAssessment}"</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Branch Goal Setting
                      </h5>
                      <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                        <p className="text-slate-700 leading-relaxed font-medium">{branch.goalSetting}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'management' && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Central Management Console</h3>
                <p className="text-slate-500 mt-1">Manage KPIs, benchmarks, and regional assessments.</p>
              </div>
              <button 
                onClick={handleAddAssessment}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">KPI Definitions</h4>
                <div className="space-y-3">
                  {[
                    { name: 'SPE', full: 'Sales Per Employee', desc: 'Total sales divided by active staff count.' },
                    { name: 'ATV', full: 'Average Transaction Value', desc: 'Total revenue divided by number of transactions.' },
                    { name: 'Shrinkage', full: 'Inventory Shrinkage', desc: 'Loss of products due to theft, damage, or errors.' },
                    { name: 'CSAT', full: 'Customer Satisfaction', desc: 'Average score from customer feedback surveys.' },
                  ].map((kpi) => (
                    <div key={kpi.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-indigo-600">{kpi.name}</span>
                        <button className="text-slate-400 hover:text-indigo-600"><Settings2 className="w-4 h-4" /></button>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{kpi.full}</p>
                      <p className="text-xs text-slate-500 mt-1">{kpi.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Management Assessments</h4>
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Assessment Title</th>
                          <th className="px-6 py-4 font-semibold">Type</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                          <th className="px-6 py-4 font-semibold">Date</th>
                          <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {managementAssessments.map((assessment) => (
                          <tr key={assessment.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-slate-900">{assessment.title}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                                {assessment.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                assessment.status === 'Published' ? "bg-emerald-100 text-emerald-700" :
                                assessment.status === 'Draft' ? "bg-slate-100 text-slate-600" :
                                assessment.status === 'In Progress' ? "bg-amber-100 text-amber-700" :
                                "bg-rose-100 text-rose-700"
                              )}>
                                {assessment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{assessment.date}</td>
                            <td className="px-6 py-4 text-right">
                              <ActionMenu items={getManagementActions(assessment)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Benchmarking & Tools</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-6 bg-indigo-600 text-white rounded-3xl shadow-lg shadow-indigo-100 flex items-center justify-between group hover:bg-indigo-700 transition-all">
                      <div className="text-left">
                        <p className="font-bold text-lg">Analyze Network Data</p>
                        <p className="text-indigo-100 text-sm">Benchmark branch performance.</p>
                      </div>
                      <BarChart3 className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-between group hover:border-indigo-200 transition-all">
                      <div className="text-left">
                        <p className="font-bold text-lg text-slate-900">Training Modules</p>
                        <p className="text-slate-500 text-sm">Resources for managers.</p>
                      </div>
                      <Plus className="w-8 h-8 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">
                {modalMode === 'add' ? 'New Assessment' : modalMode === 'edit' ? 'Edit Assessment' : 'Assessment Details'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSaveAssessment} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</label>
                <input 
                  type="text" 
                  required
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-60"
                  value={currentAssessment.title}
                  onChange={(e) => setCurrentAssessment({ ...currentAssessment, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</label>
                  <select 
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-60"
                    value={currentAssessment.type}
                    onChange={(e) => setCurrentAssessment({ ...currentAssessment, type: e.target.value })}
                  >
                    <option value="Audit">Audit</option>
                    <option value="Benchmark">Benchmark</option>
                    <option value="Review">Review</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</label>
                  <select 
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-60"
                    value={currentAssessment.status}
                    onChange={(e) => setCurrentAssessment({ ...currentAssessment, status: e.target.value as any })}
                  >
                    <option value="Draft">Draft</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={3}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none disabled:opacity-60"
                  value={currentAssessment.description}
                  onChange={(e) => setCurrentAssessment({ ...currentAssessment, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {modalMode === 'view' ? 'Close' : 'Cancel'}
                </button>
                {modalMode !== 'view' && (
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    {modalMode === 'add' ? 'Create Assessment' : 'Save Changes'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: '' })}
        onConfirm={confirmDelete}
        title="Delete Assessment"
        message="Are you sure you want to delete this assessment? This action cannot be undone."
        variant="danger"
      />
    </div>
  );
}
