import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../../features/user/search/HeaderSearch";
import CardSearchHistory from "../../features/user/search/CardSearchHistory";
import Pagination from "../../components/common/Pagination";
import { getErrorMessage } from "../../utils/errorHelpers";
import toast from "react-hot-toast";
import SearchEmptyState from "../../features/user/search/SearchEmptyState";
import { fetchSearchHistoryThunk } from "../../features/user/HistorySlice";
import SearchLoading from "../../features/user/search/SearchLoading";

function SearchHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchHistory, loading, error } = useSelector(
    (state) => state.history,
  );
  const [page, setPage] = useState(1);

  const loadSearchHistory = useCallback(async () => {
    try {
      await dispatch(fetchSearchHistoryThunk({ page })).unwrap();
    } catch (err) {
      const message = typeof err === "string" ? err : getErrorMessage(err);
      toast.error(message);
    }
  }, [page, dispatch]);

  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  const handleViewResult = useCallback((merchantTransactionId) => {
    navigate(`/result/${merchantTransactionId}`);
  }, [navigate]);

  const paginationMeta = useMemo(() => ({
    totalPages: Math.ceil((searchHistory?.count || 0) / 10),
    hasNext: !!searchHistory?.next,
    hasPrev: !!searchHistory?.previous
  }), [searchHistory]);

  const handlePrevious = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  return (
    <section className="w-full max-w-2xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      <HeaderSearch count={searchHistory?.count || 0} isLoading={loading} />
      
      {/* ✅ Loading Skeleton */}
      {loading && <SearchLoading count={searchHistory?.count || 1} />}
      
      {/* Empty State */}
      {!loading && searchHistory?.results?.length === 0 && <SearchEmptyState />}
      
      {/* Cards List */}
      {!loading && searchHistory?.results?.length > 0 && (
        <div className="space-y-5">
          {searchHistory.results.map((item) => (
            <CardSearchHistory
              key={item.id}
              item={item}
              onViewResult={handleViewResult}
            />
          ))}
        </div>
      )}
      
      {/* Pagination*/}
      {!loading && paginationMeta.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={paginationMeta.totalPages}
          hasNext={paginationMeta.hasNext}
          hasPrev={paginationMeta.hasPrev}
          onPrevious={handlePrevious}
          onNext={handleNext}
          loading={loading}
        />
      )}
    </section>
  );
}

export default SearchHistory;