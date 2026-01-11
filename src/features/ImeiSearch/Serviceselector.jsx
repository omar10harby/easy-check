import React from 'react';
import { ChevronDown } from 'lucide-react';

function ServiceSelector({ 
  selectedService, 
  services, 
  isOpen, 
  onToggle, 
  onSelect, 
  onClose 
}) {
  return (
    <div >
      <label className="block text-sm font-bold text-dark-bg mb-3">
        Service
      </label>
      <div className="relative">
        <button
          onClick={onToggle}
          className="w-full flex items-center text-primary justify-between gap-3 px-5 py-4  border-2 border-medium-gray bg-light-gray  rounded-2xl hover:text-primary/90 transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30"
        >
          {selectedService ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedService.icon}</span>
              <div className="text-left">
                <p className="font-bold text-primary">{selectedService.name}</p>
                <p className="text-xs text-dark-bg">
                  Time: {selectedService.time} • Success: {selectedService.success}
                </p>
              </div>
            </div>
          ) : (
            <span className="text-gray-400 font-medium">Select a service</span>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={onClose}
            ></div>
            <div className="absolute z-20 w-full max-h-48  mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-y-auto">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onSelect(service);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 text-left"
                >
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-dark">{service.name}</p>
                    <p className="text-xs text-gray-500">
                      Time: {service.time} • Success: {service.success}
                    </p>
                  </div>
                  <span className="font-bold text-main-green">{service.price.toFixed(2)} EGP</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceSelector;