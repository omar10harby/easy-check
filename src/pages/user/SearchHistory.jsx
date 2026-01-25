import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../../features/user/search/HeaderSearch";
import CardSearchHistory from "../../features/user/search/CardSearchHistory";
import Pagination from "../../components/common/Pagination";
import { getErrorMessage } from "../../utils/errorHelpers";
import toast from "react-hot-toast";
import SearchEmptyState from "../../features/user/search/SearchEmptyState";
function SearchHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchHistory, loading, error } = useSelector(
    (state) => state.history,
  );
  const [page, setPage] = useState(1);


  useEffect(() => {
    loadSearchHistory();
  }, [page]);
  async function loadSearchHistory() {
    try {
      await dispatch(fetchSearchHistoryThunk({ page })).unwrap();
    } catch (err) {
      const message = typeof err === "string" ? err : getErrorMessage(err);
      toast.error(message);
    }
  }
  const handleViewResult = (merchantTransactionId) => {
    navigate(`/result/${merchantTransactionId}`);
  };

  const totalPages = Math.ceil((searchHistory?.count || 0) / 10);
  const hasNext = !!searchHistory?.next;
  const hasPrev = !!searchHistory?.previous;

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <section className="w-full max-w-2xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      <HeaderSearch count={totalPages} />
      {/* Empty State */}
      {!loading && searchHistory?.results?.length === 0 && <SearchEmptyState />}
      {/* Cards List */}
      {searchHistory?.results?.length > 0 && (
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
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </section>
  );
}

export default SearchHistory;
