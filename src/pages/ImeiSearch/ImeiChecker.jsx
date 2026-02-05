import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ServiceSelector from "../../features/ImeiSearch/Serviceselector";
import ImeiInput from "../../features/ImeiSearch/Imeiinput";
import EmailInput from "../../features/ImeiSearch/EmailInput";
import SearchButton from "../../features/ImeiSearch/Searchbutton";
import {
  fetchServicesThunk,
  setCurrentResult,
} from "../../features/ImeiSearch/ImeiSlice";
import {
  buyWithWalletThunk,
  createGuestCheckoutThunk,
} from "../../features/payment/PaymentSlice";
import { updateBalance } from "../../features/auth/authSlice";
import { getErrorMessage } from "../../utils/errorHelpers";
import ServiceInfoBox from "../../features/ImeiSearch/Serviceinfobox";
import { validateEmail } from "../../utils/validations";
import { formatImeiOrSerial } from "../../utils/helpers";
import ImeiCheckerLoading from "../../features/ImeiSearch/ImeiCheckerLoading";

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
  const [inputType, setInputType] = useState("");
  const [maxLength, setMaxLength] = useState(15);
  const [guestEmail, setGuestEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (services?.length === 0) {
      dispatch(fetchServicesThunk());
    }
  }, [dispatch, services?.length]);

  const handleImeiChange = useCallback(
    (e) => {
      let value = e.target.value;
      const formattedValue = formatImeiOrSerial(value, inputType);
      if (formattedValue.length <= maxLength) {
        setImeiOrSerial(formattedValue);
      }
    },
    [inputType, maxLength],
  );

  const handleTypeChange = useCallback((type) => {
    setInputType(type);
    const newMaxLength = type === "imei" ? 15 : 12;
    setMaxLength(newMaxLength);
    setImeiOrSerial("");
  }, []);

  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setGuestEmail(value);

    if (!value) {
      setEmailError("");
    } else {
      const errorMsg = validateEmail(value);
      setEmailError(errorMsg);
    }
  }, []);

  const handleServiceToggle = useCallback(() => {
    setIsServiceDropdownOpen((prev) => !prev);
  }, []);

  const handleServiceClose = useCallback(() => {
    setIsServiceDropdownOpen(false);
  }, []);

  const handleCheck = useCallback(async () => {
    if (!selectedService || !imeiOrSerial) return;

    const checkData = {
      imeiOrSerial,
      serviceId: selectedService.service_id,
      amount: selectedService.final_price,
      isSerial: inputType === "serial",
      guestEmail: !isAuthenticated ? guestEmail.trim() : undefined,
    };

    if (isAuthenticated) {
      if (user.balance >= selectedService.final_price) {
        try {
          const result = await dispatch(buyWithWalletThunk(checkData)).unwrap();
          dispatch(updateBalance(result.newBalance));
          dispatch(setCurrentResult(result));
          toast.success("Transaction successful! ✅");
          navigate(`/result/${result.id}`);
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
        }
      } else {
        toast.error(
          `Insufficient balance. Required: ${selectedService.final_price} EGP | Current: ${user.balance} EGP`,
          { duration: 4000 },
        );
      }
    } else {
      try {
        const result = await dispatch(
          createGuestCheckoutThunk(checkData),
        ).unwrap();
        if (result?.paymentUrl) {
          toast.success("Redirecting to payment...");
          window.location.href = result.paymentUrl;
        } else {
          toast.error("Payment link unavailable. Please try again.");
        }
      } catch (error) {
        toast.error(error || "Failed to create checkout");
      }
    }
  }, [
    selectedService,
    imeiOrSerial,
    inputType,
    isAuthenticated,
    guestEmail,
    user,
    dispatch,
    navigate,
  ]);

  // ✅ الشروط الصحيحة للـ User
 const isSearchDisabled = useMemo(() => {
    if (!selectedService) return true;

    if (!inputType) return true;

    if (inputType === "imei" && imeiOrSerial.length !== 15) {
      return true;
    }
    
    if (inputType === "serial" && imeiOrSerial.length < 8) {
      return true;
    }

    if (!isAuthenticated) {
      if (!guestEmail) return true;
      
      if (guestEmail.trim() === "") return true;
      
      if (emailError) return true;
    }

    if (paymentLoading) return true;

    return false;
  }, [
    selectedService,
    inputType,
    imeiOrSerial,
    isAuthenticated,
    guestEmail,
    emailError,
    paymentLoading,
  ]);

  if (servicesLoading && services?.length === 0) {
    return <ImeiCheckerLoading />;
  }

  if (servicesError && services?.length === 0) {
    return (
      <section className="w-full max-w-2xl sm:py-8 px-4">
        <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
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
      </section>
    );
  }

  if (!servicesLoading && services?.length === 0) {
    return (
      <section className="w-full max-w-2xl sm:py-8 px-4">
        <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
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
      </section>
    );
  }

  return (
    <section className="w-full max-w-2xl sm:py-8 px-4">
      <div className="bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-primary mb-2 tracking-tight">
            Check IMEI / Serial
          </h1>
          <p className="text-primary/70 text-sm sm:text-base">
            Select a service and enter your device details to search.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <ServiceSelector
            services={services}
            isOpen={isServiceDropdownOpen}
            onToggle={handleServiceToggle}
            onClose={handleServiceClose}
            disabled={paymentLoading}
          />
          <ServiceInfoBox service={selectedService} />
          <ImeiInput
            value={imeiOrSerial}
            onChange={handleImeiChange}
            maxLength={maxLength}
            onTypeChange={handleTypeChange}
            disabled={paymentLoading}
          />
          {!isAuthenticated && (
            <EmailInput
              value={guestEmail}
              onChange={handleEmailChange}
              error={emailError}
              disabled={paymentLoading}
            />
          )}
          <SearchButton
            onClick={handleCheck}
            disabled={isSearchDisabled}
            selectedServicePrice={selectedService?.final_price}
          />
        </div>
      </div>
    </section>
  );
}

export default ImeiChecker;