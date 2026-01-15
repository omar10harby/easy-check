import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ServiceSelector from "../../features/ImeiSearch/Serviceselector";
import ImeiInput from "../../features/ImeiSearch/Imeiinput";
import SearchButton from "../../features/ImeiSearch/Searchbutton";

import { fetchServicesThunk } from "../../features/ImeiSearch/ImeiSlice";
import {
  buyWithWalletThunk,
  createGuestCheckoutThunk,
} from "../../features/payment/PaymentSlice";
import { updateBalance } from "../../features/auth/authSlice";

function ImeiChecker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    selectedService,
  } = useSelector((state) => state.imei);
  const { loading: paymentLoading } = useSelector((state) => state.payment);

  const [imeiOrSerial, setImeiOrSerial] = useState("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [inputType, setInputType] = useState("imei"); // 'imei' or 'serial'
  const [maxLength, setMaxLength] = useState(15); // Default to IMEI length

  // ✅ Fetch services on mount
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServicesThunk());
    }
  }, [dispatch, services.length]);

  const handleImeiChange = (e) => {
    let value = e.target.value;

    // IMEI: أرقام فقط
    if (inputType === "imei") {
      value = value.replace(/\D/g, ""); // Only numbers
    } else {
      // Serial: حروف وأرقام فقط (بدون مسافات أو رموز خاصة)
      value = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    }

    if (value.length <= maxLength) {
      setImeiOrSerial(value);
    }
  };

  const handleTypeChange = (type) => {
    setInputType(type);
    const newMaxLength = type === "imei" ? 15 : 12;
    setMaxLength(newMaxLength);
    setImeiOrSerial("");
  };

  const handleCheck = async () => {
    if (!selectedService || !imeiOrSerial) return;

    const checkData = {
      imeiOrSerial,
      serviceId: selectedService.id,
      amount: selectedService.final_price,
      isSerial: inputType === "serial",
    };

    // 🔐 User Flow
    if (isAuthenticated) {
      if (user.balance >= selectedService.price) {
        // 💰 Wallet Purchase (Instant)
        try {
          const result = await dispatch(buyWithWalletThunk(checkData)).unwrap();
          dispatch(updateBalance(result.newBalance));
          navigate(`/result/${result.transactionId}`);
          toast.success("Transaction successful!");
        } catch (error) {
          toast.error(error || "Transaction failed");
        }
      } else {
        // ⚠️ Insufficient Balance
        toast.error("Insufficient balance. Redirecting to top up...");
      }
    } else {
      // 🛒 Guest Checkout
      try {
        const result = await dispatch(
          createGuestCheckoutThunk(checkData)
        ).unwrap();
        if (result?.paymentUrl) {
          window.location.href = result.paymentUrl;
        } else {
          toast.error("Payment link unavailable. Please try again.");
        }
      } catch (error) {
        toast.error(error || "Failed to create checkout");
      }
    }
  };

  const isSearchDisabled =
    !selectedService ||
    (inputType === "imei" && imeiOrSerial.length !== 15) ||
    (inputType === "serial" && imeiOrSerial.length < 8) ||
    paymentLoading;

  // Loading state
  if (servicesLoading && services.length === 0) {
    return (
      <div className="fixed inset-0 z-999 flex items-center justify-center  bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-light border-t-dark-bg rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark font-bold text-lg">Loading Services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (servicesError && services.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 bg-primary flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-8 sm:p-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-black text-primary mb-2">
                Failed to Load Services
              </h2>
              <p className="text-primary/70 mb-6">{servicesError}</p>
              <button
                onClick={() => dispatch(fetchServicesThunk())}
                className="px-6 py-3 bg-primary text-light rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!servicesLoading && services.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 bg-primary flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-8 sm:p-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📭</span>
              </div>
              <h2 className="text-2xl font-black text-primary mb-2">
                No Services Available
              </h2>
              <p className="text-primary/70 mb-6">Please check back later.</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-primary text-light rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-primary flex items-center">
      <div className="md:min-w-xl mx-auto w-full max-w-3xl">
        {/* Main Card */}
        <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-primary mb-2 tracking-tight">
              Check IMEI / Serial
            </h1>
            <p className="text-primary/70 text-sm sm:text-base">
              Select a service and enter your device details to search.
            </p>
          </div>

          <div className="space-y-4">
            {/* Service Selection */}
            <ServiceSelector
              services={services}
              isOpen={isServiceDropdownOpen}
              onToggle={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              onClose={() => setIsServiceDropdownOpen(false)}
            />

            {/* IMEI/Serial Input */}
            <ImeiInput
              value={imeiOrSerial}
              onChange={handleImeiChange}
              maxLength={maxLength}
              onTypeChange={handleTypeChange}
            />

            {/* Insufficient Balance Warning (User Only) */}
            {isAuthenticated &&
              selectedService &&
              user.balance < selectedService.price && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-bold text-center">
                    ⚠️ Insufficient balance ({user.balance.toFixed(2)} EGP).
                    Required: {selectedService.price.toFixed(2)} EGP
                  </p>
                </div>
              )}

            {/* Search Button */}
            <SearchButton
              onClick={handleCheck}
              disabled={isSearchDisabled}
              selectedServicePrice={selectedService?.price}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImeiChecker;
