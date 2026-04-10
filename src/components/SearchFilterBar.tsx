import React from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  displayMode?: 'grid' | 'table';
  onDisplayModeChange?: (mode: 'grid' | 'table') => void;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
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
  rightElement,
  className
}: SearchFilterBarProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm", className)}>
      <div className="relative w-full md:flex-1 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm font-medium text-slate-600"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        {onDisplayModeChange && displayMode && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-1.5 flex items-center gap-1">
            <button 
              onClick={() => onDisplayModeChange('grid')}
              className={cn(
                "p-2 rounded-xl transition-all duration-200",
                displayMode === 'grid' 
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDisplayModeChange('table')}
              className={cn(
                "p-2 rounded-xl transition-all duration-200",
                displayMode === 'table' 
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}

        {onFilterClick && (
          <button 
            onClick={onFilterClick}
            className={cn(
              "flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-2xl text-sm font-bold transition-all border border-transparent",
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
