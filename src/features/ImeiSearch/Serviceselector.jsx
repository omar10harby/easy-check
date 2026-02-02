import React, { useState, useMemo, useCallback, memo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetImeiState, setSelectedService } from './ImeiSlice';

const ServiceSelector = memo(function ServiceSelector({
  services,
  isOpen,
  onToggle,
  onClose,
  disabled = false,
}) {
  const dispatch = useDispatch();
  const { selectedService } = useSelector((state) => state.imei);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const query = searchQuery.toLowerCase();
    return services.filter((service) =>
      service.name.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

  const handleClose = useCallback(() => {
    setSearchQuery('');
    onClose();
  }, [onClose]);

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(resetImeiState());
    },
    [dispatch]
  );

  return (
    <div>
      <label className="block text-sm font-bold text-dark-bg mb-2">
        Service
      </label>
      <div className="relative">
        <button
          onClick={onToggle}
          disabled={disabled}
          type="button"
          className={`relative w-full flex items-center text-primary border-2 bg-light-gray disabled:cursor-not-allowed disabled:bg-medium-gray rounded-2xl hover:text-primary/90 transition-all focus:outline-none py-2.5 sm:py-4
            ${
              isOpen
                ? 'border-dark-bg ring-4 ring-primary/30'
                : 'border-medium-gray focus:border-dark-bg focus:ring-4 focus:ring-primary/30'
            }`}
        >
          {selectedService ? (
            <div className="flex items-center justify-between w-full px-3 md:px-10">
              <X
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-red-500 z-10 shrink-0"
                onClick={handleClear}
              />
              <div className="flex flex-1 items-center justify-between gap-3 overflow-hidden">
                <p className="font-semibold text-primary text-[13px] sm:text-base leading-tight text-left wrap-break-word">
                  {selectedService.name}
                </p>
                <span className="font-bold text-primary text-xs sm:text-sm whitespace-nowrap bg-primary/10 px-2 py-1 rounded-lg shrink-0 self-center">
                  {selectedService.final_price} EGP
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-400 font-medium text-base pl-10">
              Select a service
            </span>
          )}
          <ChevronDown
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-bg transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={handleClose}></div>
            <div className="absolute z-20 w-full mt-2 bg-light-gray border-2 border-medium-gray rounded-2xl shadow-xl overflow-hidden">
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
              <div className="max-h-42 overflow-y-auto">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedService(service));
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
});

export default ServiceSelector;