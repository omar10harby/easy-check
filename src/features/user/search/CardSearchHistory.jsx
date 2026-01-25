import React from 'react'
import { formatDate, getStatusInfo, maskIdentifier } from '../../../utils/helpers';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

function CardSearchHistory({item, onViewResult }) {
  const statusInfo = getStatusInfo(item.status);
  const { date, time } = formatDate(item.created_at);
  
  // تحديد الحالة بدقة
  const hasSuccessfulResult = 
    item.status === 'COMPLETED' && 
    item.result_text && 
    !item.result_text.toLowerCase().includes('pending');
  
  const isPending = 
    item.status === 'COMPLETED' && 
    item.result_text?.toLowerCase().includes('pending');
  
  const isFailed = item.status === 'FAILED';
  const isRefunded = item.status === 'REFUNDED';

  const renderIcon = () => {
    const iconProps = { className: "w-5 h-5 text-light" };
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
    <div className="group bg-light rounded-2xl lg:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${statusInfo.headerBg} p-5 sm:p-6 lg:p-7 flex items-center justify-between`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-light/20 rounded-lg">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-light font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
              {statusInfo.label}
            </h3>
            <p className="text-light/80 text-xs sm:text-sm font-medium mt-0.5">
              ID: #{item.id}
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-light font-semibold text-sm sm:text-base">
            {date}
          </p>
          <p className="text-light/70 text-xs sm:text-sm">
            {time}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold text-dark-bg uppercase tracking-wider mb-1">
              Service
            </p>
            <p className="text-primary/70 font-bold text-base sm:text-lg">
              {item.service_name}
            </p>
          </div>

          <div className="flex-1 sm:text-right">
            <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider mb-1">
              Device Identifier
            </p>
            <p className="font-mono font-medium text-base sm:text-lg text-primary/70 bg-light-gray inline-block px-3 py-1.5 rounded-lg border border-gray-100">
              {maskIdentifier(item.item_identifier)}
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="pt-3 sm:pt-4 border-t border-gray-100">
          
          {/* ✅ Success: View Result Button */}
          {hasSuccessfulResult && (
            <button
              onClick={() => onViewResult(item.merchant_transaction_id)}
              className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-light text-sm sm:text-base font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Eye className="w-4 h-4" />
              View Result
            </button>
          )}

          {/* ⏳ Pending: Processing Message */}
          {isPending && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />
              <div>
                <p className="text-amber-900 font-bold text-sm mb-1">
                  ⏱️ Processing Your Request
                </p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Results usually take a few minutes. We'll email you once they're ready.
                </p>
              </div>
            </div>
          )}

          {/* ❌ Failed: Error Message */}
          {isFailed && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 font-bold text-sm mb-1">
                  ❌ Transaction Failed
                </p>
                <p className="text-red-700 text-xs leading-relaxed">
                  The service encountered an error. Your payment has been refunded to your wallet.
                </p>
              </div>
            </div>
          )}

          {/* 🔄 Refunded: Refund Message */}
          {isRefunded && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-bold text-sm mb-1">
                  💰 Payment Refunded
                </p>
                <p className="text-blue-700 text-xs leading-relaxed">
                  This transaction was refunded. The amount has been returned to your wallet.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CardSearchHistory
