import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import HeaderWallet from "../../features/user/wallet/HeaderWallet";
import { fetchWalletHistoryThunk } from "../../features/user/HistorySlice";
import CardWalletTransaction from "../../features/user/wallet/CardWalletTransaction";
import Pagination from "../../components/common/Pagination";
import WalletLoading from "../../features/user/wallet/WalletLoading";
import WalletEmptyState from "../../features/user/wallet/WalletEmptyState";
import { getErrorMessage } from "../../utils/errorHelpers";

function WalletHistory() {
  const dispatch = useDispatch();
  const { walletHistory, loading, error } = useSelector(
    (state) => state.history,
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadWalletHistory();
  }, [page]);
  async function loadWalletHistory() {
    try {
      await dispatch(fetchWalletHistoryThunk({ page })).unwrap();
    } catch (err) {
      toast.error(err);
    }
  }

  const totalPages = Math.ceil((walletHistory?.count || 0) / 10);
  const hasNext = !!walletHistory?.next;
  const hasPrev = !!walletHistory?.previous;

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);
  return (
    <section className="w-full max-w-2xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      {/* Header */}
      <HeaderWallet count={walletHistory?.count || 0} isLoading={loading} />
      {/* ✅ Loading Skeleton */}
      {loading && <WalletLoading count={walletHistory?.count || 1} />}
      {/* Empty State */}
      {!loading && walletHistory?.results?.length === 0 && <WalletEmptyState />}
      {/* Transaction Cards */}
      {!loading && walletHistory?.results?.length > 0 && (
        <div className="space-y-5">
          {walletHistory.results.map((item) => (
            <CardWalletTransaction key={item.id} item={item} />
          ))}
        </div>
      )}
      {/* Pagination*/}
      {!loading && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPrevious={handlePrevious}
          onNext={handleNext}
          loading={loading}
        />
      )}
    </section>
  );
}

export default WalletHistory;