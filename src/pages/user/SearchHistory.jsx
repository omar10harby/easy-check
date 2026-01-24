import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import EmptySearchState from "../../features/user/search/EmptySearchState";

import Pagination from "../../components/common/Pagination";
import { getErrorMessage } from "../../utils/errorHelpers";
import { fetchSearchHistoryThunk } from "../../features/user/Userslice";
import SearchHistoryCard from "../../features/user/search/SearchHistoryCard";
import SearchHeader from "../../features/user/search/SearchHeader";

function SearchHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchHistory, loading, error } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  const displayData = searchHistory ? searchHistory : null;

  useEffect(() => {
    loadHistory();
  }, [page]);

  const loadHistory = async () => {
    try {
      await dispatch(fetchSearchHistoryThunk({ page })).unwrap();
    } catch (err) {
      const message = typeof err === 'string' ? err : getErrorMessage(err);
      toast.error(message);
    }
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
    <section className="w-full max-w-2xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      {/* Header */}
      <SearchHeader
        onRefresh={loadHistory}
        loading={loading}
        count={displayData?.count}
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
              onViewResult={handleViewResult}
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
      />
    </section>
  );
}

export default SearchHistory;