import React, { useEffect, useRef } from "react";
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
  
  // 1. استخدام Ref لمنع التكرار (الـ Ref لا يتأثر بإعادة الـ Render)
  const isCalled = useRef(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("paymentStatus");
    const merchantOrderId = searchParams.get("merchantOrderId");

    // 2. التحقق إن البيانات موجودة وإننا لسه مخلصناش العملية دي
    if ((paymentStatus || merchantOrderId) && !isCalled.current) {
      handleKashierCallback(paymentStatus, merchantOrderId);
    }
  }, [searchParams]);

  async function handleKashierCallback(paymentStatus, merchantOrderId) {
    // 3. نقفل الباب فوراً عشان مفيش استدعاء تاني يدخل
    isCalled.current = true;

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
        // 4. تنظيف الرابط عشان لو المستخدم عمل Refresh متبدأش العملية من جديد
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