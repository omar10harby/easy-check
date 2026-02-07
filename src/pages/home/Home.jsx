import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import toast from "react-hot-toast";
import { getImeiResultThunk } from "../../features/ImeiSearch/ImeiSlice";
import { verifyAuthThunk } from "../../features/auth/authSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isProcessing, setIsProcessing] = useState(() => {
    return !!(
      searchParams.get("merchantOrderId") || searchParams.get("paymentStatus")
    );
  });

  const hasProcessed = useRef(false);

  const processPayment = useCallback(async (paymentStatus, merchantOrderId) => {
    try {
      if (paymentStatus === "FAILED") {
        toast.error("Payment failed. Please try again. ❌");
        setSearchParams({});
        setIsProcessing(false);
        return;
      }

      if (paymentStatus === "SUCCESS" && merchantOrderId) {
        const transaction = await dispatch(getImeiResultThunk(merchantOrderId)).unwrap();
        if (transaction.serviceDetails && !transaction.isBalanceTopup) {
          toast.success("Payment successful! ✅");
          navigate(`/result/${transaction.merchantTransactionId}`, {
            replace: true,
          });
        } else {
          toast.success("Balance updated successfully! ✅");
          await dispatch(verifyAuthThunk()).unwrap(); 
          setSearchParams({});
          setIsProcessing(false);
        }
      }
    } catch (_error) {
      toast.error("Failed to verify payment");
      setSearchParams({});
      setIsProcessing(false);
    }
  }, [dispatch, navigate, setSearchParams, isAuthenticated]);

  useEffect(() => {
    const paymentStatus = searchParams.get("paymentStatus");
    const merchantOrderId = searchParams.get("merchantOrderId");

    if (
      isProcessing &&
      !hasProcessed.current &&
      (paymentStatus || merchantOrderId)
    ) {
      hasProcessed.current = true;
      processPayment(paymentStatus, merchantOrderId);
    }
  }, [isProcessing, processPayment, searchParams]);

  const handleSearchClick = useCallback(() => {
    navigate("/imei-checker");
  }, [navigate]);

  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-primary">Verifying Payment...</p>
      </div>
    );
  }

  return (
    <section className="md:py-10 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto text-center w-full">
        <HeroSection onSearchClick={handleSearchClick} />
        <FeaturePills />
      </div>
    </section>
  );
}

export default Home;