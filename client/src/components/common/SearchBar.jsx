import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Layers, ArrowRight } from 'lucide-react';
import { initialCities } from '../../services/mockData';

export default function SearchBar({
  initialQuery = '',
  initialCity = '',
  initialCategory = '',
  onSearch,
  compact = false,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory || 'all');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch({ query, city, category });
      return;
    }

    // Direct routing
    const targetPath =
      category === 'articleship'
        ? '/articleship'
        : category === 'industrial-training'
        ? '/industrial-training'
        : category === 'ca-jobs'
        ? '/ca-jobs'
        : '/articleship';

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (city && city !== 'all') params.set('city', city);

    navigate(`${targetPath}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-lg border border-[#DCE5ED] p-2 sm:p-2.5 transition-all ${
        compact ? 'max-w-4xl' : 'max-w-5xl'
      } mx-auto`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
        {/* Role, Company, Domain Input */}
        <div className="md:col-span-5 relative flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search role, company or domain (e.g. Audit, PE, Valuation)"
            className="w-full text-sm text-[#152B45] placeholder-slate-400 focus:outline-hidden bg-transparent"
          />
        </div>

        {/* Location Dropdown */}
        <div className="md:col-span-3 relative flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
          <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full text-sm text-[#152B45] focus:outline-hidden bg-transparent cursor-pointer"
          >
            <option value="">Any City (Pan-India)</option>
            {initialCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div className="md:col-span-2.5 relative flex items-center px-3 py-2">
          <Layers className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-sm text-[#152B45] focus:outline-hidden bg-transparent cursor-pointer font-medium"
          >
            <option value="all">All Categories</option>
            <option value="articleship">Articleship</option>
            <option value="industrial-training">Industrial Training</option>
            <option value="ca-jobs">CA Jobs</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-1.5 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto px-5 py-3 bg-[#173B63] hover:bg-[#176FA8] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
