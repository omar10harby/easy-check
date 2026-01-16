import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getTransactionByMerchantId } from "../../services/imeiApi";
import { verifyAuthThunk } from "../../features/auth/authSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paymentStatus = searchParams.get("paymentStatus");
    const merchantOrderId = searchParams.get("merchantOrderId");

    if ((paymentStatus || merchantOrderId) ) {
      handleKashierCallback(paymentStatus, merchantOrderId);
    }
  }, []);

  async function handleKashierCallback(paymentStatus, merchantOrderId) {

    if (paymentStatus === "FAILED") {
      toast.error("Payment failed. Please try again. ❌");
      window.history.replaceState({}, "", "/");
      return;
    }

    if (paymentStatus === "SUCCESS" && merchantOrderId) {
      try {
        const transaction = await getTransactionByMerchantId(merchantOrderId);

        if (transaction.serviceDetails) {
          toast.success("Payment successful! Redirecting to results... ✅");
          navigate(`/result/${transaction.id}`, {
            state: { resultData: transaction },
          });
        } else {
          await dispatch(verifyAuthThunk()).unwrap();
          toast.success("Balance updated successfully! ✅");
        }
      } catch (error) {
        console.error("Kashier callback error:", error);
        toast.error(error.message || "Failed to process payment");
      } finally {
        window.history.replaceState({}, "", "/");
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