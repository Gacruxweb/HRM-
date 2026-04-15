import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  displayMode?: 'grid' | 'list';
  onDisplayModeChange?: (mode: 'grid' | 'list') => void;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
  timeFilter?: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
  };
  middleElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  displayMode,
  onDisplayModeChange,
  onFilterClick,
  isFilterActive = false,
  timeFilter,
  middleElement,
  rightElement,
  className
}: SearchFilterBarProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm", className)}>
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder={searchPlaceholder}
          className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium text-slate-600 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="relative flex items-center gap-2 w-full md:w-auto px-2">
        {onDisplayModeChange && displayMode && (
          <div className="bg-slate-50/80 rounded-2xl p-1 flex items-center gap-1">
            <button 
              onClick={() => onDisplayModeChange('grid')}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200",
                displayMode === 'grid' 
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/20" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDisplayModeChange('list')}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200",
                displayMode === 'list' 
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/20" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}

        {timeFilter && (
          <div className="relative group">
            <select 
              value={timeFilter.value}
              onChange={(e) => timeFilter.onChange(e.target.value)}
              className="appearance-none pl-5 pr-10 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
            >
              {timeFilter.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        {middleElement}

        {onFilterClick && (
          <button 
            onClick={onFilterClick}
            className={cn(
              "flex items-center gap-2 px-6 py-3.5 bg-slate-50/80 rounded-2xl text-sm font-bold transition-all border border-transparent",
              isFilterActive 
                ? "text-indigo-600 bg-indigo-50 border-indigo-100 shadow-sm" 
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        )}

        {rightElement}
      </div>
    </div>
  );
}
