import { memo } from 'react'
import { formatDate, getDefaultNote, getTransactionInfo } from '../../../utils/helpers';
import { AlertCircle, RefreshCw, ShoppingBag, Wallet } from 'lucide-react';

const CardWalletTransaction = memo(({ item }) => {
  const txnInfo = getTransactionInfo(item.kind);
  const { date, time } = formatDate(item.created_at);

  // Render icon based on iconName
  const renderIcon = () => {
    const iconProps = { className: "w-5 h-5 text-light" };
    switch (txnInfo.iconName) {
      case 'Wallet':
        return <Wallet {...iconProps} />;
      case 'ShoppingBag':
        return <ShoppingBag {...iconProps} />;
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
      {/* Solid Colored Header */}
      <div className={`${txnInfo.headerBg} p-5 sm:p-6 lg:p-7 flex items-center justify-between`}>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-light/20 rounded-lg">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-light font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
              {txnInfo.label}
            </h3>
            <p className="text-light/80 text-xs sm:text-sm font-medium mt-0.5">
              ID: #{item.id}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-light font-semibold text-sm sm:text-base">
            {date}
          </p>
          <p className="text-light/70 text-xs sm:text-sm">
            {time}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center  justify-between gap-4 sm:gap-6">
        <div className='text-center sm:text-left'>
          <p className="text-xs sm:text-sm font-bold text-dark-bg uppercase tracking-wider mb-1">
            Description
          </p>
          <p className="text-primary/70 font-medium text-base sm:text-lg leading-relaxed">
            {item.note || getDefaultNote(item.kind)}
          </p>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-xs sm:text-sm font-bold text-dark-bg uppercase tracking-wider mb-1">
            Amount
          </p>
          <p className={`text-3xl  font-black ${txnInfo.amountColor} tracking-tight`}>
            {item.formatted_amount}
          </p>
        </div>
      </div>
    </div>
  );
});

export default CardWalletTransaction;