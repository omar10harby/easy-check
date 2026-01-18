import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, AlertCircle } from "lucide-react";
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
    if (!id && isNavigating.current) return;

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

        {/* Error */}
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

        {/* Success */}
        {currentResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-4xl shadow-xl border-2 border-light-gray overflow-hidden">
              <div
                className={`${
                  currentResult.status === "REFUNDED" ||
                  currentResult.status === "FAILED"
                    ? "bg-red-600"
                    : "bg-primary"
                } p-6`}
              >
                <h3 className="text-xl font-black text-light flex items-center gap-3 italic">
                  <span>
                    {currentResult.status === "REFUNDED" ||
                    currentResult.status === "FAILED"
                      ? "⚠️"
                      : "📱"}
                  </span>
                  <span>
                    {currentResult.status === "REFUNDED"
                      ? "ORDER REJECTED"
                      : "DEVICE INFORMATION"}
                  </span>
                </h3>
              </div>

              <div className="p-8">
                {currentResult.result ? (
                  <div
                    className="
                      text-primary/90 leading-relaxed text-base
                      [&_strong]:font-black [&_strong]:text-primary [&_strong]:block [&_strong]:mt-3 [&_strong]:mb-1
                      [&_b]:font-black [&_b]:text-primary
                      [&_br]:mb-2
                    "
                    dangerouslySetInnerHTML={{
                      __html: currentResult.result,
                    }}
                  />
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">⏳</span>
                    </div>
                    <p className="text-primary/70 font-medium">
                      Result is being processed. Please check back in a few
                      minutes.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-light-gray/50 border-t border-light-gray p-6 flex flex-wrap gap-8 justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/40 uppercase mb-1">
                    Status
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      currentResult.status === "REFUNDED" ||
                      currentResult.status === "rejected"
                        ? "text-red-600"
                        : "text-primary"
                    }`}
                  >
                    {currentResult.status || "Completed"}
                  </p>
                </div>

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

            <button
              onClick={() => handleNavigate("/imei-checker")}
              className="w-full py-4 bg-primary text-light font-bold rounded-xl hover:bg-primary/90 transition-all"
            >
              Check Another Device
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;
