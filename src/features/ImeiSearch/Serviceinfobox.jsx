import React from "react";
import { Info } from "lucide-react";

function ServiceInfoBox({ service }) {
  if (!service) return null;



  return (
    <div className="bg-light-gray border-2 border-medium-gray rounded-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header with Price */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-2 flex-1">
          <Info className="w-4 h-4 text-primary/60 mt-0.5 flex-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-primary text-xs uppercase tracking-tight mb-1">
              Service Details
            </h3>
          </div>
        </div>
        
        {/* Price Badge */}
        <div className="bg-primary/10 px-3 py-1 rounded-lg flex-0">
          <span className="text-xs font-black text-primary">
            {service.final_price} EGP
          </span>
        </div>
      </div>

      {/* Description - Display as-is */}
      {service.description ? (
        <div className="bg-light rounded-xl p-3">
          <p className="text-xs text-primary leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </div>
      ) : (
        <div className="bg-light rounded-xl p-3">
          <p className="text-xs text-primary italic">
            No description available for this service
          </p>
        </div>
      )}
    </div>
  );
}

export default ServiceInfoBox;