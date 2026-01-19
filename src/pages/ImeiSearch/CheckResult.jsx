import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, AlertCircle, Clock, Mail, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import {
  getImeiResultThunk,
  resetImeiState,
} from "../../features/ImeiSearch/ImeiSlice";

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

    if (!currentResult) {
      fetchResult();
    }
  }, [id, currentResult]);

  const handleNavigate = (path) => {
    isNavigating.current = true;
    dispatch(resetImeiState());
    navigate(path);
  };

  // فحص لو النتيجة pending
  const isPending =
    currentResult?.result &&
    currentResult.result.toLowerCase().includes("pending");

  // فحص لو النتيجة error string (مش HTML ومش pending)
  const isError =
    currentResult?.result &&
    !currentResult.result.startsWith("<") &&
    !isPending;

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter">
            Check Result
          </h1>
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-light-gray hover:bg-medium-gray text-primary font-bold rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>

        {/* Loading */}
        {loading && !currentResult && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-black uppercase italic animate-pulse">
              Fetching result...
            </p>
          </div>
        )}

        {/* Error - لو مفيش نتيجة أصلاً */}
        {error && !loading && !currentResult && (
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Error loading result
            </h2>
            <p className="text-red-500 font-medium mb-6">
              {typeof error === "string" ? error : "Something went wrong"}
            </p>
            <button
              onClick={fetchResult}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success - فيه نتيجة */}
        {currentResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-4xl shadow-xl border-2 border-light-gray overflow-hidden">
              {/* Header */}
              <div
                className={`${
                  isError
                    ? "bg-red-600"
                    : isPending
                    ? "bg-yellow-500"
                    : "bg-primary"
                } p-6`}
              >
                <h3 className="text-xl font-black text-light flex items-center gap-3 italic">
                  <span>
                    {isError ? "⚠️" : isPending ? "⏳" : "📱"}
                  </span>
                  <span>
                    {isError
                      ? "ERROR"
                      : isPending
                      ? "PROCESSING"
                      : "DEVICE INFORMATION"}
                  </span>
                </h3>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* حالة Pending */}
                {isPending && (
                  <div className="text-center py-10 space-y-6">
                    <div className="flex flex-col items-center gap-4">
                      <Clock className="w-20 h-20 text-yellow-500 animate-pulse" />
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-primary">
                          Processing Your Request
                        </h3>
                        <p className="text-primary/70 font-medium">
                          Usually takes a few minutes. Some services may take
                          longer.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Mail className="w-8 h-8 text-yellow-600" />
                        <h4 className="text-lg font-black text-yellow-800">
                          Results Will Be Sent to Your Email
                        </h4>
                      </div>
                      <p className="text-yellow-700 font-medium">
                        You'll receive the check results via email once
                        processing is complete.
                      </p>
                    </div>

                    <button
                      onClick={fetchResult}
                      disabled={loading}
                      className="px-6 py-3 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                      />
                      Refresh Status
                    </button>
                  </div>
                )}

                {/* حالة Error من SickW */}
                {isError && (
                  <div className="text-center py-10 space-y-4">
                    <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-red-700">
                        Service Error
                      </h3>
                      <p className="text-red-600 font-medium text-lg">
                        {currentResult.result}
                      </p>
                    </div>
                    <p className="text-primary/60">
                      Please contact support if this issue persists.
                    </p>
                  </div>
                )}

                {/* حالة Success - عرض HTML */}
                {!isPending && !isError && currentResult.result && (
                  <div
                    className="
                      text-primary/90 leading-relaxed text-base
                      [&_strong]:font-black [&_strong]:text-primary [&_strong]:block [&_strong]:mt-3 [&_strong]:mb-1
                      [&_b]:font-black [&_b]:text-primary
                      [&_br]:mb-2
                      [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                      [&_th]:bg-primary/10 [&_th]:text-primary [&_th]:font-black [&_th]:px-4 [&_th]:py-2 [&_th]:text-left
                      [&_td]:px-4 [&_td]:py-2 [&_td]:border [&_td]:border-light-gray
                    "
                    dangerouslySetInnerHTML={{
                      __html: currentResult.result,
                    }}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="bg-light-gray/50 border-t border-light-gray p-6 flex flex-wrap gap-8 justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/40 uppercase mb-1">
                    Order ID
                  </p>
                  <p className="text-sm font-mono font-bold text-primary">
                    {id}
                  </p>
                </div>

                {currentResult.created_at && (
                  <div className="text-center">
                    <p className="text-[10px] font-black text-primary/40 uppercase mb-1">
                      Date
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {new Date(currentResult.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigate("/imei-checker")}
                className="flex-1 py-4 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Check Another Device
              </button>

              {!isPending && !isError && (
                <button
                  onClick={() => window.print()}
                  className="px-6 py-4 bg-light-gray hover:bg-medium-gray text-primary font-bold rounded-xl transition-all"
                >
                  Print
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;