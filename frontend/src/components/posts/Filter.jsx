import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Calendar,
  Tag,
  Check,
  ArrowLeft,
  Search
} from "lucide-react";

const categoriesList = [
  "Electronics",
  "Pets",
  "Keys",
  "Wallet",
  "Clothing",
  "Documents",
  "Jewelry",
  "Other",
];

const dateOptions = [
  { label: "Any Date", value: "" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
];

const Filter = ({ onBack, onFilterChange }) => {
  // STATE
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [openDate, setOpenDate] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  // HANDLE CATEGORY TOGGLE
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  // APPLY FILTERS
  const applyFilters = () => {
    onFilterChange({
      search,
      location,
      date,
      categories: selectedCategories,
    });

    setOpenDate(false);
    setOpenCategories(false);
  };

  // RESET FILTERS
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setDate("");
    setSelectedCategories([]);

    onFilterChange({
      search: "",
      location: "",
      date: "",
      categories: [],
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm mb-4 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent ml-2 text-sm outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOCATION INPUT */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-48">
          <MapPin size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent ml-2 text-sm outline-none w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* DATE FILTER */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenDate((p) => !p)}
          >
            <Calendar size={16} />
            {dateOptions.find((d) => d.value === date)?.label ?? "Any Date"}
            <ChevronDown size={14} />
          </button>

          {openDate && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border p-2 z-50">
              {dateOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                    date === opt.value
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setDate(opt.value);
                    setOpenDate(false);
                  }}
                >
                  {opt.label}
                  {date === opt.value && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY FILTER */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenCategories((p) => !p)}
          >
            <Tag size={16} />
            {selectedCategories.length === 0
              ? "Categories"
              : `${selectedCategories.length} selected`}
            <ChevronDown size={14} />
          </button>

          {openCategories && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border p-3 z-50 max-h-64 overflow-y-auto">
              {categoriesList.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleCategory(cat)}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      selectedCategories.includes(cat)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {selectedCategories.includes(cat) && (
                      <Check size={10} />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="ml-auto flex items-center gap-4">
          <button
            className="text-xs text-gray-500 hover:text-gray-900 font-medium whitespace-nowrap"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

          <button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default Filter;
