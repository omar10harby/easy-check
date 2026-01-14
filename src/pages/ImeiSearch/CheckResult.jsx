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
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
              <p className="text-green-600 font-bold text-center flex items-center justify-center gap-2">
                <span className="text-xl">✅</span>
                <span>API Test Completed Successfully!</span>
              </p>
            </div>

            {/* Result Box - Beautiful HTML Display */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-light-gray overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-dark-bg p-6">
                <h3 className="text-xl font-black text-light flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span>IMEI Check Result</span>
                </h3>
                <p className="text-light/80 text-sm mt-1">Detailed device information</p>
              </div>

              {/* Content - HTML Rendered */}
              <div className="p-8">
                {data.result ? (
                  <div 
                    className="
                      text-primary/90 leading-relaxed
                      [&>*]:mb-3
                      [&_br]:block [&_br]:mb-2
                      [&_strong]:font-black [&_strong]:text-primary [&_strong]:block [&_strong]:mb-1
                      [&_b]:font-black [&_b]:text-primary
                      text-base
                    "
                    dangerouslySetInnerHTML={{ __html: data.result }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-primary/60 font-medium mb-4">No result field found in response</p>
                    <div className="text-left bg-light-gray p-6 rounded-xl border border-medium-gray">
                      <p className="text-sm font-bold text-primary mb-3">Available Data:</p>
                      {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="mb-3 pb-3 border-b border-medium-gray last:border-0">
                          <p className="text-xs font-bold text-primary/60 uppercase mb-1">{key}</p>
                          <p className="text-sm text-primary font-medium break-words">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Metadata */}
              {(data.status || data.transaction_id || data.timestamp) && (
                <div className="bg-light-gray border-t-2 border-medium-gray p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {data.status && (
                      <div>
                        <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-1">Status</p>
                        <p className="text-sm font-black text-primary">{data.status}</p>
                      </div>
                    )}
                    {data.transaction_id && (
                      <div>
                        <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-1">Transaction ID</p>
                        <p className="text-xs font-mono font-black text-primary">{data.transaction_id}</p>
                      </div>
                    )}
                    {data.timestamp && (
                      <div>
                        <p className="text-xs font-bold text-primary/60 uppercase tracking-wider mb-1">Timestamp</p>
                        <p className="text-xs font-black text-primary">{new Date(data.timestamp).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Raw JSON - Collapsible */}
            <details className="bg-light-gray rounded-2xl shadow-md border border-medium-gray p-4">
              <summary className="cursor-pointer font-bold text-primary text-sm flex items-center gap-2 hover:text-primary/70 transition-colors">
                <span>🔍</span>
                <span>View Raw API Response (for debugging)</span>
              </summary>
              <div className="mt-4 bg-white rounded-xl p-4 border border-medium-gray">
                <pre className="text-xs font-mono text-primary/70 overflow-x-auto max-h-64 overflow-y-auto">
{JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckResult;