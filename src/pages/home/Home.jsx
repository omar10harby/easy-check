import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import toast from "react-hot-toast";
import { getImeiResult } from "../../services/imeiApi";

function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. التهيئة الآمنة: بنشوف الرابط مرة واحدة بس عند التحميل
  // Lazy Initialization: الدالة دي بتشتغل مرة واحدة بس مع أول render
  const [isProcessing, setIsProcessing] = useState(() => {
    return !!(searchParams.get("merchantOrderId") || searchParams.get("paymentStatus"));
  });

  // بنستخدم Ref عشان نضمن ان الدالة تشتغل مرة واحدة بس مهما حصل Re-render
  const hasProcessed = useRef(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("paymentStatus");
    const merchantOrderId = searchParams.get("merchantOrderId");

    // الشرط ده هو "صمام الأمان" ضد الـ Infinite Loop
    if (isProcessing && !hasProcessed.current && (paymentStatus || merchantOrderId)) {
      hasProcessed.current = true; // ⛔ ارفع العلم فوراً عشان ميتكررش
      processPayment(paymentStatus, merchantOrderId);
    }
  }, []); // ✅ المصفوفة فاضية: الـ Effect يشتغل مرة واحدة بس عند التحميل

  async function processPayment(paymentStatus, merchantOrderId) {
    try {
      if (paymentStatus === "FAILED") {
        toast.error("Payment failed. Please try again. ❌");
        finishProcessing(); // ارجع اعرض الـ Home
        return;
      }

      if (paymentStatus === "SUCCESS" && merchantOrderId) {
        // نادرا ما بيحصل هنا error، بس لو حصل بنمسكه
        const transaction = await getImeiResult(merchantOrderId);

        if (transaction.serviceDetails) {
          toast.success("Payment successful! ✅");
          // ✅ Navigate بتموت الـ Component ده، فمستحيل يحصل Loop
          navigate(`/result/${transaction.merchantTransactionId}`, {
            replace: true,
            state: { resultData: transaction },
          });
        } else {
          // حالة شحن الرصيد فقط
          toast.success("Balance updated successfully! ✅");
          finishProcessing();
        }
      }
    } catch (error) {
      console.error("Callback Error:", error);
      toast.error("Failed to verify payment");
      finishProcessing();
    }
  }

  // دالة مسؤولة عن تنظيف الرابط وإظهار الـ Home تاني في حالة الفشل
  const finishProcessing = () => {
    setSearchParams({}); // نظف الرابط
    setIsProcessing(false); // وقف الـ Loading واعرض الموقع
  };

  // 2. لو بنعالج دفع، اعرض الـ Loader فقط
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-gray-700">Verifying Payment...</p>
      </div>
    );
  }

  // 3. العرض الطبيعي للموقع
  return (
    <section className="md:py-10 px-4 sm:px-6 lg:px-8 flex items-center min-h-full">
      <div className="max-w-7xl mx-auto text-center w-full">
        <HeroSection onSearchClick={() => navigate("/imei-checker")} />
        <FeaturePills />
      </div>
    </section>
  );
}

export default Home;