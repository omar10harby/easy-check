import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import EmptySearchState from "../../features/user/search/Emptysearchstate";
import SearchHistoryCard from "../../features/user/search/Searchhistorycard";
import SearchHeader from "../../features/user/search/Searchheader";
import Pagination from "../../components/common/Pagination";
import { getErrorMessage } from "../../utils/errorHelpers";
import { fetchSearchHistoryThunk } from "../../features/user/Userslice";

// 🧪 Mock Data for Testing
const MOCK_DATA = {
  count: 23,
  next: "http://api.com/page=2",
  previous: null,
  results: [
    {
      id: 128,
      created_at: "2026-01-20T14:30:25.123456Z",
      status: "COMPLETED",
      service_name: "iPhone IMEI Check",
      item_identifier: "352046111234567",
      result_text: "http://158.220.126.228:3000/result/a3f2e8d1",
      merchant_transaction_id: "a3f2e8d1-4c5b-6789",
    },
    {
      id: 127,
      created_at: "2026-01-19T10:15:42.987654Z",
      status: "COMPLETED",
      service_name: "Samsung Network Unlock",
      item_identifier: "358745098765432",
      result_text: "http://158.220.126.228:3000/result/b4f3e9d2",
      merchant_transaction_id: "b4f3e9d2-5c6b-7890",
    },
    {
      id: 126,
      created_at: "2026-01-18T16:45:10.456789Z",
      status: "REFUNDED",
      service_name: "Apple Serial Check",
      item_identifier: "F2LXH8QLJCLF",
      result_text: "http://158.220.126.228:3000/result/c5f4e0d3",
      merchant_transaction_id: "c5f4e0d3-6c7b-8901",
    },
    {
      id: 125,
      created_at: "2026-01-17T09:20:33.321654Z",
      status: "PENDING",
      service_name: "Xiaomi MI Account Check",
      item_identifier: "N/A",
      result_text: "http://158.220.126.228:3000/result/d6f5e1d4",
      merchant_transaction_id: "d6f5e1d4-7c8b-9012",
    },
    {
      id: 124,
      created_at: "2026-01-16T08:10:15.654321Z",
      status: "FAILED",
      service_name: "Huawei FRP Check",
      item_identifier: "867543210987654",
      result_text: "http://158.220.126.228:3000/result/e7f6e2d5",
      merchant_transaction_id: "e7f6e2d5-8c9b-0123",
    },
  ],
};

const USE_MOCK_DATA = false;

function SearchHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchHistory, loading, error } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const displayData = searchHistory ? searchHistory : null; // Replace with searchHistory when ready

  useEffect(() => {
    if (!USE_MOCK_DATA) {
      loadHistory();
    }
  }, [page]);

const loadHistory = async () => {
  try {
    // الـ unwrap هترجع الـ payload اللي هو النص اللي استخلصناه في الـ slice
    await dispatch(fetchSearchHistoryThunk({ page })).unwrap();
  } catch (err) {
    // ✅ نمرر الخطأ للـ helper للتأكد إنه string قبل ما يروح للـ toast
    const message = typeof err === 'string' ? err : getErrorMessage(err);
    toast.error(message); 
  }
};

  const handleRefresh = async (id) => {
    setRefreshingId(id);
    await loadHistory();
    setRefreshingId(null);
  };

  const handleViewResult = (merchantTransactionId) => {
    navigate(`/result/${merchantTransactionId}`);
  };

  const totalPages = Math.ceil((displayData?.count || 0) / 10);
  const hasNext = !!displayData?.next;
  const hasPrev = !!displayData?.previous;

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <section className=" w-3/4 md:w-1/3 py-8">
      <div className="  max-w-5xl">
        {/* Header */}
        <SearchHeader
          onRefresh={loadHistory}
          loading={loading}
          count={displayData?.count}
          useMockData={USE_MOCK_DATA}
        />
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="font-bold text-sm uppercase tracking-wide">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !displayData?.results?.length && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading history...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayData?.results?.length === 0 && <EmptySearchState />}

        {/* Cards List */}
        {displayData?.results?.length > 0 && (
          <div className="space-y-5">
            {displayData.results.map((item) => (
              <SearchHistoryCard
                key={item.id}
                item={item}
                onRefresh={handleRefresh}
                onViewResult={handleViewResult}
                refreshingId={refreshingId}
              />
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

export default SearchHistory;
