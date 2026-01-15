import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getImeiResultThunk, resetImeiState } from "../../features/ImeiSearch/ImeiSlice";

function CheckResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. استخدام Redux لحالة التحميل والأخطاء فقط
  const { loading, error } = useSelector((state) => state.imei);

  // 2. استخدام Local State لتخزين النتيجة اللي راجعة
  const [data, setData] = useState(null);

async function fetchResultData() {
    if (!id) return;

    // بنعمل Dispatch للعملية ونستلم النتيجة مباشرة باستخدام .unwrap()
    try {
      const result = await dispatch(getImeiResultThunk(id)).unwrap();
      setData(result);
    } catch (error) {
      toast.error(error || "Failed to fetch result")
    }
  };

  useEffect(() => {
    fetchResultData();

    // تنظيف الـ Error لو موجود لما نخرج
    return () => {
      dispatch(resetImeiState());
    };
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter">
            Check Result
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchResultData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:opacity-90 disabled:bg-medium-gray disabled:cursor-not-allowed text-light font-bold rounded-xl transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-light-gray hover:bg-medium-gray text-primary font-bold rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>

        {/* Loading State (جي من Redux) */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-black uppercase italic animate-pulse">
              Fetching result...
            </p>
          </div>
        )}

        {/* Error State (جي من Redux) */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Error loading result
            </h2>
            <p className="text-red-500 font-medium mb-6 break-words">
              {typeof error === "string" ? error : "Something went wrong"}
            </p>
            <button
              onClick={fetchResultData}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State (جي من Local State) */}
        {data && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-[2rem] shadow-xl border-2 border-light-gray overflow-hidden">
              <div className="bg-primary p-6">
                <h3 className="text-xl font-black text-light flex items-center gap-3 italic">
                  <span>📱</span>
                  <span>DEVICE INFORMATION</span>
                </h3>
              </div>

              <div className="p-8">
                {data.result ? (
                  <div
                    className="
                      text-primary/90 leading-relaxed text-base
                      [&_strong]:font-black [&_strong]:text-primary [&_strong]:block [&_strong]:mt-3 [&_strong]:mb-1
                      [&_b]:font-black [&_b]:text-primary
                      [&_br]:mb-2
                    "
                    dangerouslySetInnerHTML={{ __html: data.result }}
                  />
                ) : (
                  <div className="text-center py-10 italic text-primary/40">
                    No result content available.
                  </div>
                )}
              </div>

              {/* metadata footer */}
              {(data.status || data.order_id || id) && (
                <div className="bg-light-gray/50 border-t border-light-gray p-6 flex flex-wrap gap-8 justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-primary/40 uppercase mb-1">
                      Status
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {data.status || "Completed"}
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;
