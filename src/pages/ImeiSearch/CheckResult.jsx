import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  AlertCircle,
  Clock,
  Mail,
  RefreshCw,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getImeiResultThunk,
  resetImeiState,
} from "../../features/ImeiSearch/ImeiSlice";
import { formatDate } from "../../utils/helpers";

function CheckResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNavigating = useRef(false);
  const { loading, error, currentResult } = useSelector((state) => state.imei);

  const fetchResult = async () => {
    if (!id || isNavigating.current) return;

    try {
      await dispatch(getImeiResultThunk(id)).unwrap();
    } catch (err) {
      toast.error(err || "Failed to fetch result");
    }
  };

  useEffect(() => {
    if (!id) {
      handleNavigate("/");
      return;
    }

    // If we have no result, OR if the current result's ID doesn't match the URL param ID
    // we must fetch the fresh data from the server.
    if (!currentResult || String(currentResult.id) !== String(id)) {
      fetchResult();
    }
  }, [id, currentResult, dispatch]);

  const handleNavigate = (path) => {
    isNavigating.current = true;
    dispatch(resetImeiState());
    navigate(path);
  };

  // Determine State
  const isPending =
    currentResult?.serviceDetails?.api_result?.status === "pending";

  const isRefunded =
    currentResult?.serviceDetails?.api_result?.status === "rejected";

  const isError =
    currentResult?.serviceDetails?.api_result?.status === "error";

  const isSuccess = currentResult?.serviceDetails?.api_result?.status === "success";

  // Configuration based on state
  let statusTheme = {
    label: "Device Information",
    headerBg: "bg-primary",
    icon: <Smartphone className="w-6 h-6 text-light" />,
    borderColor: "border-primary/20",
    lightColor: "text-primary",
  };

  if (isPending) {
    statusTheme = {
      label: "Processing Request",
      headerBg: "bg-amber-500",
      icon: <RefreshCw className="w-6 h-6 text-light " />,
      borderColor: "border-amber-200",
      lightColor: "text-amber-600",
    };
  } else if (isError) {
    statusTheme = {
      label: "Service Error",
      headerBg: "bg-rose-500",
      icon: <AlertCircle className="w-6 h-6 text-light" />,
      borderColor: "border-rose-200",
      lightColor: "text-rose-600",
    };
  } else if (isRefunded) {
    statusTheme = {
      label: "Order Refunded",
      headerBg: "bg-blue-500",
      icon: <RefreshCw className="w-6 h-6 text-light" />,
      borderColor: "border-blue-200",
      lightColor: "text-blue-600",
    };
  } else if (isSuccess) {
    statusTheme = {
      label: "Check Successful",
      headerBg: "bg-emerald-500",
      icon: <CheckCircle className="w-6 h-6 text-light" />,
      borderColor: "border-emerald-200",
      lightColor: "text-emerald-600",
    };
  }

  // Handle Date - check multiple sources or fallback to current if successful/refunded/error
  const getDate = () => {
    if (!currentResult) return { date: "Processing...", time: "" };

    // Try createdAt, then updatedAt
    const dateStr = currentResult.createdAt || currentResult.updatedAt;

    if (dateStr) return formatDate(dateStr);

    // Fallback: Always return current date if missing, to avoid "Unknown Date"
    return formatDate(new Date().toISOString());
  };

  const { date, time } = getDate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-black text-light uppercase tracking-wider hidden sm:block">
            Result Details
          </h1>
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 px-3 py-2 bg-light/10 hover:bg-light/20 text-light font-bold rounded-lg transition-all backdrop-blur-sm text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Loading State - Show if loading from redux OR if result is still pending */}
        {(loading || (currentResult && isPending)) && (
          <div className="bg-light rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-black text-lg uppercase tracking-widest animate-pulse">
              {isPending ? "Finalizing Result..." : "Fetching Data..."}
            </p>
          </div>
        )}

        {/* Error State (Network/System) - Only show if NO result and NOT loading */}
        {error && !loading && !currentResult && (
          <div className="bg-light rounded-3xl p-8 text-center shadow-2xl border-2 border-red-100">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-black text-dark-bg mb-2">
              Unable to Load Result
            </h2>
            <p className="text-gray-500 font-medium mb-6 text-sm">
              {typeof error === "string"
                ? error
                : "Something went wrong while connecting to the server."}
            </p>
            <button
              onClick={fetchResult}
              className="px-6 py-2.5 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Result Card - Show only if we have a result AND it's NOT pending (because pending is handled by loading view above) */}
        {currentResult && !isPending && (
          <div className="bg-light rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Solid Colored Header */}
            <div
              className={`${statusTheme.headerBg} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
                  {statusTheme.icon}
                </div>
                <div>
                  <h2 className="text-light font-black text-lg tracking-wide uppercase">
                    {statusTheme.label}
                  </h2>
                  <p className="text-light/80 font-medium text-xs mt-0.5">
                    ID: #{currentResult.merchantTransactionId}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right bg-white/10 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                <p className="text-light font-bold text-sm">{date}</p>
                <p className="text-light/70 text-xs font-medium">{time}</p>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-5 sm:p-6">
              {/* Service Info Row */}
              <div className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-gray-100 mb-4">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Service Name
                  </p>
                  <p className="text-dark-bg font-bold text-base leading-snug">
                    {currentResult?.serviceDetails?.service_name ||
                      "IMEI Check Service"}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-xs bg-gray-50 border ${statusTheme.borderColor} ${statusTheme.lightColor}`}
                  >
                    {isPending
                      ? "Pending"
                      : isRefunded
                        ? "Refunded"
                        : isError
                          ? "Failed"
                          : "Completed"}
                  </div>
                </div>
              </div>

              {/* Main Result Content */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Result Details
                </p>

                {/* Case: Pending - Hidden because we show full screen loader now, but kept conditionally just in case logic changes */}
                {isPending && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 text-center space-y-3">
                    <p>Processing...</p>
                  </div>
                )}


                {/* Case: Refunded */}
                {isRefunded && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center space-y-3">
                    <RefreshCw className="w-10 h-10 text-blue-500 mx-auto" />
                    <div>
                      <h3 className="text-base font-bold text-blue-900 mb-0.5">
                        Order was Refunded
                      </h3>
                      <p className="text-blue-700 font-medium text-xs">
                        The amount has been returned to your wallet.
                      </p>
                    </div>
                  </div>
                )}

                {/* Case: Error */}
                {isError && (
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 text-center space-y-3">
                    <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                    <div>
                      <h3 className="text-base font-bold text-rose-900 mb-0.5">
                        Order Rejected
                      </h3>
                      <p className="text-rose-700 font-medium font-mono text-xs bg-white/50 inline-block px-2 py-0.5 rounded">
                        {currentResult.result}
                      </p>
                    </div>
                    <p className="text-rose-600/80 text-[10px]">
                      If you think this is a mistake, please contact support
                      with Order ID #{id}
                    </p>
                  </div>
                )}

                {/* Case: Success OR Rejected/Refunded with text result - Show Result Content */}
                {(isSuccess || isRefunded) && currentResult?.result && (
                  <div
                    className={`
                      ${isRefunded ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}
                      rounded-xl p-4 border 
                      text-dark-bg text-sm leading-relaxed
                      [&_strong]:font-black [&_strong]:text-dark-bg [&_strong]:block [&_strong]:mt-3 [&_strong]:mb-1
                      [&_b]:font-black [&_b]:text-dark-bg
                      [&_br]:mb-1
                      [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_table]:bg-white [&_table]:shadow-sm [&_table]:rounded-lg [&_table]:overflow-hidden
                      [&_th]:bg-gray-100 [&_th]:text-gray-600 [&_th]:font-bold [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-[10px] [&_th]:uppercase [&_th]:tracking-wider
                      [&_td]:px-3 [&_td]:py-2 [&_td]:border-b [&_td]:border-gray-100 [&_td]:text-gray-700 [&_td]:text-xs
                      [&_tr:last-child_td]:border-0
                    `}
                    dangerouslySetInnerHTML={{ __html: currentResult.result }}
                  />
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleNavigate("/imei-checker")}
                className="flex-1 py-3 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                Check Another Device
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;
