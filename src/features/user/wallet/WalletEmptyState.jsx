import { Wallet } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function WalletEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="bg-light rounded-3xl shadow-sm  p-16 text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Wallet className="w-8 h-8 text-gray-400" />
      </div>
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
