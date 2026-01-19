import React from "react";
import { Info } from "lucide-react";

function ServiceInfoBox({ service }) {
  if (!service) return null;

  return (
    <div className="bg-light-gray border-2 border-medium-gray rounded-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 text-center">
        <Info className="w-4 h-4 text-primary/60" />
        <h3 className="font-bold text-dark-bg text-xs uppercase tracking-tight">
          Service Details
        </h3>
      </div>

      {/* Description */}
      {service.description ? (
        <div className="bg-light rounded-xl p-3 mt-2">
          <p className="text-xs text-primary leading-relaxed whitespace-pre-line text-center">
            {service.description}
          </p>
        </div>
      ) : (
        <div className="bg-light rounded-xl p-3 mt-3">
          <p className="text-xs text-primary italic text-center">
            No description available for this service
          </p>
        </div>
      )}
    </div>
  );
}

export default ServiceInfoBox;
