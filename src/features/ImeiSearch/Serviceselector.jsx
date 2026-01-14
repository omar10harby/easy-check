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

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    
    const query = searchQuery.toLowerCase();
    return services.filter(service => 
      service.name.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

  const handleSelect = (service) => {
    onSelect(service);
    setSearchQuery('');
    onClose();
  };

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
        {/* Selected Service Button */}
        <button
          onClick={onToggle}
          type="button"
          className="w-full flex items-center justify-between gap-3 px-5 py-4 border-2 border-medium-gray bg-light-gray rounded-2xl text-primary hover:text-primary/90 transition-all focus:outline-none focus:border-dark-bg focus:ring-4 focus:ring-primary/30"
        >
          {selectedService ? (
            <div className="flex items-center justify-between w-full gap-3">
              <p className="font-bold text-primary text-left truncate flex-1">
                {selectedService.name}
              </p>
              <span className="font-bold text-primary whitespace-nowrap">
                {selectedService.price.toFixed(2)} EGP
              </span>
            </div>
          ) : (
            <span className="text-primary/40 font-medium">
              Select a service ({services.length} available)
            </span>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-primary/60 transition-transform flex-0 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={handleClose}
            ></div>

            {/* Dropdown Content */}
            <div className="absolute z-20 w-full mt-2 bg-light border-2 border-medium-gray rounded-2xl shadow-xl overflow-hidden">
              {/* Search Bar */}
              <div className="p-3 border-b border-medium-gray bg-light-gray">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-8 py-2 border border-medium-gray rounded-lg text-sm text-primary placeholder:text-primary/30 bg-light focus:outline-none focus:border-dark-bg focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/60"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Services List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelect(service)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-light-gray transition-colors border-b border-medium-gray last:border-0 text-left"
                    >
                      <p className="font-bold text-primary truncate flex-1">
                        {service.name}
                      </p>
                      <span className="font-bold text-primary whitespace-nowrap">
                        {service.price} EGP
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-8 text-center text-primary/60">
                    <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">No services found</p>
                    <p className="text-xs mt-1">Try different keywords</p>
                  </div>
                )}
              </div>

              {/* Footer - Results Count */}
              {searchQuery && filteredServices.length > 0 && (
                <div className="px-4 py-2 bg-light-gray border-t border-medium-gray text-xs text-primary/60 text-center">
                  Showing {filteredServices.length} of {services.length} services
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceSelector;