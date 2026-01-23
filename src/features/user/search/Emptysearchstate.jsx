import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

function EmptySearchState() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-light-gray p-16 text-center">
      <Search className="w-16 h-16 text-primary mx-auto mb-4" />
      <h2 className="text-xl font-bold text-primary mb-2">No Search History</h2>
      <p className="text-primary/70 mb-6 max-w-sm mx-auto">
        You haven't performed any IMEI checks yet. Verify a device to get started.
      </p>
      <button
        onClick={() => navigate('/imei-checker')}
        className="px-6 py-2.5 bg-primary text-light font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-gray-200"
      >
        Check Device
      </button>
    </div>
  );
}

export default EmptySearchState;