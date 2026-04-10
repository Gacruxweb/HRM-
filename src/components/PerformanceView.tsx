import React from 'react';
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  Target, 
  Award, 
  BarChart3, 
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PerformanceViewProps {
  employee: any;
  onBack: () => void;
}

export default function PerformanceView({ employee, onBack }: PerformanceViewProps) {
  const kpis = [
    { label: 'Sales Target', value: '92%', target: '90%', status: 'Exceeded', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Customer CSAT', value: '4.8/5', target: '4.5/5', status: 'Excellent', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Attendance', value: '98%', target: '95%', status: 'On Track', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Task Completion', value: '85%', target: '80%', status: 'Good', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const reviews = [
    { id: '1', period: 'Q1 2024', rating: 4.8, reviewer: 'Sarah Chen', date: 'Mar 15, 2024', feedback: 'Exceptional performance this quarter. Great leadership in the new project.' },
    { id: '2', period: 'Annual 2023', rating: 4.5, reviewer: 'James Wilson', date: 'Dec 20, 2023', feedback: 'Consistent results and very reliable team member.' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance & Reviews</h2>
          <p className="text-sm text-slate-500">Track your KPIs and read performance feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <div className="flex items-end gap-2 mb-2">
              <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
              <span className="text-xs text-slate-400 mb-1">Target: {kpi.target}</span>
            </div>
            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", kpi.bg, kpi.color)}>
              {kpi.status}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Recent Performance Reviews
            </h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900">{review.period} Review</h4>
                      <p className="text-xs text-slate-500">Reviewed by {review.reviewer} on {review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{review.feedback}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Growth Progress
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Technical Skills', progress: 85 },
                { label: 'Communication', progress: 90 },
                { label: 'Leadership', progress: 70 },
                { label: 'Problem Solving', progress: 80 },
              ].map((skill) => (
                <div key={skill.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">{skill.label}</span>
                    <span className="text-indigo-600">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
