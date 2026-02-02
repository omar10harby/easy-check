import { memo } from 'react';
import { Wallet } from 'lucide-react';

const BalanceDisplay = memo(({ balance }) => {
  const safeBalance = balance ? Number(balance) : 0;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-light rounded-lg border border-light-gray">
      <Wallet className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary">
        {safeBalance.toFixed(2)} EGP
      </span>
    </div>
  );
});

export default BalanceDisplay;