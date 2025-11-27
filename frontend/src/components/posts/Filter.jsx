import React from 'react';
import {
  MapPin,
  ChevronDown,
  Calendar,
  Tag,
  Check
} from 'lucide-react';

const Filter = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-10 z-40 shadow-sm mb-4 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-2 overflow-visible">

        {/* --- Location Filter Button --- */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
            <MapPin size={16} />
            <span className="max-w-[100px] truncate">SJSU</span>
            <ChevronDown size={14} />
          </button>

          {/* Location Dropdown Design (Static Mockup) */}
          {false && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                <h4 className="font-bold text-gray-800 mb-2">Location Settings</h4>
                <input
                  type="text"
                  defaultValue="SanJoseStateUniversity"
                  className="w-full mb-4 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                />
                <div className="mb-2 flex justify-between text-xs text-gray-500 font-medium">
                  <span>Search Radius</span>
                  <span>10 miles</span>
                </div>
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg accent-blue-600 mb-4"
                />
                <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Use Current Location
                </button>
            </div>
          )}
        </div>

        {/* --- Date Filter Button --- */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar size={16} />
            Any Date
            <ChevronDown size={14} />
          </button>

          {/* Date Dropdown Design (Static Mockup) */}
          {false && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 flex items-center justify-between">
                  Any Time <Check size={14} />
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                  Last 24 Hours
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                  Last Week
                </button>
            </div>
          )}
        </div>

        {/* --- Categories Filter Button --- */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
            <Tag size={16} />
            Categories
            <ChevronDown size={14} />
          </button>

          {/* Categories Dropdown Design (Static Mockup) */}
          {false && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50">
                <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-gray-300 bg-white flex items-center justify-center"></div>
                    <span className="text-sm text-gray-700">Electronics</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-blue-600 bg-blue-600 flex items-center justify-center">
                       <Check size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">Keys & Wallet</span>
                  </label>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-100 text-right">
                  <button className="text-xs text-gray-500 hover:text-red-500 font-medium">Reset</button>
                </div>
            </div>
          )}
        </div>

        {/* --- Action Buttons (Right Aligned) --- */}
        <div className="ml-auto flex items-center gap-4">
          <button className="text-xs text-gray-500 hover:text-gray-900 font-medium whitespace-nowrap">
            Clear Filters
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform active:scale-95">
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default Filter;