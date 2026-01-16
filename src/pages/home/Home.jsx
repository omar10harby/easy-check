import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import toast from "react-hot-toast";
import { getImeiResult, getTransactionByMerchantId } from "../../services/imeiApi";

function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const hasProcessedCallback = useRef(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("paymentStatus");
    const merchantOrderId = searchParams.get("merchantOrderId");

    if ((paymentStatus || merchantOrderId) && !hasProcessedCallback.current) {
      hasProcessedCallback.current = true;
      handleKashierCallback(paymentStatus, merchantOrderId);
    }
  }, [searchParams]);

  async function handleKashierCallback(paymentStatus, merchantOrderId) {
    setSearchParams({});

    if (paymentStatus === "FAILED") {
      toast.error("Payment failed. Please try again. ❌");
      return;
    }

    if (paymentStatus === "SUCCESS" && merchantOrderId) {
      try {
        const transaction = await getImeiResult(merchantOrderId);

        if (transaction.serviceDetails) {
          toast.success("Payment successful! Redirecting to results... ✅");
          navigate(`/result/${transaction.id}`, {
            state: { resultData: transaction },
          });
        } else {
          toast.success("Balance updated successfully! ✅");
        }
      } catch (error) {
        console.error("Kashier callback error:", error);
        toast.error(error.message || "Failed to process payment");
      }
    }
  }

  const handleSearchClick = () => {
    navigate("/imei-checker");
  };

  return (
    <section className="md:py-10 px-4 sm:px-6 lg:px-8 flex items-center min-h-full ">
      <div className="max-w-7xl mx-auto text-center w-full">
        <HeroSection onSearchClick={handleSearchClick} />
        <FeaturePills />
      </div>
    </section>
  );
}

export default Home;