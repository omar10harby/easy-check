import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import WalletHeader from '../../features/user/wallet/Walletheader';
import WalletTransactionCard from '../../features/user/wallet/Wallettransactioncard';
import EmptyWalletState from '../../features/user/wallet/Emptywalletstate';
import Pagination from '../../components/common/Pagination';
// import { fetchWalletHistoryThunk } from '../userSlice';

// 🧪 Mock Data for Testing
const MOCK_DATA = {
  count: 15,
  next: "http://api.com/page=2",
  previous: null,
  results: [
    {
      id: 45,
      created_at: "2026-01-20T14:30:25.123456Z",
      kind: "TOPUP",
      amount: "50.00",
      formatted_amount: "+50.00",
      note: null
    },
    {
      id: 44,
      created_at: "2026-01-20T12:15:10.987654Z",
      kind: "PURCHASE",
      amount: "25.00",
      formatted_amount: "-25.00",
      note: "Service: iPhone IMEI Check"
    },
    {
      id: 43,
      created_at: "2026-01-19T18:45:33.456789Z",
      kind: "REFUND",
      amount: "15.00",
      formatted_amount: "+15.00",
      note: "Auto-refund: Service error"
    },
    {
      id: 42,
      created_at: "2026-01-19T10:20:15.321654Z",
      kind: "PURCHASE",
      amount: "30.00",
      formatted_amount: "-30.00",
      note: "Service: Samsung Network Unlock"
    },
    {
      id: 41,
      created_at: "2026-01-18T16:55:42.789123Z",
      kind: "TOPUP",
      amount: "100.00",
      formatted_amount: "+100.00",
      note: null
    }
  ]
};

const USE_MOCK_DATA = true;

function WalletHistory() {
  const dispatch = useDispatch();
  // const { walletHistory, loading, error } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const displayData = USE_MOCK_DATA ? MOCK_DATA : null; // Replace with walletHistory when ready

  useEffect(() => {
    if (!USE_MOCK_DATA) {
      loadHistory();
    }
  }, [page]);

  const loadHistory = async () => {
    try {
      // await dispatch(fetchWalletHistoryThunk({ page })).unwrap();
      console.log('Loading wallet history...');
    } catch (err) {
      toast.error(err || 'Failed to load wallet history');
    }
  };

  const totalPages = Math.ceil((displayData?.count || 0) / 10);
  const hasNext = !!displayData?.next;
  const hasPrev = !!displayData?.previous;

  const handlePrevious = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => p + 1);

  return (
      <section className="py-8">
      <div className=" max-w-5xl ">
        {/* Header */}
        <WalletHeader
          onRefresh={loadHistory}
          loading={loading}
          count={displayData?.count}
          useMockData={USE_MOCK_DATA}
        />

        {/* Loading State */}
        {loading && !displayData?.results?.length && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading transactions...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayData?.results?.length === 0 && (
          <EmptyWalletState/>
        )}

        {/* Transaction Cards */}
        {displayData?.results?.length > 0 && (
          <div className="space-y-5">
            {displayData.results.map((item) => (
              <WalletTransactionCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrevious={handlePrevious}
          onNext={handleNext}
          loading={loading}
          useMockData={USE_MOCK_DATA}
        />
      </div>
    </section>
  );
}

export default WalletHistory;