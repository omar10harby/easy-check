import { Wallet } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function WalletEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="bg-light rounded-3xl shadow-sm  p-16 text-center">
      <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
      <h2 className="text-xl font-bold text-primary mb-2">No Transactions Yet</h2>
      <p className="text-primary/70 mb-6 max-w-sm mx-auto">
        Your wallet history is empty. Top up your balance to get started.
      </p>
      <button
        onClick={() => navigate('/add-balance')}
        className="px-6 py-2.5 bg-primary text-light font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-light"
      >
        Add Funds
      </button>
    </div>
  );
}

export default WalletEmptyState
