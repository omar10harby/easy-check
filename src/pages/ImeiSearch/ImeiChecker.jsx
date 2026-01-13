import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceSelector from "../../features/ImeiSearch/Serviceselector";
import ImeiInput from "../../features/ImeiSearch/Imeiinput";
import SearchButton from "../../features/ImeiSearch/Searchbutton";

import { mockServices } from "../../features/ImeiSearch/Mockservices";
import { useDispatch, useSelector } from "react-redux";
import { buyWithWalletThunk } from "../../features/payment/PaymentSlice";
import { updateBalance } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { fetchServicesThunk } from "../../features/ImeiSearch/ImeiSlice";

function ImeiChecker() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading: paymentLoading } = useSelector((state) => state.payment);
  const { loading: servicesLoading, services } = useSelector(
    (state) => state.imei
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imeiOrSerial, setImeiOrSerial] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [inputType, setInputType] = useState("imei"); // 'imei' or 'serial'
  const [maxLength, setMaxLength] = useState(15); // Default to IMEI length

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServicesThunk());
    }
  }, [dispatch, services.length]);

  console.log(services);

  const mservices = mockServices; // TODO: get services from Redux or API

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
      amount: selectedService.price,
      isSerial: inputType === "serial",
    };
    if (isAuthenticated) {
      if (user.balance >= selectedService.price) {
        try {
          const result = await dispatch(buyWithWalletThunk(checkData)).unwrap();
          dispatch(updateBalance(result.newBalance));
          navigate(`/result/${result.transactionId}`);
          toast.success("Transaction successful!");
        } catch (error) {
          toast.error(error.message || "Transaction failed");
        }
      } else {
        toast.error("Insufficient balance. Please top up your wallet.");
      }
    } else {
      try {
        const result = await createGuestPayment(checkData);
        if (result.paymentUrl) window.location.href = result.paymentUrl;
      } catch (error) {
        toast.error(error.message || "Transaction failed");
      }
    }
  };

  const isSearchDisabled =
    !selectedService ||
    (inputType === "imei" && imeiOrSerial.length !== 15) ||
    (inputType === "serial" && imeiOrSerial.length < 8);

  return (
    <section className=" px-4 sm:px-6 lg:px-8 bg-primary flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Main Card - أبيض */}
        <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-8 sm:p-10">
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
              selectedService={selectedService}
              services={mservices}
              isOpen={isServiceDropdownOpen}
              onToggle={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              onSelect={setSelectedService}
              onClose={() => setIsServiceDropdownOpen(false)}
            />

            {/* IMEI/Serial Input */}
            <ImeiInput
              value={imeiOrSerial}
              onChange={handleImeiChange}
              maxLength={maxLength}
              onTypeChange={handleTypeChange}
            />

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
