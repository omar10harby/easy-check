import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShieldCheck, Clock3, Globe2, ScanLine, Sparkles, Wand2 } from "lucide-react";
import HeroSection from "../../features/home/Herosection";
import FeaturePills from "../../features/home/Featurepills";
import toast from "react-hot-toast";
import { getImeiResultThunk } from "../../features/ImeiSearch/ImeiSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = useRef({
    paymentStatus: searchParams.get("paymentStatus"),
    merchantOrderId: searchParams.get("merchantOrderId"),
  });

  const [isProcessing, setIsProcessing] = useState(() => {
    const { paymentStatus, merchantOrderId } = initialParams.current;
    return !!(merchantOrderId || paymentStatus);
  });

  const merchantOrderId = initialParams.current.merchantOrderId;
  const storageKey = merchantOrderId ? `payment_processed_${merchantOrderId}` : null;
  const hasProcessed = useRef(
    storageKey ? sessionStorage.getItem(storageKey) === "true" : false
  );

  useEffect(() => {
    const { paymentStatus, merchantOrderId } = initialParams.current;

    if (!isProcessing) return;
    if (!paymentStatus && !merchantOrderId) return;
    if (hasProcessed.current) return;

    hasProcessed.current = true;
    if (storageKey) sessionStorage.setItem(storageKey, "true");

    const processPayment = async () => {
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
            setSearchParams({});
            setIsProcessing(false);
          }
        }
      } catch (_error) {
        toast.error("Failed to verify payment");
        setSearchParams({});
        setIsProcessing(false);
      } finally {
        if (storageKey) sessionStorage.removeItem(storageKey);
      }
    };

    processPayment();
  }, [isProcessing, dispatch, navigate, setSearchParams]);

  const handleSearchClick = () => {
    navigate("/imei-checker");
  };

  const highlightStats = [
    {
      id: "accuracy",
      label: "Verified accuracy",
      value: "99.9%",
      description: "Match rate across blacklist & carrier sources.",
      icon: ShieldCheck,
      accent: "bg-emerald-300/20 text-emerald-100",
    },
    {
      id: "speed",
      label: "Average response time",
      value: "15s",
      description: "Optimized to stay quick even on mobile data.",
      icon: Clock3,
      accent: "bg-amber-300/25 text-amber-100",
    },
    {
      id: "coverage",
      label: "Global coverage",
      value: "140+",
      description: "Carriers and partners monitored in real time.",
      icon: Globe2,
      accent: "bg-sky-300/20 text-sky-100",
    },
  ];

  const walkthroughSteps = [
    {
      id: "choose",
      title: "Pick your check",
      description: "Clear pricing for IMEI or serial lookups before you start.",
      icon: Wand2,
    },
    {
      id: "enter",
      title: "Enter device ID",
      description: "Guided formatting avoids typos for both IMEI and serials.",
      icon: ScanLine,
    },
    {
      id: "result",
      title: "Get secure results",
      description: "Receive verified summaries you can export or revisit later.",
      icon: ShieldCheck,
    },
  ];

  if (isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-primary">Verifying Payment...</p>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-[#2f2f2f] to-[#1f1f1f] -z-10" aria-hidden="true" />
      <div className="absolute -left-16 top-0 h-72 w-72 bg-emerald-400/20 blur-3xl rounded-full z-0" aria-hidden="true" />
      <div className="absolute right-0 -bottom-10 h-80 w-80 bg-indigo-400/20 blur-3xl rounded-full z-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-stretch">
          <div className="rounded-3xl border border-light/15 bg-white/5 shadow-2xl backdrop-blur-xl p-6 sm:p-10">
            <HeroSection onSearchClick={handleSearchClick} />
            <FeaturePills />

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {highlightStats.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-light/10 bg-light/5 px-4 py-4 flex items-start gap-3 text-light shadow-lg"
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.accent}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.08em] text-light/60 font-semibold">
                      {stat.label}
                    </p>
                    <p className="text-xl font-black text-light leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-light/60 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-light text-primary shadow-2xl border border-light-gray/80 p-6 sm:p-8 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Refined lookup experience
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
                Cleaner, clearer steps to verify any device
              </h2>
              <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
                From IMEI to serials, follow the refreshed flow to keep every search focused,
                transparent, and secure—whether you are on desktop or on the go.
              </p>
            </div>

            <div className="space-y-3">
              {walkthroughSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">
                      {step.title}
                    </p>
                    <p className="text-sm text-primary/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-[#2d2d2d] text-light flex items-center gap-3 shadow-lg">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Quick tip</p>
                <p className="text-sm text-light/80">
                  Save results to your history, top up your wallet, and retry payments without leaving the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
