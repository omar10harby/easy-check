import React from 'react';
import { AlertCircle, Eye, RefreshCw, Search } from 'lucide-react';
import { formatDate, getStatusInfo, maskIdentifier } from '../../../utils/helpers';

function SearchHistoryCard({ item, onRefresh, onViewResult, refreshingId }) {
  const statusInfo = getStatusInfo(item.status);
  const { date, time } = formatDate(item.created_at);
  const isPending = item.status === 'PENDING';
  const isCompleted = item.status === 'COMPLETED';
  const renderIcon = () => {
    const iconProps = { className: "w-5 h-5 text-white" };
    switch (statusInfo.iconName) {
      case 'Search':
        return <Search {...iconProps} />;
      case 'RefreshCw':
        return <RefreshCw {...iconProps} />;
      case 'AlertCircle':
        return <AlertCircle {...iconProps} />;
      default:
        return <AlertCircle {...iconProps} />;
    }
  };
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Solid Colored Header */}
      <div className={`${statusInfo.headerBg} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase opacity-95">
              {statusInfo.label}
            </h3>
            <p className="text-white/80 text-xs font-medium mt-0.5">
              ID: #{item.id}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold text-sm">
            {date}
          </p>
          <p className="text-white/70 text-xs">
            {time}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Service
            </p>
            <p className="text-gray-900 font-bold text-lg">
              {item.service_name}
            </p>
          </div>

          <div className="flex-1 sm:text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Device Identifier
            </p>
            <p className="font-mono font-medium text-lg text-gray-700 bg-gray-50 inline-block px-3 py-1 rounded-lg border border-gray-100">
              {maskIdentifier(item.item_identifier)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {isPending && (
            <button
              onClick={() => onRefresh(item.id)}
              disabled={refreshingId === item.id}
              className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${refreshingId === item.id ? 'animate-spin' : ''}`} />
              Check Status
            </button>
          )}

          <button
            onClick={() => onViewResult(item.merchant_transaction_id)}
            className={`${isPending ? 'flex-1' : 'w-full'} px-4 py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${isCompleted
                ? 'bg-gray-900 hover:bg-black text-white shadow-lg shadow-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
          >
            <Eye className="w-4 h-4" />
            {isCompleted ? 'View Full Result' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchHistoryCard;