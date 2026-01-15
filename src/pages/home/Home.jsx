import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const paymentStatus = searchParams.get("paymentStatus");
  //   if (paymentStatus === "SUCCESS" && isAuthenticated) {
  //     toast.success("Payment successful! ✅");
  //     window.history.replaceState({}, "", "/");
  //   } else if (paymentStatus === "FAILED") {
  //     toast.error("Payment failed. Please try again. ❌");
  //     window.history.replaceState({}, "", "/");
  //   }
  // }, [searchParams, isAuthenticated]);

  // const handleSearchClick = () => {
  //   navigate("/imei-checker");
  // };

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
