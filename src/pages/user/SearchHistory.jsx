import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../../features/user/search/HeaderSearch";
function SearchHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchHistory, loading, error } = useSelector((state) => state.history);
  const [page, setPage] = useState(1);

  const displayData = searchHistory ? searchHistory : null;

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

   const totalPages = Math.ceil((displayData?.count || 0) / 10);
  const hasNext = !!displayData?.next;
  const hasPrev = !!displayData?.previous;

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
        <section className="w-full max-w-2xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
            <HeaderSearch count={totalPages}/>
        </section>
  );
}

export default SearchHistory;
