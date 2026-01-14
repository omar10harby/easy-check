import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

function ServiceSelector({ 
  selectedService, 
  services, 
  isOpen, 
  onToggle, 
  onSelect, 
  onClose 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on search
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const query = searchQuery.toLowerCase();
    return services.filter(service => 
      service.name.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <div>
      <label className="block text-sm font-bold text-dark-bg mb-3">
        Service
      </label>
      <div className="relative">
        <button
          onClick={onToggle}
          type="button"
          className="w-full flex items-center text-primary justify-between gap-3 px-5 py-4 border-2 border-medium-gray bg-light-gray rounded-2xl hover:text-primary/90 transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30"
        >
          {selectedService ? (
            <div className="flex items-center justify-between gap-2 flex-1 min-h-10">
              <p className="font-semibold text-primary text-sm leading-snug">
                {selectedService.name}
              </p>
              <span className="font-bold text-primary text-sm whitespace-nowrap">
                {selectedService.final_price} EGP
              </span>
            </div>
          ) : (
            <span className="text-gray-400 font-medium text-sm">Select a service</span>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={handleClose}
            ></div>
            <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              {/* Search Bar */}
              <div className="p-3 border-b border-gray-100 bg-gray-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Services List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      onSelect(service);
                      setSearchQuery('');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                  >
                    <p className="font-semibold text-dark text-sm leading-snug flex-1">
                      {service.name}
                    </p>
                    <span className="font-bold text-primary text-sm whitespace-nowrap">
                      {service.final_price} EGP
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceSelector;