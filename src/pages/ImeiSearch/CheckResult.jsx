import React, { useEffect, useState } from "react";
import { runSickwTest } from "../../services/imeiApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

function CheckResult() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTestData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await runSickwTest();
      setData(res);
    } catch (err) {
      setError(err?.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestData();
  }, []);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-light rounded-3xl shadow-2xl border border-light-gray p-6 sm:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            SICKW API Test
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchTestData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-medium-gray disabled:cursor-not-allowed text-light font-bold rounded-xl transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Retry</span>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-light-gray rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-bold text-lg">Loading test data...</p>
            <p className="text-primary/60 text-sm mt-2">Testing SICKW API integration</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Test Failed</h2>
            <p className="text-red-500 font-medium break-words mb-4">{error}</p>
            <button
              onClick={fetchTestData}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {data && !loading && (
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
              <p className="text-green-600 font-bold text-center flex items-center justify-center gap-2">
                <span className="text-xl">✅</span>
                <span>API Test Completed Successfully!</span>
              </p>
            </div>

            {/* Data Display */}
            <div className="bg-light-gray rounded-2xl p-6 border border-medium-gray">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span>📋</span>
                <span>Response Data:</span>
              </h3>
              <div className="bg-white rounded-xl overflow-hidden border border-medium-gray">
                <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-primary max-h-96 overflow-y-auto">
{JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <p className="text-blue-600 text-sm font-medium text-center">
                💡 This is a test endpoint to verify SICKW API integration
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;