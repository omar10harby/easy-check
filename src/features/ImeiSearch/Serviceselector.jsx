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

  const handleClear = (e) => {
    e.stopPropagation(); 
    onSelect(null);
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
          className={`relative w-full flex items-center text-primary border-2 bg-light-gray rounded-2xl hover:text-primary/90 transition-all focus:outline-none min-h-[64px] py-3
            ${isOpen 
              ? 'border-dark-bg ring-4 ring-primary/30' 
              : 'border-medium-gray focus:border-dark-bg focus:ring-4 focus:ring-primary/30'
            }`}
        >
          {selectedService ? (
            <div className="flex items-center justify-between w-full px-3 md:px-10">
              {/* أيقونة X Absolute - يسار */}
              <X 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-red-500 z-10 shrink-0" 
                onClick={handleClear} 
              />
              
              <div className="flex flex-1 items-center justify-between gap-3 overflow-hidden">
                {/* الاسم: ينزل سطر جديد عادي بدون Truncate */}
                <p className="font-semibold text-primary text-[13px] sm:text-base leading-tight text-left wrap-break-word">
                  {selectedService.name}
                </p>
                
                {/* السعر: ثابت لا يتأثر بطول النص */}
                <span className="font-bold text-primary text-xs sm:text-sm whitespace-nowrap bg-primary/10 px-2 py-1 rounded-lg shrink-0 self-center">
                  {selectedService.final_price} EGP
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-400 font-medium text-base pl-10">Select a service</span>
          )}

          {/* أيقونة السهم Absolute - يمين */}
          <ChevronDown 
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-bg transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={handleClose}></div>
            <div className="absolute z-20 w-full mt-2 bg-light-gray border-2 border-medium-gray rounded-2xl shadow-xl overflow-hidden">
              {/* Search Bar */}
              <div className="p-3 border-b border-medium-gray bg-light-gray">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-8 py-2 border bg-light border-medium-gray rounded-lg text-base focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Services List - جعلنا الأسماء فيها تنزل سطر برضه عشان التناسق */}
              <div className="max-h-42 overflow-y-auto">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      onSelect(service);
                      setSearchQuery('');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between gap-4 px-2 sm:px-5 py-4 hover:bg-primary/30 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <p className="font-semibold text-primary text-sm sm:text-base text-left wrap-break-word leading-tight flex-1">
                      {service.name}
                    </p>
                    <span className="font-bold text-primary text-xs sm:text-sm whitespace-nowrap shrink-0">
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